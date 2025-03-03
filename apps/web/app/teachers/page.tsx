"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Table, Button, Card, Space, Typography, App } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import teachersService, { Teacher } from "../services/teachers.service";
import TablePageWrapper from "../components/TablePageWrapper";

const { Title } = Typography;

export default function TeachersPage() {
  const { notification } = App.useApp();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const fetchTeachers = useCallback(
    async (page: number = 1, limit: number = 10) => {
      setLoading(true);
      try {
        const response = await teachersService.getTeachers({ page, limit });

        if (response.success && Array.isArray(response.data.items)) {
          setTeachers(response.data.items);
          setTotal(response.data.total);
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
    },
    []
  );

  useEffect(() => {
    fetchTeachers();
  }, []);

  const columns = useMemo(
    () => [
      {
        title: "#",
        dataIndex: "index",
        key: "index",
        render: (_: any, __: any, index: number) => index + 1,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Subject",
        dataIndex: "subject",
        key: "subject",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Work Contact",
        dataIndex: "contactNumber",
        key: "contactNumber",
      },
    ],
    []
  );

  return (
    <TablePageWrapper
      title="Teachers"
      data={teachers}
      noDataMessage="There are no existing teachers yet."
      createButton={
        <Link href="/teachers/create">
          <Button type="primary" icon={<PlusOutlined />}>
            Add Teacher
          </Button>
        </Link>
      }
    >
      <Table
        columns={columns}
        dataSource={teachers}
        rowKey="id"
        loading={loading}
        pagination={{
          total: total,
          pageSize: 10,
          onChange: (page, pageSize) => {
            fetchTeachers(page, pageSize);
          },
        }}
      />
    </TablePageWrapper>
  );
}
