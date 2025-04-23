import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Get the path first
  const path = request.nextUrl.pathname;
  
  // Check for auth cookie instead of using auth() function
  // This is more compatible with Edge Runtime
  const authCookie = request.cookies.get('next-auth.session-token') || 
                    request.cookies.get('__Secure-next-auth.session-token');
  const session = !!authCookie;
  

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isAuth = !!token;
  const needsProfileCompletion = token?.profileComplete === false;
  const url = request.nextUrl.clone();

  const profileCompletionRoute = '/signup';
  if ( isAuth && 
      needsProfileCompletion &&
      !url.pathname.startsWith(profileCompletionRoute) &&
      !url.pathname.startsWith('/api')
  ) {
    url.pathname = profileCompletionRoute;
    return NextResponse.redirect(url);
  }

  // Define protected routes that require authentication
  const protectedRoutes = [
    '/profile',
    '/resume-builder',
    '/chat',
  ];
  
  // Define authentication routes
  const authRoutes = [
    '/login',
    '/signup',
  ];
  
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    path === route || path.startsWith(`${route}/`)
  );
  
  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some(route => 
    path === route || path.startsWith(`${route}/`)
  );
  
  // If the user is not authenticated and trying to access a protected route,
  // redirect them to the login page
  if (isProtectedRoute && !session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', path);
    return NextResponse.redirect(loginUrl);
  }
  
  // If the user is authenticated and trying to access an auth route,
  // we need to check if they need to complete their profile
  if (isAuthRoute && session) {
    // For the signup page, we'll allow access if the user has an incomplete profile
    // This is determined by the ProfileCheck component, so we'll let it handle the logic
    if (path === '/signup') {
      // Continue with the request, ProfileCheck will handle redirection if needed
      return NextResponse.next();
    }
    
    // For other auth routes like login, redirect to home
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Otherwise, continue with the request
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Match all routes except for static files, api routes, and _next
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/chat/:path*',
    '/profile/:path*',
    '/resume-builder/:path*'
  ],
};
