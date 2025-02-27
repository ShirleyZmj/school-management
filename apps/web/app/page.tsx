"use client";

import { Button, message } from "antd";

export default function Home() {
  const handleClick = () => {
    message.success("Button clicked!");
  };

  return (
    <div>
      <main>
        <Button type="primary" onClick={handleClick}>
          Click me
        </Button>
      </main>
    </div>
  );
}
