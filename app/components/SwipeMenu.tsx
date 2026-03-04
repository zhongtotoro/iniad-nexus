'use client';

import { useState, useRef } from 'react';

export default function SwipeMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [startY, setStartY] = useState(0); // 触り始めた位置
  const menuRef = useRef<HTMLDivElement>(null);

  // タッチ開始
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  // タッチ終了時の判定
  const handleTouchEnd = (e: React.TouchEvent) => {
    const endY = e.changedTouches[0].clientY;
    const distance = endY - startY;

    // 50px以上下にスワイプしたら開く
    if (distance > 50 && !isOpen) {
      setIsOpen(true);
    } 
    // 50px以上上にスワイプしたら閉じる
    else if (distance < -50 && isOpen) {
      setIsOpen(false);
    }
  };

// ... (上の部分は変更なし)

  return (
    <>
      {/* 背景タップで閉じるオーバーレイ */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-[2px]"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div 
        ref={menuRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`fixed top-0 left-0 w-full z-[100] transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
          isOpen ? 'translate-y-0' : '-translate-y-[65%]' 
        }`}
      >
        {/* メニュー本体：bg-slate-800 (深みのある紺色寄りの水色) を採用 */}
        {/* border-blue-500/50 で、他の青いパーツとの統一感を出します */}
        <div className="bg-slate-800 text-slate-100 p-6 shadow-2xl border-b-4 border-blue-500/50 h-96 flex flex-col justify-start">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-black text-blue-400 tracking-tighter uppercase">Quick Settings</h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              {isOpen ? "Close View" : "Swipe Down"}
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            {[
              { label: '通知', icon: '🔔' },
              { label: 'モード', icon: '🌙' },
              { label: '接続', icon: '📶' }
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-3">
                {/* アイコン枠も少し暗めの水色で統一 */}
                <div className="w-16 h-16 bg-slate-700 border border-slate-600 flex items-center justify-center text-3xl shadow-inner">
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-slate-300">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 掴み（ハンドル）部分：三角形 */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-center items-start h-24 w-full cursor-grab active:cursor-grabbing group bg-transparent"
        >
          <div className="flex flex-col items-center">
            {/* 三角形は、INIADカラーに近い少し濃いめの青を採用 */}
            <div 
              className={`w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent transition-all duration-300 ${
                isOpen 
                  ? 'border-b-[20px] border-b-blue-500 mt-2' 
                  : 'border-t-[26px] border-t-blue-600 drop-shadow-[0_10px_15px_rgba(37,99,235,0.4)]' 
              }`}
            ></div>
            
            {!isOpen && (
              <span className="text-[10px] text-blue-400 font-bold mt-1 tracking-tighter opacity-80">PULL DOWN</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}