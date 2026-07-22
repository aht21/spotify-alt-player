import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { exchangeAuthorizationCode, saveTokens } from "../../services/auth";

export const Route = createFileRoute("/auth/callback")({
  validateSearch: (search: Record<string, unknown>) => ({
    code: search.code as string | undefined,
  }),
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();
  const { code } = Route.useSearch();

  useEffect(() => {
    if (!code) {
      navigate({ to: "/preview", replace: true });
      return;
    }

    const authorize = async () => {
      try {
        const response = await exchangeAuthorizationCode(code);
        saveTokens(response);
        navigate({ to: "/", replace: true });
      } catch (error) {
        console.error(error);
      }
    };

    authorize();
  }, [code, navigate]);

  return <div>Getting your token...</div>;
}
