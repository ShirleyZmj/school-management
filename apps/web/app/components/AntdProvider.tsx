"use client";

import "@ant-design/v5-patch-for-react-19";

import { StyleProvider } from "@ant-design/cssinjs";
import { App, ConfigProvider } from "antd";
import type { FC, PropsWithChildren } from "react";

import "../globals.css";
import "antd/dist/reset.css";

const AntdProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider
        theme={{
          cssVar: true,
          hashed: false,
          token: {
            colorPrimary: "#135BB4",
          },
        }}
      >
        <App>{children}</App>
      </ConfigProvider>
    </StyleProvider>
  );
};

export default AntdProvider;
