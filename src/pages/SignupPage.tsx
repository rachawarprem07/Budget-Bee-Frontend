import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";

function SignupPage() {
  return (
    <>
      <AuthLayout
        topPrompt="Already have an account?"
        topLinkLabel="Login"
        topLinkTo="/login"
        sideTitle={
          <>
            Start your journey
            <br />
            to <span className="text-brand-yellow">financial freedom.</span>
          </>
        }
        sideText="Create an account and take control of your finances today."
      >
        <SignupForm />
      </AuthLayout>
    </>
  );
}

export default SignupPage;
