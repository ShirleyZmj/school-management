"use client";

import { Button, Card, Row, Col, Statistic } from "antd";
import { TeamOutlined, BookOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();

  const handleClick = (type: "teachers" | "classes") => {
    if (type === "teachers") {
      router.push("/teachers");
    } else {
      router.push("/classes");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-500">Welcome to the School Management System</p>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card hoverable>
            <Statistic
              title="Total Teachers"
              value={42}
              prefix={<TeamOutlined />}
            />
            <Button
              type="primary"
              className="mt-4"
              onClick={() => handleClick("teachers")}
            >
              View Teachers
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card hoverable>
            <Statistic
              title="Total Classes"
              value={16}
              prefix={<BookOutlined />}
            />
            <Button
              type="primary"
              className="mt-4"
              onClick={() => handleClick("classes")}
            >
              View Classes
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
