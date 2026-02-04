export default function Home() {
  // ここにリンクのデータを作っておきます
  const apps = [
    { name: 'Toyo-net ACE', url: 'https://www.toyo.ac.jp/', color: 'bg-blue-600' },
    { name: 'Toyo-net G', url: 'https://g-sys.toyo.ac.jp/', color: 'bg-green-600' },
    { name: 'INIAD MOOCS', url: 'https://moocs.iniad.org/', color: 'bg-purple-600' },
    { name: 'Slack', url: 'slack://open', color: 'bg-red-500' }, // Slackアプリを開く
  ];

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
    </main>
  );
}