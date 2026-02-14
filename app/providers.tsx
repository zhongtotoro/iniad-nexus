// app/providers.tsx
'use client'; // クライアントコンポーネントとして定義

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}