"use client";

import { Menu } from "antd";
import Link from "next/link";
import Image from "next/image";
import { HomeOutlined, TeamOutlined, BookOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

// Define menu items outside the component
const MENU_ITEMS = [
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
];

export default function Navbar() {
  const pathname = usePathname();

  // Memoize the selected key calculation
  const selectedKey = useMemo(() => {
    if (pathname.startsWith("/teachers")) return "teachers";
    if (pathname.startsWith("/classes")) return "classes";
    return "home";
  }, [pathname]);

  return (
    <div className="shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Title */}
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

          {/* Navigation Menu */}
          <div className="flex items-center">
            <Menu
              mode="horizontal"
              selectedKeys={[selectedKey]}
              className="border-0"
              items={MENU_ITEMS}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
