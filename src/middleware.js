// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXT_AUTH_PUBLIC_SECRET,
  });

  const { pathname } = req.nextUrl;

  const withoutAuth = ["/login"];

  // Jika user sudah login, blok akses ke halaman otentikasi
  if (token && withoutAuth.some((page) => pathname.startsWith(page))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Jika user belum login, hanya izinkan akses ke halaman otentikasi
  if (!token && !withoutAuth.some((page) => pathname.startsWith(page))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Lanjutkan permintaan
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|_next/static|_next/image|public|favicon.ico|.*\\.png$).*)",
  ],
};
