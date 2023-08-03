import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (
      request.nextUrl.pathname.startsWith('/dashboard') &&
      request.nextauth.token?.role !== 'ADMIN'
    ) {
      return NextResponse.rewrite(new URL('/', request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = { matcher: ['/dashboard'] };
