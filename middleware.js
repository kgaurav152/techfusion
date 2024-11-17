import { NextResponse } from "next/server";

export function middleware(request) {
  // Retrieve the userType from cookies
  const user = request.cookies.get("userType");
  const userType = user?.value || "unauthorized";

  const url = request.nextUrl;
  const pathname = url.pathname; 
  // Role-based access restrictions
  const restrictedPaths = {
    participant: ["/admin", "/hospitality", "/coordinator"],
    hospitality: ["/admin", "/coordinator","/eventregistrationviaca","/eventregistration"],
    coordinator: ["/admin", "/hospitality","/eventregistrationviaca","/eventregistration"],
    unauthorized: ["/admin", "/hospitality", "/coordinator","/eventregistrationviaca","/eventregistration"],
  };
  
 
  // Check if the user is trying to access a restricted path
  const isRestricted = restrictedPaths[userType]?.some((restrictedPath) =>
    pathname.startsWith(restrictedPath)
  ); 

  if (isRestricted) { 
    return NextResponse.redirect(new URL("/", request.url));
  }
 
  return NextResponse.next();
}
