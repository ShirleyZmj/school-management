"use client";

import { useState, useEffect } from "react";
import { Table, Button, Card, Space, Typography, Tag, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Title } = Typography;

interface Class {
  id: number;
  name: string;
  level: string;
  formTeacher: {
    id: number;
    name: string;
  };
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟API调用
    setTimeout(() => {
      setClasses([
        {
          id: 1,
          name: "Class 1A",
          level: "Primary 1",
          formTeacher: {
            id: 1,
            name: "John Doe",
          },
        },
        {
          id: 2,
          name: "Class 2B",
          level: "Primary 2",
          formTeacher: {
            id: 2,
            name: "Jane Smith",
          },
        },
        {
          id: 3,
          name: "Class 3C",
          level: "Primary 3",
          formTeacher: {
            id: 3,
            name: "Robert Johnson",
          },
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const columns = [
    {
      title: "Class Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      render: (level: string) => <Tag color="blue">{level}</Tag>,
    },
    {
      title: "Form Teacher",
      dataIndex: "formTeacher",
      key: "formTeacher",
      render: (teacher: { id: number; name: string }) => teacher.name,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: Class) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} size="small">
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => message.success(`Would delete class ${record.name}`)}
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
        <Title level={2}>Classes</Title>
        <Link href="/classes/create">
          <Button type="primary" icon={<PlusOutlined />}>
            Add Class
          </Button>
        </Link>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={classes}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
}
