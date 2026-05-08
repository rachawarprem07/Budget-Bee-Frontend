import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

function LoginPage() {
  return (
    <>
      <AuthLayout
        topPrompt="New here?"
        topLinkLabel="Create an account"
        topLinkTo="/signup"
        sideTitle={
          <>
            Welcome back!
            <br />
            Let's manage your money <span className="text-brand-yellow">smarter.</span>
          </>
        }
        sideText="Log in to continue your journey towards financial freedom."
      >
        <LoginForm />
      </AuthLayout>
    </>
  );
}

export default LoginPage;
