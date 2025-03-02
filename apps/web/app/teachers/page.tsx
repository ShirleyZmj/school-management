"use client";

import { useState, useEffect } from "react";
import { Table, Button, Card, Space, Typography, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Title } = Typography;

interface Teacher {
  id: number;
  name: string;
  email: string;
  subject: string;
  contact_number: string;
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟API调用
    setTimeout(() => {
      setTeachers([
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@school.com",
          subject: "Mathematics",
          contact_number: "123-456-7890",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane.smith@school.com",
          subject: "Science",
          contact_number: "123-456-7891",
        },
        {
          id: 3,
          name: "Robert Johnson",
          email: "robert.johnson@school.com",
          subject: "History",
          contact_number: "123-456-7892",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Contact",
      dataIndex: "contact_number",
      key: "contact_number",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: Teacher) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} size="small">
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() =>
              message.success(`Would delete teacher ${record.name}`)
            }
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>Teachers</Title>
        <Link href="/teachers/create">
          <Button type="primary" icon={<PlusOutlined />}>
            Add Teacher
          </Button>
        </Link>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={teachers}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
}
