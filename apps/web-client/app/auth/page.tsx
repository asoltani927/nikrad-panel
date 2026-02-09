"use client";

import { useState } from "react";
import LoginForm from "./components/LoginForm";
import OtpForm from "./components/OtpForm";

export default function LoginPage() {
  const [normalizedPhone, setNormalizedPhone] = useState<string | null>(null);

  return (
    <div>
      {!normalizedPhone ? (
        <LoginForm onSuccess={setNormalizedPhone} />
      ) : (
        <OtpForm phone={normalizedPhone} />
      )}
    </div>
  );
}