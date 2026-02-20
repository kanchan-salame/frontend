"use client"
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import FormInput from "../components/FormInput";
import Toast from "../components/Toast";
import Spinner from "../components/Spinner";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    organization: "",
    adminName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success" | "error" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.organization.trim()) e.organization = "Organization name is required";
    if (!form.adminName.trim()) e.adminName = "Admin full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!emailRegex.test(form.email)) e.email = "Invalid email format";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (!form.confirmPassword) e.confirmPassword = "Confirm your password";
    else if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        organization: form.organization.trim(),
        adminName: form.adminName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
      };

      await axios.post("/api/auth/register", payload);

      setToast({ show: true, message: "Registration successful — redirecting to login", type: "success" });
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || "Registration failed";
      setToast({ show: true, message: String(msg), type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toast show={toast.show} message={toast.message} type={toast.type} onClose={() => setToast((t) => ({ ...t, show: false }))} />

      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your organization</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Register as an organization admin to get started</p>
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 gap-4">
              <FormInput
                label="Organization Name"
                name="organization"
                value={form.organization}
                onChange={handleChange}
                placeholder="Your organization"
                required
                error={errors.organization}
              />

              <FormInput
                label="Admin Full Name"
                name="adminName"
                value={form.adminName}
                onChange={handleChange}
                placeholder="Jane Doe"
                required
                error={errors.adminName}
              />

              <FormInput
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@yourcompany.com"
                required
                error={errors.email}
              />

              <FormInput
                label="Phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 555 555 5555"
                required
                error={errors.phone}
              />

              <FormInput
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                required
                showToggle
                error={errors.password}
              />

              <FormInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
                showToggle
                error={errors.confirmPassword}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Spinner />
                    Registering...
                  </span>
                ) : (
                  "Create Organization"
                )}
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
