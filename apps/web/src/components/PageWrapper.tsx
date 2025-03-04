import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
  title: string;
}

const PageWrapper = ({ children, title }: PageWrapperProps) => {
  return (
    <div className="px-16 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl leading-9">{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default React.memo(PageWrapper);
