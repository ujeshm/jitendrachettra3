import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // const accessToken = request.cookies.get('lmcVotersUser')?.value;
  // const { pathname } = request.nextUrl;

  // if (!accessToken && pathname !== '/login') {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // if (accessToken && pathname === '/login') {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
