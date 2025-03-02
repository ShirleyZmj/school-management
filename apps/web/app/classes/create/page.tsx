"use client";

import { useState, useEffect } from "react";
import { Form, Input, Button, Card, Typography, Select, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Title } = Typography;
const { Option } = Select;

interface Teacher {
  id: number;
  name: string;
}

interface ClassFormData {
  name: string;
  level: string;
  form_teacher_id: number;
}

export default function CreateClassPage() {
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 模拟API调用获取教师列表
    setTimeout(() => {
      setTeachers([
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Robert Johnson" },
      ]);
      setLoadingTeachers(false);
    }, 1000);
  }, []);

  const onFinish = async (values: ClassFormData) => {
    setLoading(true);

    // 模拟API调用
    setTimeout(() => {
      console.log("Form values:", values);
      message.success("Class created successfully!");
      setLoading(false);
      router.push("/classes");
    }, 1000);
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
              <Option value="Primary 1">Primary 1</Option>
              <Option value="Primary 2">Primary 2</Option>
              <Option value="Primary 3">Primary 3</Option>
              <Option value="Primary 4">Primary 4</Option>
              <Option value="Primary 5">Primary 5</Option>
              <Option value="Primary 6">Primary 6</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Form Teacher"
            name="form_teacher_id"
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
