import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Create next-intl middleware for locale routing
const intlMiddleware = createMiddleware({
    locales: ['en', 'id'],
    defaultLocale: 'en',
    localePrefix: 'as-needed',
});

// Public routes that don't require auth
const publicRoutes = ['/', '/login', '/shop', '/product', '/cart', '/about', '/contact', '/branches', '/privacy', '/terms'];

function isPublicRoute(path: string) {
    return publicRoutes.some(route => path === route || path.startsWith(route + '/'));
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('auth_token');
    
    // Let next-intl handle locale routing first
    const response = intlMiddleware(request);
    
    // Check if this is a redirect (locale redirect like / -> /en/)
    if (response.status === 307 || response.status === 308) {
        return response;
    }
    
    // Extract locale and path for auth check
    const locales = ['en', 'id'];
    let currentLocale = 'en';
    let pathWithoutLocale = pathname;
    
    for (const locale of locales) {
        if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
            currentLocale = locale;
            pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
            break;
        }
    }
    
    const isAuthPage = pathWithoutLocale.startsWith('/login');
    
    // Public routes: allow access
    if (isPublicRoute(pathWithoutLocale)) {
        // If logged in and on login page, redirect to account
        if (token && isAuthPage) {
            return NextResponse.redirect(new URL(`/${currentLocale}/account`, request.url));
        }
        return response;
    }
    
    // Protected routes: require auth
    if (!token) {
        return NextResponse.redirect(new URL(`/${currentLocale}/login`, request.url));
    }
    
    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico|manifest.webmanifest|sw.js).*)'],
};