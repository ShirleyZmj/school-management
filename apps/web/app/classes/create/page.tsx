"use client";

import { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Card, Select, App } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classesService from "../../services/classes.service";
import teachersService from "../../services/teachers.service";
import { Level } from "@repo/shared/src/types";
import PageWrapper from "../../components/PageWrapper";

const { Option } = Select;

interface Teacher {
  id: number;
  name: string;
}

interface ClassFormData {
  name: string;
  level: string;
  formTeacherId: number;
}

const levels = Object.values(Level);

export default function CreateClassPage() {
  const { notification, message } = App.useApp();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loadingTeachers, setLoadingTeachers] = useState(true);

  const fetchTeachers = useCallback(async () => {
    setLoadingTeachers(true);
    try {
      const response = await teachersService.getAllTeachers();
      if (response.success && Array.isArray(response.data)) {
        setTeachers(response.data);
      } else {
        notification.error({
          message: "Failed to fetch teachers",
          description: response.message || "Unknown error occurred",
        });
      }
    } catch (error) {
      notification.error({
        message: "Failed to fetch teachers",
        description: "An error occurred while fetching teachers",
      });
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
        throw new Error(response.message);
      }
    } catch (error) {
      notification.error({
        message: "Failed to create class",
        description: "An error occurred while creating class",
      });
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
              {levels.map((level) => (
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
                  {teacher.name}
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
