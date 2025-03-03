"use client";

import { Menu, Layout } from "antd";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

const { Header } = Layout;

// Define menu items outside the component
const MENU_ITEMS = [
  {
    key: "teachers",
    label: (
      <Link href="/teachers" className="text-base font-medium !text-primary">
        Teachers
      </Link>
    ),
  },
  {
    key: "classes",
    label: (
      <Link href="/classes" className="text-base font-medium !text-primary">
        Classes
      </Link>
    ),
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  // Memoize the selected key calculation
  const selectedKey = useMemo(() => {
    if (pathname.startsWith("/teachers")) return "teachers";
    if (pathname.startsWith("/classes")) return "classes";
    return "home";
  }, [pathname]);

  return (
    <Header className="w-full shadow-md p-0 h-16 leading-[4rem] bg-white">
      <div className="flex h-full gap-12 px-16">
        {/* Logo and Title */}
        <div className="flex items-center cursor-pointer">
          <div className="flex items-center" onClick={() => router.push("/")}>
            <Image
              src="/school-logo.svg"
              alt="School Logo"
              width={40}
              height={40}
              className="mr-3"
            />
            <span className="primary-color text-xl font-semibold">
              School Portal
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1">
          <Menu
            mode="horizontal"
            selectedKeys={[selectedKey]}
            items={MENU_ITEMS}
            className="border-0"
          />
        </div>
      </div>
    </Header>
  );
}
