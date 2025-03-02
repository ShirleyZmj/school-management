"use client";

import { Menu } from "antd";
import Link from "next/link";
import Image from "next/image";
import { HomeOutlined, TeamOutlined, BookOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // 确定当前选中的菜单项
  const getSelectedKey = () => {
    if (pathname.startsWith("/teachers")) return "teachers";
    if (pathname.startsWith("/classes")) return "classes";
    return "home";
  };

  return (
    <div className="shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo 和标题 */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/school-logo.svg"
                alt="School Logo"
                width={40}
                height={40}
                className="mr-3"
              />
              <span className="text-xl font-semibold">School Portal</span>
            </Link>
          </div>

          {/* 导航菜单 */}
          <div className="flex items-center">
            <Menu
              mode="horizontal"
              selectedKeys={[getSelectedKey()]}
              className="border-0"
              items={[
                {
                  key: "home",
                  icon: <HomeOutlined />,
                  label: <Link href="/">Home</Link>,
                },
                {
                  key: "teachers",
                  icon: <TeamOutlined />,
                  label: <Link href="/teachers">Teachers</Link>,
                },
                {
                  key: "classes",
                  icon: <BookOutlined />,
                  label: <Link href="/classes">Classes</Link>,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
