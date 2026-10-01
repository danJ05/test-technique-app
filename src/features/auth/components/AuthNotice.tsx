import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

export interface AuthNoticeProps {
  children: ReactNode;
  tone?: "error" | "success";
}

export const AuthNotice = ({ children, tone = "error" }: AuthNoticeProps) => (
  <p
    role={tone === "error" ? "alert" : "status"}
    aria-live={tone === "error" ? "assertive" : "polite"}
    className={cn("text-sm", tone === "error" ? "text-primary" : "text-success")}
  >
    {children}
  </p>
);