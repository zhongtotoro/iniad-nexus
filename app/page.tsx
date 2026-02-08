'use client';
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
export default function Home() {
  // リンクのデータを配列で管理
  const apps = [
    { name: 'Toyo-net ACE', url: 'https://www.toyo.ac.jp/', color: 'bg-blue-600' },
    { name: 'Toyo-net G', url: 'https://g-sys.toyo.ac.jp/portal/', color: 'bg-green-600' },
    { name: 'INIAD MOOCS', url: 'https://moocs.iniad.org/', color: 'bg-purple-600' },
    { name: 'Slack', url: 'slack://open', color: 'bg-red-500' }, // Slackアプリを開く
    { name: 'Classroom', url: 'https://classroom.google.com/', color: 'bg-amber-500' },
    { name: 'Gemini', url: 'https://gemini.google.com/', color: 'bg-indigo-500' },
    // ChatGPTだけ横長にするための設定（fullWidth）を勝手につけました！不要なら消してOK
    { name: 'ChatGPT', url: 'https://chatgpt.com/', color: 'bg-teal-600', fullWidth: true },
    ];
  const { data: session } = useSession();
  return (
    <main className="min-h-screen p-8 bg-gray-900 text-white">
      {/* タイトル部分 */}
      <h1 className="text-3xl font-bold text-center mb-8">
        INIAD Nexus
      </h1>
      {/* アプリのアイコンを並べる部分 */}
      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        {apps.map((app) => (
          <a
            key={app.name}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${app.color} h-32 flex flex-col items-center justify-center rounded-2xl shadow-lg hover:opacity-90 transition-opacity`}
          >
            <span className="text-xl font-bold">{app.name}</span>
          </a>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        {!session ? (
          // 未ログイン時
          <div className="text-center">
            <p className="mb-4 text-gray-600">課題を管理するにはログインしてください</p>
            <button
            onClick={() => signIn("google")}
            className="bg-white border border-gray-300 px-6 py-3 rounded-lg shadow-sm flex items-center gap-2 hover:bg-gray-50 transition"
            >
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="google" />
              Googleでログイン
            </button>
          </div>
        ) : (
          // ログイン済み
          <div className="text-center">
            <p className="mb-6 text-xl">ようこそ、{session.user?.name}さん</p>
            <Link 
            href="/schedule" 
            className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-700 shadow-lg transition transform hover:scale-105 inline-block"
            >
              自分のカレンダーを確認する →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}