'use client';
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Home() {
  // リンクのデータを配列で管理
  const apps = [
    { name: 'Toyo-net ACE', url: 'https://www.ace.toyo.ac.jp/', color: 'bg-blue-600' },
    { name: 'Toyo-net G', url: 'https://g-sys.toyo.ac.jp/portal/', color: 'bg-green-600' },
    { name: 'INIAD MOOCS', url: 'https://moocs.iniad.org/', color: 'bg-purple-600' },
    { name: 'Slack', url: 'slack://open', color: 'bg-red-500' }, // Slackアプリを開く
    { name: 'Classroom', url: 'https://classroom.google.com/', color: 'bg-amber-500' },
    { name: 'Gemini', url: 'https://gemini.google.com/', color: 'bg-indigo-500' },
    { name: 'ChatGPT', url: 'https://chatgpt.com/', color: 'bg-teal-600',  },
    { name: 'Timetable', url: '/timetable', color: 'bg-gray-700',  },
    { name: 'X', url: 'https://x.com/', color: 'bg-black' },
    { name: 'Discord', url: 'https://discord.com/app', color: 'bg-indigo-600' },
    ];
  const { data: session } = useSession();
  const router = useRouter()

  // カスタムリンク機能のロジック開始
  const [customApps, setCustomApps] = useState<{ name: string; url: string; color: string }[]>([]);
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // 起動時に保存されたデータを読み込む
  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = localStorage.getItem('myCustomApps');
      if (saved) {
        try {
          setCustomApps(JSON.parse(saved));
        } catch (e) {
          console.error("データの読み込みに失敗しました", e);
        }
      }
      setIsLoaded(true); 
    }, 0);

    // クリーンアップ
    return () => clearTimeout(timer);
  }, []);

  // 新しいアプリを追加
  const addApp = () => {
    if (!newName || !newUrl) return;
    const newApp = { name: newName, url: newUrl, color: 'bg-gray-700' };
    const updatedApps = [...customApps, newApp];
    
    setCustomApps(updatedApps);
    localStorage.setItem('myCustomApps', JSON.stringify(updatedApps));
    setNewName('');
    setNewUrl('');
  };

  // アプリを削除
  const deleteApp = (index: number) => {
    const updatedApps = customApps.filter((_, i) => i !== index);
    setCustomApps(updatedApps);
    localStorage.setItem('myCustomApps', JSON.stringify(updatedApps));
  };
  // カスタムリンク機能のロジック終了


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
            className={`${app.color} h-32 flex flex-col items-center justify-center rounded-2xl shadow-lg hover:opacity-90 transition-opacity`}
          >
            <span className="text-xl font-bold">{app.name}</span>
          </a>
        ))}

        {/* ユーザーが追加したアプリを表示 */}
        {isLoaded && customApps.map((app, index) => (
          <div key={index} className="relative group">
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${app.color} h-32 flex flex-col items-center justify-center rounded-2xl shadow-lg hover:opacity-90 transition-opacity`}
            >
              <span className="text-xl font-bold">{app.name}</span>
            </a>
            {/* 削除ボタン */}
            <button
              onClick={() => deleteApp(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-md z-10"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      {/* リンク追加フォーム */}
      <div className="mt-8 mb-8 p-4 bg-gray-800 rounded-xl border border-gray-700">
        <h3 className="text-lg font-bold mb-4 text-center">＋ 自分のリンクを追加</h3>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="名前 (例: YouTube)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="URL (例: https://...)"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={addApp}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors"
          >
            追加する
          </button>
        </div>
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