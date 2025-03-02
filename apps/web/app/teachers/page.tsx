"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Table, Button, Card, Space, Typography, App } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import teachersService, { Teacher } from "../services/teachers.service";

const { Title } = Typography;

export default function TeachersPage() {
  const { notification, message } = App.useApp();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTeachers = useCallback(async () => {
    setLoading(true);
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
        message: "Error",
        description: "Failed to fetch teachers",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const handleDelete = useCallback(
    async (id: number, name: string) => {
      try {
        const response = await teachersService.deleteTeacher(id);
        if (response.success) {
          message.success(`Teacher ${name} deleted successfully`);
          fetchTeachers();
        } else {
          notification.error({
            message: "Failed to delete teacher",
            description: response.message || "Unknown error occurred",
          });
        }
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Failed to delete teacher",
        });
      }
    },
    [fetchTeachers]
  );

  const columns = useMemo(
    () => [
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
        dataIndex: "contactNumber",
        key: "contactNumber",
      },
      {
        title: "Actions",
        key: "actions",
        render: (_: any, record: Teacher) => (
          <Space size="middle">
            <Link href={`/teachers/edit/${record.id}`}>
              <Button type="primary" icon={<EditOutlined />} size="small">
                Edit
              </Button>
            </Link>
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => handleDelete(record.id, record.name)}
            >
              Delete
            </Button>
          </Space>
        ),
      },
    ],
    [handleDelete]
  );

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
          pagination={false}
        />
      </Card>
    </div>
  );
}
