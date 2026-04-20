import createMiddleware from 'next-intl/middleware';
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

// Handle i18n routing
const intlMiddleware = createMiddleware({
    locales: ['en', 'sv'],
    defaultLocale: 'en',
});

function authMiddleware(request: NextRequest) {
    const token = request.cookies.get('auth_token');
    const { pathname } = request.nextUrl;
    
    // Extract locale from pathname
    const locales = ['en', 'sv'];
    let currentLocale = 'en';
    for (const locale of locales) {
        if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
            currentLocale = locale;
            break;
        }
    }
    
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';
    const isAuthPage = pathWithoutLocale.startsWith('/login');

    // Allow public routes without authentication
    if (isPublicRoute(pathWithoutLocale)) {
        // If logged in and visiting /login, redirect to account
        if (token && isAuthPage) {
            return NextResponse.redirect(new URL(`/${currentLocale}/account`, request.url));
        }
        return NextResponse.next();
    }

    // Protected routes: redirect to login if not authenticated
    if (!token) {
        return NextResponse.redirect(new URL(`/${currentLocale}/login`, request.url));
    }

    return NextResponse.next();
}

export function middleware(request: NextRequest) {
    // Apply i18n middleware first
    const response = intlMiddleware(request);
    
    // Then apply auth middleware
    return authMiddleware(request);
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico|manifest.webmanifest|sw.js).*)'],
};