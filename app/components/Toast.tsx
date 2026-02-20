"use client"
import React, { useEffect } from "react";

type ToastProps = {
  show: boolean;
  message: string;
  type?: "success" | "error";
  onClose?: () => void;
};

export default function Toast({ show, message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => onClose && onClose(), 3500);
    return () => clearTimeout(t);
  }, [show, onClose]);

  if (!show) return null;

  const bg = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div className="fixed top-6 right-6 z-50">
      <div
        className={`${bg} text-white rounded-md shadow-lg px-4 py-3 w-80 max-w-sm`}
        role="status"
        aria-live="polite"
      >
        <div className="text-sm font-medium">{message}</div>
      </div>
    </div>
  );
}
