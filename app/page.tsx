'use client';
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Home() {
  // リンクのデータを配列で管理
  const apps = [
<<<<<<< HEAD
    { name: 'Toyo-net ACE', url: 'https://www.toyo.ac.jp/', color: 'bg-blue-600' },
=======
    { name: 'Toyo-net ACE', url: 'https://www.ace.toyo.ac.jp/', color: 'bg-blue-600' },
>>>>>>> main
    { name: 'Toyo-net G', url: 'https://g-sys.toyo.ac.jp/portal/', color: 'bg-green-600' },
    { name: 'INIAD MOOCS', url: 'https://moocs.iniad.org/', color: 'bg-purple-600' },
    { name: 'Slack', url: 'slack://open', color: 'bg-red-500' }, // Slackアプリを開く
    { name: 'Classroom', url: 'https://classroom.google.com/', color: 'bg-amber-500' },
    { name: 'Gemini', url: 'https://gemini.google.com/', color: 'bg-indigo-500' },
<<<<<<< HEAD
    // ChatGPTだけ横長にするための設定（fullWidth）を勝手につけました！不要なら消してOK
    { name: 'ChatGPT', url: 'https://chatgpt.com/', color: 'bg-teal-600', fullWidth: true },
=======
    { name: 'ChatGPT', url: 'https://chatgpt.com/', color: 'bg-teal-600',  },
    { name: 'Timetable', url: '/timetable', color: 'bg-gray-700',  },
>>>>>>> main
    ];
  const { data: session } = useSession();
  const router = useRouter()
  useEffect(()=>{
    if(session){
      router.replace("/schedule");
    }
  },[session,router])
  return (
    <main className="min-h-screen p-8 bg-gray-900 text-white ">
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
            className={`${app.color} h-15 flex flex-col items-center justify-center rounded-2xl shadow-lg hover:opacity-90 transition-opacity`}
          >
            <span className="text-xl font-bold">{app.name}</span>
          </a>
        ))}
      </div>
      <div className="mt-8 rounded-2xl flex flex-col items-center justify-center">
        {!session && (
          <button
            // callbackUrl を指定することで、認可後に自動遷移します
            onClick={() => signIn("google", { callbackUrl: "/schedule" })}
            className="flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all shadow-sm"
          >
            <img src="https://www.google.com/favicon.ico" alt="G" className="w-5 h-5" />
            GoogleCalendarを開く
          </button>
        )}
      </div>
    </main>
  );
}