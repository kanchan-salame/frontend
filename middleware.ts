import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function base64UrlDecode(input: string) {
  try {
    // replace URL-safe chars
    input = input.replace(/-/g, '+').replace(/_/g, '/');
    // pad with '='
    const pad = input.length % 4;
    if (pad) input += '='.repeat(4 - pad);

    // prefer atob in edge runtime
    if (typeof (globalThis as any).atob === 'function') {
      const str = (globalThis as any).atob(input);
      return decodeURIComponent(
        Array.prototype.map
          .call(str, (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
    }

    // fallback to Buffer when available (node)
    if (typeof (globalThis as any).Buffer !== 'undefined') {
      return (globalThis as any).Buffer.from(input, 'base64').toString('utf8');
    }

    return null;
  } catch (e) {
    return null;
  }
}

function parseJwt(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const decoded = base64UrlDecode(payload);
    if (!decoded) return null;
    return JSON.parse(decoded);
  } catch (e) {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // allow public paths
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname === '/login' || pathname === '/') {
    return NextResponse.next();
  }

  const token = req.cookies.get('token')?.value;
  if (!token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  const payload = parseJwt(token);
  if (!payload) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // if user hits root, redirect to role home
  if (pathname === '/') {
    const role = payload.role;
    const map = {
      super_admin: '/super-admin',
      admin: '/dashboard',
      manager: '/manager',
      teacher: '/teacher',
      student: '/student',
    };
    const dest = map[role] || '/login';
    return NextResponse.redirect(new URL(dest, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard', '/super-admin', '/manager', '/teacher', '/student', '/((?!_next/static|_next/image|favicon.ico).*)'],
};
