import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  error?: string;
}

export const AuthField = forwardRef<
  HTMLInputElement,
  AuthFieldProps
>(function AuthField(
  {
    label,
    icon,
    error,
    type = "text",
    className,
    id,
    ...props
  },
  ref
) {
  const [show, setShow] = useState(false);

  const isPassword = type === "password";

  const inputType = isPassword
    ? show
      ? "text"
      : "password"
    : type;

  const inputId =
    id ??
    `field-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="group">
      <label
        htmlFor={inputId}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70"
      >
        {label}
      </label>

      <div
        className={cn(
          "relative flex items-center rounded-2xl border border-border bg-white transition-all",
          "focus-within:border-brand-yellow focus-within:ring-4 focus-within:ring-brand-yellow/25",
          "hover:border-brand-charcoal/30",
          error &&
            "border-destructive focus-within:border-destructive focus-within:ring-destructive/20"
        )}
      >
        {icon && (
          <span className="pl-3.5 text-brand-charcoal/50 transition-colors group-focus-within:text-brand-charcoal">
            {icon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          type={inputType}
          className={cn(
            "h-12 w-full bg-transparent px-3.5 text-sm text-brand-charcoal placeholder:text-brand-charcoal/40 focus:outline-none",
            isPassword && "pr-11",
            className
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={
              show
                ? "Hide password"
                : "Show password"
            }
            className="absolute right-3 flex h-8 w-8 items-center justify-center rounded-lg text-brand-charcoal/60 hover:bg-brand-yellow-soft/40 hover:text-brand-charcoal"
          >
            {show ? (
              <EyeOff size={16} />
            ) : (
              <Eye size={16} />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
});