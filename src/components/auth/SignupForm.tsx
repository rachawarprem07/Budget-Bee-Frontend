import { useState, type FormEvent } from "react";
import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BrandButton } from "@/components/common/BrandButton";
import { AuthField } from "./AuthField";
import { SocialButtons } from "./SocialButtons";
import { Divider } from "./Divider";

export function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const mismatch = confirm.length > 0 && confirm !== password;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (mismatch) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/app/dashboard");
    }, 600);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-brand-charcoal">Sign up</h1>
        <p className="text-sm text-brand-charcoal/70">
          Create your{" "}
          <span className="font-semibold text-brand-charcoal">
            Budget<span className="text-brand-yellow">Bee</span>
          </span>{" "}
          account and start saving smarter.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <AuthField
          label="Full name"
          placeholder="Enter your full name"
          icon={<User size={16} />}
          autoComplete="name"
          required
        />
        <AuthField
          label="Email address"
          type="email"
          placeholder="Enter your email"
          icon={<Mail size={16} />}
          autoComplete="email"
          required
        />
        <AuthField
          label="Password"
          type="password"
          placeholder="Create a password"
          icon={<Lock size={16} />}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <AuthField
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          icon={<Lock size={16} />}
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={mismatch ? "Passwords don't match" : undefined}
          required
        />

        <label className="flex cursor-pointer items-start gap-2 text-sm text-brand-charcoal/70">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 rounded border-border accent-brand-yellow focus:ring-brand-yellow"
          />
          <span>
            I agree to the{" "}
            <a href="#" className="font-medium text-brand-yellow hover:underline">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="font-medium text-brand-yellow hover:underline">Privacy Policy</a>.
          </span>
        </label>

        <BrandButton type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </BrandButton>
      </form>

      <Divider label="or continue with" />
      <SocialButtons prefix="Continue with" />
    </div>
  );
}
