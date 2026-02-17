import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = [
    '/',
    '/login',
    '/shop',
    '/product',
    '/cart',
    '/about',
    '/contact',
    '/branches',
    '/privacy',
    '/terms',
];

function isPublicRoute(pathname: string) {
    return publicRoutes.some(
        (route) => pathname === route || pathname.startsWith(route + '/')
    );
}

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token');
    const { pathname } = request.nextUrl;
    const isAuthPage = pathname.startsWith('/login');

    // Allow public routes without authentication
    if (isPublicRoute(pathname)) {
        // If logged in and visiting /login, redirect to account
        if (token && isAuthPage) {
            return NextResponse.redirect(new URL('/account', request.url));
        }
        return NextResponse.next();
    }

    // Protected routes: redirect to login if not authenticated
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico|manifest.webmanifest|sw.js).*)'],
};