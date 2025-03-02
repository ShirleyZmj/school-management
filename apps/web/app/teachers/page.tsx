"use client";

import { useState, useEffect } from "react";
import { Table, Button, Card, Space, Typography, App } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import teachersService, { Teacher } from "../services/teachers.service";

const { Title } = Typography;

export default function TeachersPage() {
  const { notification, message } = App.useApp();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchTeachers = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await teachersService.getTeachers({
        page,
        pageSize,
      });

      if (response.success && response.data) {
        setTeachers(response.data.items);
        setPagination({
          current: response.data.page,
          pageSize: response.data.pageSize,
          total: response.data.total,
        });
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
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleTableChange = (pagination: any) => {
    fetchTeachers(pagination.current, pagination.pageSize);
  };

  const handleDelete = async (id: number, name: string) => {
    try {
      const response = await teachersService.deleteTeacher(id);
      if (response.success) {
        message.success(`Teacher ${name} deleted successfully`);
        fetchTeachers(pagination.current, pagination.pageSize);
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
  };

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
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} items`,
          }}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
}
