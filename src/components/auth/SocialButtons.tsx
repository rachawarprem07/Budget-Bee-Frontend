interface SocialButtonsProps {
  /** Label prefix shown on each button, e.g. "Continue with" or "Sign up with" */
  prefix?: string;
}

export function SocialButtons({ prefix = "Continue with" }: SocialButtonsProps) {
  return (
    <div className="space-y-3">
      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-border bg-white text-sm font-medium text-brand-charcoal transition-all hover:-translate-y-0.5 hover:border-brand-charcoal/40 hover:shadow-md"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.1A6.97 6.97 0 0 1 5.47 12c0-.73.13-1.44.36-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
        </svg>
        {prefix} Google
      </button>
      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-border bg-white text-sm font-medium text-brand-charcoal transition-all hover:-translate-y-0.5 hover:border-brand-charcoal/40 hover:shadow-md"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M16.365 1.43c0 1.14-.466 2.23-1.222 3.02-.811.85-2.131 1.51-3.235 1.42-.142-1.13.418-2.31 1.165-3.07.844-.86 2.27-1.49 3.292-1.37zM20.5 17.42c-.56 1.27-.83 1.84-1.55 2.96-1 1.55-2.42 3.49-4.18 3.5-1.56.02-1.96-1.02-4.08-1-2.13.01-2.57 1.02-4.13 1-1.76-.02-3.1-1.77-4.1-3.32-2.79-4.32-3.09-9.39-1.36-12.09 1.22-1.92 3.16-3.04 4.98-3.04 1.85 0 3.02 1.02 4.55 1.02 1.49 0 2.4-1.02 4.55-1.02 1.62 0 3.34.88 4.57 2.41-4.02 2.2-3.37 7.94.75 9.58z" />
        </svg>
        {prefix} Apple
      </button>
    </div>
  );
}
