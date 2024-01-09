import React from "react";
import CardWrapper from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type Props = {};

export default function ErrorCard({}: Props) {
  return (
    <CardWrapper
      headerLabel="Oops! Somethisng went wrong!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="w-5 h-5" />
      </div>
    </CardWrapper>
  );
}
