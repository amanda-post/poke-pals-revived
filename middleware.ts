import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuthorized = !!token;
    const isAuthorizationPage =
      req.nextUrl.pathname.includes('/login') ||
      req.nextUrl.pathname.includes('/register');
    const isLandingPage = req.nextUrl.pathname === '/';

    if (isAuthorizationPage) {
      if (isAuthorized) {
        if (token?.authUsername) {
          return NextResponse.redirect(new URL('/dashboard', req.url));
        } else {
          return NextResponse.redirect(new URL('/creation', req.url));
        }
      }

      return null;
    }

    if (!isAuthorized && !isLandingPage) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/:path*'],
};
