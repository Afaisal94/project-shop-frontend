export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/order", "/cart", "/order/:path*"],
  // matcher: ["/((?!register|api|login).*)"],
};
