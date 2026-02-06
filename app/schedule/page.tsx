'use client';

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function CalendarPage() {
    const { data: session, status } = useSession();

  // 認証チェック中
    if (status === "loading") return <p className="p-10 text-center">読み込み中...</p>;

  // ログインしていない場合はホームへ戻す
    if (!session) {
        redirect("/");
    }
    return (
    <div className="p-4 md:p-8">
        <header className="flex justify-between items-center mb-6">
            <Link href="/" className="text-blue-600 hover:underline">← ホームへ戻る</Link>
            <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-sm text-red-500 border border-red-500 px-3 py-1 rounded hover:bg-red-50"
            >
                ログアウト
            </button>
        </header>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <iframe
            src="https://calendar.google.com/calendar/embed?src=primary&ctz=Asia/Tokyo"
            style={{ border: 0 }}
            width="100%"
            height="700px"
            frameBorder="0"
            scrolling="no"
            ></iframe>
        </div>
    </div>
    );
}