"use client";

import { useEffect, useState } from "react";

const RESEND_DELAY_SECONDS = 30;

interface OtpResendCountdownProps {
  isPending: boolean;
  onResend: () => void;
}

export const OtpResendCountdown = ({ isPending, onResend }: OtpResendCountdownProps) => {
  const [remainingSeconds, setRemainingSeconds] = useState(RESEND_DELAY_SECONDS);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemainingSeconds((seconds) => {
        if (seconds <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return seconds - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
      <span className="text-ink">Pas encore reçu ? 00:{String(remainingSeconds).padStart(2, "0")}</span>
      {/* Annonce unique quand le renvoi devient possible, plutôt qu'à chaque seconde. */}
      <span role="status" className="sr-only">
        {remainingSeconds === 0 ? "Vous pouvez demander un nouveau code." : ""}
      </span>
      <button
        type="button"
        disabled={remainingSeconds > 0 || isPending}
        onClick={onResend}
        className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:text-muted-foreground disabled:no-underline"
      >
        Renvoyer
      </button>
    </div>
  );
};