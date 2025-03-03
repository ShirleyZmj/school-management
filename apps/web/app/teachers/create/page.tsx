"use client";

import { useState } from "react";
import { Form, Input, Button, Card, Typography, App, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import teachersService, {
  CreateTeacherRequest,
} from "../../services/teachers.service";
import { Subject } from "@repo/shared/src/types";

const { Title } = Typography;
const SUBJECTS = Object.values(Subject);

export default function CreateTeacherPage() {
  const { notification } = App.useApp();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: CreateTeacherRequest) => {
    setLoading(true);
    try {
      const response = await teachersService.createTeacher(values);

      if (response.success) {
        notification.success({
          message: "Success",
          description: "Teacher created successfully!",
        });
        router.push("/teachers");
      } else {
        notification.error({
          message: "Failed to create teacher",
          description: response.message || "Unknown error occurred",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to create teacher",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          href="/teachers"
          className="flex items-center text-primary hover:underline mb-4"
        >
          <ArrowLeftOutlined className="mr-1" /> Back to Teachers
        </Link>
        <Title level={2}>Add New Teacher</Title>
      </div>

      <Card>
        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input teacher's name!" },
            ]}
          >
            <Input placeholder="Enter teacher's name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input teacher's email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter teacher's email" />
          </Form.Item>

          <Form.Item
            label="Subject"
            name="subject"
            rules={[
              { required: true, message: "Please select teacher's subject!" },
            ]}
          >
            <Select placeholder="Select teacher's subject">
              {SUBJECTS.map((subject) => (
                <Select.Option key={subject} value={subject}>
                  {subject}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Contact Number"
            name="contactNumber"
            rules={[
              {
                required: true,
                message: "Please input teacher's contact number!",
              },
            ]}
          >
            <Input placeholder="Enter teacher's contact number" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create Teacher
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
