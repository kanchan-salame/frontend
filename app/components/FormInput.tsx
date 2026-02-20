"use client"
import React, { InputHTMLAttributes, useState } from "react";

type FormInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  showToggle?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export default function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  error,
  required = false,
  showToggle = false,
  ...rest
}: FormInputProps) {
  const [visible, setVisible] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <div className="mt-1 relative">
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          type={isPassword && visible ? "text" : type}
          placeholder={placeholder}
          className={`block w-full pr-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            error ? "border-red-500" : ""
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          {...rest}
        />

        {isPassword && showToggle ? (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            tabIndex={-1}
          >
            <span className="text-gray-500 hover:text-gray-700">
              {visible ? "Hide" : "Show"}
            </span>
          </button>
        ) : null}
      </div>

      {error ? (
        <p className="mt-1 text-sm text-red-600" id={`${name}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
