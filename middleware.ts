import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  
  // Public routes that don't require authentication
  const publicPaths = [
    "/sign-in",
    "/api/auth",
    "/_next",
    "/favicon.ico",
    "/images",
    "/css",
    "/js"
  ];
  
  // Check if the current path is public
  const isPublicPath = publicPaths.some(path => 
    pathname.startsWith(path)
  );
  
  // If it's a public path, allow access
  if (isPublicPath) return;
  
  // If user is not authenticated, redirect to sign-in
  if (!req.auth) {
    const signInUrl = new URL("/sign-in", req.nextUrl.origin);
    signInUrl.searchParams.set("callbackUrl", req.url);
    return Response.redirect(signInUrl);
  }
});

// Configure which routes to use middleware on
export const config = {
  matcher: [
    
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};