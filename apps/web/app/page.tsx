"use client";

import { App, Button, message } from "antd";

export default function Home() {
  const handleClick = () => {
    message.success("Button clicked!");
  };

  return (
    <App>
      <div>
        <main>
          <Button type="primary" onClick={handleClick}>
            Click me
          </Button>
        </main>
      </div>
    </App>
  );
}
