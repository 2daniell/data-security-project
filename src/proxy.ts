import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {

    const isServerAction = request.headers.has("Next-Action")

    if (!request.cookies.has("session") && !isServerAction) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    const pathname = request.nextUrl.pathname;

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-pathname', pathname);

    if (isServerAction) {
        return NextResponse.next();
    }

    return NextResponse.next({ headers: requestHeaders  });
}

export const config = {
    matcher: ["/app/:path*"],
};
