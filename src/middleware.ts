import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Protect the real admin directory from direct access
  if (url.pathname.startsWith('/admin')) {
    if (!request.headers.has('x-internal-rewrite')) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  // Handle the secret admin route
  if (url.pathname.startsWith('/adcpanforpharmacyquds')) {
    const isAuth = request.cookies.get('admin_auth')?.value === 'secret_token';

    if (!isAuth) {
      url.pathname = '/adcpanforpharmacyquds-login';
      return NextResponse.redirect(url);
    }

    // Rewrite to the real /admin component
    const newPath = url.pathname.replace('/adcpanforpharmacyquds', '/admin');
    const response = NextResponse.rewrite(new URL(newPath, request.url));
    response.headers.set('x-internal-rewrite', '1');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/adcpanforpharmacyquds/:path*'],
};
