import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="h-full flex items-center justify-center bg-sky-500">
      {children}
    </div>
  );
}
