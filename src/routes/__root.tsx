import { Outlet, createRootRoute } from "@tanstack/react-router";
import ThemeProvider from "../context/themeProvider";

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </>
  ),
});
