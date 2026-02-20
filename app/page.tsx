"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-10 lg:p-16 bg-gradient-to-br from-indigo-600 to-indigo-500 text-white">
            <div className="flex items-center gap-3 mb-6">
              <Image src="/next.svg" alt="logo" width={48} height={12} className="invert" />
              <span className="font-semibold text-lg">Coaching SaaS</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">Run your coaching business with confidence</h1>
            <p className="text-indigo-100 mb-6">All-in-one platform for scheduling, courses, payments, and multi-tenant user management built for coaching academies.</p>

            <div className="flex gap-3">
              <Link href="/login" className="inline-block bg-white text-indigo-600 font-semibold py-2 px-4 rounded shadow">Login</Link>
              <button
                type="button"
                onClick={() => router.push('/register')}
                className="inline-block border border-white/30 text-white py-2 px-4 rounded"
              >
                Register
              </button>
            </div>

            <ul className="mt-8 space-y-2 text-indigo-100">
              <li>• Multi-tenant organizations and roles</li>
              <li>• Secure JWT auth with httpOnly cookies</li>
              <li>• Team management, courses and payments</li>
            </ul>
          </div>

          <div className="md:w-1/2 p-8 lg:p-12">
            <h2 className="text-lg font-semibold mb-6">Pricing Plans</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="border rounded-lg p-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-semibold">Basic</h3>
                  <div className="text-sm text-slate-500">Free</div>
                </div>
                <p className="mt-2 text-sm text-slate-600">Up to 1 coach, basic scheduling</p>
                <ul className="mt-3 text-sm text-slate-600 space-y-1">
                  <li>• 1 Coach</li>
                  <li>• Basic bookings</li>
                </ul>
                <button className="mt-4 w-full bg-slate-900 text-white py-2 rounded">Get started</button>
              </div>

              <div className="border rounded-lg p-4 shadow">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-semibold">Pro</h3>
                  <div className="text-indigo-600 font-bold">$29/mo</div>
                </div>
                <p className="mt-2 text-sm text-slate-600">Team features, analytics and payments</p>
                <ul className="mt-3 text-sm text-slate-600 space-y-1">
                  <li>• Up to 5 coaches</li>
                  <li>• Payments & billing</li>
                  <li>• Reporting</li>
                </ul>
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded">Choose Pro</button>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-semibold">Enterprise</h3>
                  <div className="text-slate-500">Custom</div>
                </div>
                <p className="mt-2 text-sm text-slate-600">Custom SLAs, onboarding and dedicated support</p>
                <ul className="mt-3 text-sm text-slate-600 space-y-1">
                  <li>• Unlimited coaches</li>
                  <li>• Dedicated onboarding</li>
                </ul>
                <button className="mt-4 w-full border border-slate-300 py-2 rounded">Contact sales</button>
              </div>
            </div>

            <div className="mt-8 text-xs text-slate-400">No credit card required for trial. Prices shown in USD.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
