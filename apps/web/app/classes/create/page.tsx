"use client";

import { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Card, Typography, Select, App } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classesService from "../../services/classes.service";
import teachersService from "../../services/teachers.service";
import { Level } from "@repo/shared/src/types";

const { Title } = Typography;
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
  }, [fetchTeachers]);

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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          href="/classes"
          className="flex items-center text-primary hover:underline mb-4"
        >
          <ArrowLeftOutlined className="mr-1" /> Back to Classes
        </Link>
        <Title level={2}>Add New Class</Title>
      </div>

      <Card>
        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Class Name"
            name="name"
            rules={[{ required: true, message: "Please input class name!" }]}
          >
            <Input placeholder="Enter class name" />
          </Form.Item>

          <Form.Item
            label="Level"
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
            label="Form Teacher"
            name="formTeacherId"
            rules={[{ required: true, message: "Please select form teacher!" }]}
          >
            <Select placeholder="Select form teacher" loading={loadingTeachers}>
              {teachers.map((teacher) => (
                <Option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create Class
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
