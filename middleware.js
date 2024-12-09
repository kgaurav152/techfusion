import { NextResponse } from "next/server";

export function middleware(request) {
  // Retrieve the userType from cookies
  const user = request.cookies.get("userType");
  const userType = user?.value || "unauthorized";

  const url = request.nextUrl;
  const pathname = url.pathname;
  // Role-based access restrictions
  const restrictedPaths = {
    participant: [
      "/admin",
      "/hospitality",
      "/coordinator",
      "/schoolfacilitator",
    ],
    hospitality: [
      "/admin",
      "/coordinator",
      "/schoolfacilitator",
      "/eventregistrationviaca",
      "/eventregistration",
    ],
    coordinator: [
      "/admin",
      "/hospitality",
      "/schoolfacilitator",
      "/eventregistrationviaca",
      "/eventregistration",
    ],
    schoolfacilitator: [
      "/admin",
      "/coordinator",
      "/hospitality",
      "/eventregistrationviaca",
      "/eventregistration",
    ],
    unauthorized: [
      "/admin",
      "/hospitality",
      "/coordinator",
      "/eventregistrationviaca",
      "/eventregistration",
    ],
  };

  // Check if the user is trying to access a restricted path
  const isRestricted = restrictedPaths[userType]?.some((restrictedPath) =>
    pathname.startsWith(restrictedPath)
  );

  if (isRestricted) {
    if (userType == "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    } else if (userType == "coordinator") {
      return NextResponse.redirect(
        new URL("/coordinator/manage-event-participants", request.url)
      );
    } else if (userType == "hospitality") {
      return NextResponse.redirect(
        new URL("/hospitality/dashboard", request.url)
      );
    } else if (userType == "schoolfacilitator") {
      return NextResponse.redirect(new URL("/schoolfacilitator", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
