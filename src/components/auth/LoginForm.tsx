import { useState, type FormEvent } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { BrandButton } from "@/components/common/BrandButton";
import { AuthField } from "./AuthField";
import { SocialButtons } from "./SocialButtons";
import { Divider } from "./Divider";

import { loginUser } from "@/services/api/auth";

export function LoginForm() {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser({
        email,
        password,
      });

      console.log("Login Success:", response);

      localStorage.setItem(
        "token",
        response.access_token
      );

      navigate("/app/dashboard");

    } catch (error) {
      console.log("Login Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-brand-charcoal">
          Login
        </h1>

        <p className="text-sm text-brand-charcoal/70">
          Enter your credentials to access your{" "}
          <span className="font-semibold text-brand-charcoal">
            Budget<span className="text-brand-yellow">Bee</span>
          </span>{" "}
          account.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>

        <AuthField
          label="Email address"
          type="email"
          placeholder="Enter your email"
          icon={<Mail size={16} />}
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthField
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon={<Lock size={16} />}
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-brand-charcoal/70">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-border accent-brand-yellow focus:ring-brand-yellow"
            />
            Remember me
          </label>

          <a
            href="#"
            className="font-medium text-brand-yellow hover:underline underline-offset-4"
          >
            Forgot Password?
          </a>
        </div>

        <BrandButton
          type="submit"
          size="lg"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </BrandButton>
      </form>

      <Divider label="or continue with" />

      <SocialButtons prefix="Continue with" />

      <p className="text-center text-xs text-brand-charcoal/60">
        By continuing, you agree to our{" "}
        <a
          href="#"
          className="font-medium text-brand-yellow hover:underline"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="font-medium text-brand-yellow hover:underline"
        >
          Privacy Policy
        </a>.
      </p>
    </div>
  );
}