// app/schedule/page.tsx
'use client';

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function SchedulePage() {
    const { data: session, status } = useSession() || {}; //npm run buildで引っかかるので後ろ付け足した
    // 認証チェック中
    if (status === "loading") return <div className="p-10 text-center text-gray-500">読み込み中...</div>;
    // 認可されていない場合はホームへ強制リダイレクト
    if (!session) {
        redirect("/");
    }
    return (
    <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
            <h2 className="font-semibold text-lg text-blue-900">スケジュール</h2>
            <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-sm text-gray-500 hover:text-red-500 transition"
            >
                ログアウト
            </button>
        </nav>
        <main className="p-4 md:p-8 h-[calc(100vh-80px)]">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full border border-gray-200">
                <iframe
                src="https://calendar.google.com/calendar/embed?src=primary&ctz=Asia/Tokyo"
                style={{ border: 0 }}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                ></iframe>
            </div>
        </main>
    </div>
    );
}