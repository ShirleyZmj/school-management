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
import PageWrapper from "../../components/PageWrapper";

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
      console.log(response);
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
    <PageWrapper title="Add New Teacher">
      <Form layout="vertical" onFinish={onFinish} autoComplete="off">
        <Card className="shadow-md">
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input teacher's name!" },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            label="Subject"
            name="subject"
            rules={[
              { required: true, message: "Please select teacher's subject!" },
            ]}
          >
            <Select placeholder="Select a subject">
              {SUBJECTS.map((subject) => (
                <Select.Option key={subject} value={subject}>
                  {subject}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input teacher's email address.",
              },
              { type: "email", message: "This email address is invalid." },
            ]}
          >
            <Input placeholder="Email Address" />
          </Form.Item>

          <Form.Item
            label="Work Contact Number"
            name="contactNumber"
            rules={[
              {
                required: true,
                message: "Please input teacher's workcontact number.",
              },
              {
                pattern: /^[689]\d{7}$/,
                message: "This work contact number is invalid.",
              },
            ]}
          >
            <Input placeholder="Work Contact Number" />
          </Form.Item>
        </Card>

        <Form.Item className="flex justify-end mt-6">
          <Link href="/teachers">
            <Button icon={<ArrowLeftOutlined />} className="mr-4">
              Back
            </Button>
          </Link>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Teacher
          </Button>
        </Form.Item>
      </Form>
    </PageWrapper>
  );
}
