"use client";

import { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Title } = Typography;

interface TeacherFormData {
  name: string;
  email: string;
  subject: string;
  contact_number: string;
}

export default function CreateTeacherPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: TeacherFormData) => {
    setLoading(true);

    // 模拟API调用
    setTimeout(() => {
      console.log("Form values:", values);
      message.success("Teacher created successfully!");
      setLoading(false);
      router.push("/teachers");
    }, 1000);
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
              { required: true, message: "Please input teacher's subject!" },
            ]}
          >
            <Input placeholder="Enter teacher's subject" />
          </Form.Item>

          <Form.Item
            label="Contact Number"
            name="contact_number"
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
