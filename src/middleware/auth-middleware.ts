import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function authMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (token && pathname === '/auth/login') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (token?.user_type === 'User') {
    const allowedRoutes = ['/dashboard/user', '/dashboard/user/profile'];

    if (!allowedRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/dashboard/user', req.url));
    }
  }

  return NextResponse.next();
}
