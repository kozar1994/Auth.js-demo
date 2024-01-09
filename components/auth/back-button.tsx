"use client";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = { label: string; href: string };

export default function BackButton({ href, label }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({
          variant: "link",
          className: "font-normal w-full",
          size: "sm",
        })
      )}
    >
      {label}
    </Link>
  );
}
