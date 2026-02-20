"use client";
import { useEffect, useState } from "react";
import Calender from "./components/calendar/client";
export default function Home() {
  // リンクのデータを配列で管理
  const apps = [
    {
      name: "Toyo-net ACE",
      url: "https://www.ace.toyo.ac.jp/",
      color: "bg-blue-600",
    },
    {
      name: "Toyo-net G",
      url: "https://g-sys.toyo.ac.jp/portal/",
      color: "bg-green-600",
    },
    {
      name: "INIAD MOOCS",
      url: "https://moocs.iniad.org/",
      color: "bg-purple-600",
    },
    { name: "Slack", url: "slack://open", color: "bg-red-500" }, // Slackアプリを開く
    {
      name: "Classroom",
      url: "https://classroom.google.com/",
      color: "bg-amber-500",
    },
    {
      name: "Gemini",
      url: "https://gemini.google.com/",
      color: "bg-indigo-500",
    },
    { name: "ChatGPT", url: "https://chatgpt.com/", color: "bg-teal-600" },
    { name: "Timetable", url: "/timetable", color: "bg-gray-700" },
    { name: "X", url: "https://x.com/", color: "bg-black" },
    { name: "Discord", url: "https://discord.com/app", color: "bg-indigo-600" },
  ];


  // サイドバーMore Toyoリンク集
  const moreToyoLinks = [
    { name: '赤羽台事務課', url: 'https://sites.google.com/iniad.org/iniad-office-students' },
    { name: 'INIAD 開発者サイト', url: 'https://sites.google.com/iniad.org/developers' },
    { name: '赤羽台図書館 利用ポータル', url: 'https://sites.google.com/toyo.jp/akabanelib' },
    { name: '東洋大学奨学金制度', url: 'https://sites.google.com/toyo.jp/gakubu-scholarship/' },
    { name: '在学生証明書発行・申請手続', url: 'https://sites.google.com/toyo.jp/certificate/' },

  ];

  // const [user, setUser] = useState<unknown>(null);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //カスタムリンク機能
  const [customApps, setCustomApps] = useState<{ name: string; url: string; color: string }[]>([]);
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('myCustomApps');
        if (saved) {
          try {
            setCustomApps(JSON.parse(saved));
          } catch (e) {
            console.error("データの読み込みに失敗しました", e);
          }
        }
        setIsLoaded(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // 追加
  const addApp = () => {
    if (!newName || !newUrl) return;
    const newApp = { name: newName, url: newUrl, color: 'bg-gray-700' };
    const updatedApps = [...customApps, newApp];
    setCustomApps(updatedApps);
    localStorage.setItem('myCustomApps', JSON.stringify(updatedApps));
    setNewName('');
    setNewUrl('');
  };

  // 削除
  const deleteApp = (index: number) => {
    const updatedApps = customApps.filter((_, i) => i !== index);
    setCustomApps(updatedApps);
    localStorage.setItem('myCustomApps', JSON.stringify(updatedApps));
  };
  // カスタムリンクここまで

  const [supabaseUser, setSupabaseUser] = useState(null);
  useEffect(() => {
  // API の新しい場所に合わせる
  fetch("/api/calendar-user") 
    .then((res) => res.json())
    .then((data) => setSupabaseUser(data));
}, []);


  return (
    <main className="min-h-screen p-8 bg-gray-900 text-white ">
      {/* タイトル部分 */}
      <h1 className="text-3xl font-bold text-center mb-8">INIAD Nexus</h1>
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
            <button
              onClick={() => deleteApp(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-md z-10"
            >
              ×
            </button>
          </div>
        ))}
        {/*ここまで*/}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="bg-gray-800 border-2 border-gray-600 h-32 flex flex-col items-center justify-center rounded-2xl shadow-lg hover:bg-gray-700 transition-colors"
        >
          <span className="text-xl font-bold">More Toyo +</span>
        </button>
      </div>
        {/*ここから：リンク追加フォーム*/}
      <div className="mt-8 mb-8 p-4 bg-gray-800 rounded-xl border border-gray-700 max-w-sm mx-auto">
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
      {/*ここまで*/}
        <Calender user={supabaseUser} />
      {/* サイドバー */}{/* 1. 背景の黒い幕（クリックで閉じる） */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* 2. サイドバー本体（左からスライドイン） */}
        <div
          className={`fixed top-0 left-0 h-full w-72 bg-white text-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6">
            {/* ヘッダー部分と閉じるボタン */}
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <h2 className="text-2xl font-bold text-red-700">More Toyo</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-500 hover:text-gray-800 text-3xl font-bold leading-none"
              >
                ×
              </button>
            </div>

            {/* リンクのリスト */}
            <div className="flex flex-col gap-4">
              {moreToyoLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-red-600 hover:bg-red-50 p-3 rounded-lg transition-colors font-medium text-sm border border-transparent hover:border-red-100"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
    </main>
  );
}
