import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  const protocol =
    headers.get('X-Forwarded-Proto') || request.nextUrl.protocol || 'http';
  const host = headers.get('X-Forwarded-Host') || request.nextUrl.host;

  headers.set('x-next-host', host);
  headers.set('x-next-protocol', protocol);

  console.log(headers.get('X-Forwarded-Host'));

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
