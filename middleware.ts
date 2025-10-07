// middleware.ts
import { auth } from "@/auth";

export default auth((req) => {


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