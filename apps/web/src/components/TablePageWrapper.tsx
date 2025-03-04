import { Card } from "antd";
import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
  title: string;
  createButton: React.ReactNode;
  noDataMessage: string;
  data: any[];
}

const TablePageWrapper = ({
  children,
  title,
  createButton,
  noDataMessage,
  data = [],
}: PageWrapperProps) => {
  const noData = data.length === 0;
  return (
    <div className="px-16 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl leading-9">{title}</h1>
        {!noData && createButton}
      </div>
      <Card className="shadow-md min-h-[300px] h-full">
        {noData ? (
          <div className="flex min-h-[300px] w-full flex-col items-center justify-center">
            <h1 className="font-bold font-size-16 mb-5">{noDataMessage}</h1>
            {createButton}
          </div>
        ) : (
          children
        )}
      </Card>
    </div>
  );
};

export default React.memo(TablePageWrapper);
