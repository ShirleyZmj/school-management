"use client";

import { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Card, Select, App } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classesService from "@/src/services/classes.service";
import teachersService from "@/src/services/teachers.service";
import { Level } from "@repo/shared/src/types";
import PageWrapper from "@/src/components/PageWrapper";
import { useErrorMessage } from "@/src/hooks/useErrorMessage";

const { Option } = Select;
const LEVELS = Object.values(Level);

interface Teacher {
  id: number;
  name: string;
  email: string;
}

interface ClassFormData {
  name: string;
  level: string;
  formTeacherId: number;
}

export default function CreateClassPage() {
  const { message } = App.useApp();
  const { showError } = useErrorMessage();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loadingTeachers, setLoadingTeachers] = useState(true);

  const fetchTeachers = useCallback(async () => {
    setLoadingTeachers(true);
    try {
      const response = await teachersService.getAllTeachers();
      if (response.success) {
        setTeachers(response.data || []);
      } else {
        showError("Failed to fetch teachers", response.message);
      }
    } catch (error) {
      showError("Failed to fetch teachers", "An unexpected error occurred");
    } finally {
      setLoadingTeachers(false);
    }
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const onFinish = async (values: ClassFormData) => {
    setLoading(true);
    try {
      const response = await classesService.createClass(values);
      if (response.success) {
        message.success("Class created successfully");
        router.push("/classes");
      } else {
        showError("Failed to create class", response.message);
      }
    } catch (error) {
      showError(
        "Failed to create class",
        "An error occurred while creating class"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper title="Add Class">
      <Form layout="vertical" onFinish={onFinish} autoComplete="off">
        <Card className="shadow-md">
          <Form.Item
            label="Class Level"
            name="level"
            rules={[{ required: true, message: "Please select level!" }]}
          >
            <Select placeholder="Select level">
              {LEVELS.map((level) => (
                <Option key={level} value={level}>
                  {level}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Class Name"
            name="name"
            rules={[{ required: true, message: "Please input class name!" }]}
          >
            <Input placeholder="Enter class name" />
          </Form.Item>

          <Form.Item
            label="Form Teacher"
            name="formTeacherId"
            rules={[{ required: true, message: "Please select form teacher!" }]}
          >
            <Select
              placeholder="Assign a form teacher"
              loading={loadingTeachers}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.children as unknown as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              notFoundContent={
                teachers.length === 0 ? (
                  <div>
                    <div>No existing teachers.</div>
                    <Link href="/teachers/create">Add a teacher</Link>
                  </div>
                ) : null
              }
            >
              {teachers.map((teacher) => (
                <Option key={teacher.id} value={teacher.id}>
                  {teacher.email}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Card>

        <Form.Item className="flex justify-end mt-6">
          <Link href="/classes">
            <Button icon={<ArrowLeftOutlined />} className="mr-4">
              Back
            </Button>
          </Link>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Class
          </Button>
        </Form.Item>
      </Form>
    </PageWrapper>
  );
}
