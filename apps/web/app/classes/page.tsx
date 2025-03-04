"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Table, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import classesService, { Class } from "@/app/services/classes.service";
import Link from "next/link";
import TablePageWrapper from "@/app/components/TablePageWrapper";
import { useErrorMessage } from "@/app/hooks/useErrorMessage";

function ClassesPage() {
  const { showError } = useErrorMessage();
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClasses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await classesService.getClasses();
      if (response.success && Array.isArray(response.data.items)) {
        setClasses(response.data.items);
      } else {
        showError("Failed to fetch classes", response.message);
      }
    } catch (error) {
      showError(
        "Failed to fetch classes",
        "An error occurred while fetching classes"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
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
        title: "Class Level",
        dataIndex: "level",
        key: "level",
      },
      {
        title: "Class Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Form Teacher",
        dataIndex: "formTeacher",
        key: "formTeacher",
        render: (formTeacher: { id: number; name: string }) => formTeacher.name,
      },
    ],
    []
  );

  return (
    <TablePageWrapper
      title="Classes"
      data={classes}
      noDataMessage="There are no existing classes yet."
      createButton={
        <Link href="/classes/create">
          <Button type="primary" icon={<PlusOutlined />}>
            Add Class
          </Button>
        </Link>
      }
    >
      <Table
        columns={columns}
        dataSource={classes}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </TablePageWrapper>
  );
}

export default ClassesPage;
