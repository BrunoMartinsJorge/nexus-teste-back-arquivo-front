import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/wallet/wallet.tsx"),
  route("login", "routes/autenticacao/page.tsx"),
] satisfies RouteConfig;