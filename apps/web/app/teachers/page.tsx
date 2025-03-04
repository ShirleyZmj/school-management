"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Table, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import teachersService, { Teacher } from "../../src/services/teachers.service";
import TablePageWrapper from "../../src/components/TablePageWrapper";
import { useErrorMessage } from "../../src/hooks/useErrorMessage";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const { showError } = useErrorMessage();

  const fetchTeachers = useCallback(
    async (page: number = 1, limit: number = 10) => {
      setLoading(true);
      try {
        const response = await teachersService.getTeachers({ page, limit });

        if (response.success && Array.isArray(response.data.items)) {
          setTeachers(response.data.items);
          setTotal(response.data.total);
        } else {
          showError("Failed to fetch teachers", response.message);
        }
      } catch (error) {
        showError("Failed to fetch teachers", "An unexpected error occurred");
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
