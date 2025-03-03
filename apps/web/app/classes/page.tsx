"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Table, Button, Card, Typography, Tag, App } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import classesService, { Class } from "../services/classes.service";
import Link from "next/link";
import TablePageWrapper from "../components/TablePageWrapper";

const { Title } = Typography;

function ClassesPage() {
  const { notification } = App.useApp();
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClasses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await classesService.getClasses();
      if (response.success && Array.isArray(response.data.items)) {
        setClasses(response.data.items);
      } else {
        notification.error({
          message: "Failed to fetch classes",
          description: response.message || "Unknown error occurred",
        });
      }
    } catch (error) {
      notification.error({
        message: "Failed to fetch classes",
        description: "An error occurred while fetching classes",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const columns = useMemo(
    () => [
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
