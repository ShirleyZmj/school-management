"use client";

import "@ant-design/v5-patch-for-react-19";

import { StyleProvider } from "@ant-design/cssinjs";
import { App, ConfigProvider, Layout } from "antd";
import type { FC, PropsWithChildren } from "react";

import "@/src/styles/globals.css";
import "antd/dist/reset.css";
import Navbar from "./Navbar";

const { Content } = Layout;

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
          components: {
            Layout: {
              headerBg: "#ffffff",
              bodyBg: "#ffffff",
            },
          },
        }}
      >
        <App>
          <Layout>
            <Navbar />
            <Content>{children}</Content>
          </Layout>
        </App>
      </ConfigProvider>
    </StyleProvider>
  );
};

export default AntdProvider;
