"use client";

import { useState } from "react";
import { Form, Input, Button, Card, App, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import teachersService, {
  CreateTeacherRequest,
} from "../../../src/services/teachers.service";
import { Subject } from "../../../src/types";
import PageWrapper from "../../../src/components/PageWrapper";
import { useErrorMessage } from "../../../src/hooks/useErrorMessage";

const SUBJECTS = Object.values(Subject);

export default function CreateTeacherPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { message } = App.useApp();
  const { showError } = useErrorMessage();
  const onFinish = async (values: CreateTeacherRequest) => {
    setLoading(true);
    try {
      const response = await teachersService.createTeacher(values);
      if (response.success) {
        message.success("Teacher created successfully!");
        router.push("/teachers");
      } else {
        showError("Failed to create teacher", response.message);
      }
    } catch (error) {
      showError("Failed to create teacher", "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper title="Add Teacher">
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
                pattern: /^(?:\+65)?[689]\d{7}$/,
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
