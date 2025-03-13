"use client";

import { useState, useEffect, useMemo, useCallback, ChangeEventHandler, ChangeEvent } from "react";
import { Table, Button, Input } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import teachersService, { Teacher } from "../../src/services/teachers.service";
import TablePageWrapper from "../../src/components/TablePageWrapper";
import { useErrorMessage } from "../../src/hooks/useErrorMessage";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState('');
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

  const handleSearch = () => {

  };

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.currentTarget.value);
  }, []);


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
      <Input value={keyword} onChange={handleChange} onPressEnter={handleSearch} className="mb-4" size="large" placeholder="Search by name, email or contact number" prefix={<SearchOutlined />} />
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
