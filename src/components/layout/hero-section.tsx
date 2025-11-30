import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative h-[520px] md:h-[640px] flex items-center overflow-hidden"
    >
      {/* 1. תמונת הרקע - מוגדרת כאלמנט נפרד לשליטה טובה יותר */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/assets/images/city-background.png")',
          backgroundSize: 'cover',
          // שינוי חשוב: מצמיד את הבניינים לתחתית כדי שלא ייחתכו
          backgroundPosition: 'center bottom',
        }}
      />

      {/* 2. שכבת ה-Overlay המשופרת */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-purple-900/85 via-purple-800/75 to-rose-600/60 mix-blend-multiply"></div>

      {/* אפשר להוסיף שכבה נוספת עדינה להכהות את הטקסט אם צריך */}
      <div className="absolute inset-0 z-0 bg-black/15"></div>
      <div className="absolute -left-10 -top-10 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl"></div>
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-indigo-600/25 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* 3. תיקון RTL: שימוש ב-border-s ו-ps במקום צדדים פיזיים */}
        <div className="max-w-2xl text-white ps-10 border-s-4 border-amber-300/90">
          <div className="inline-flex items-center gap-3 bg-white/10 text-sm md:text-base px-4 py-2 rounded-full backdrop-blur-md border border-white/20 mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-300 animate-pulse"></span>
            שירות דיגיטלי אישי
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg tracking-tight">
            בוקר חדש,<br />
            בנקאות חדשה.
          </h1>
          <p className="text-lg md:text-2xl text-purple-100/90 font-light drop-shadow-md mb-6">
            הצטרפו לבנק השחר ותגידו תודה כל בוקר על חוויית בנקאות מתקדמת, פשוטה ואנושית.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="bg-white text-purple-900 font-bold px-6 py-3 rounded-full shadow-lg hover:-translate-y-0.5 transition-transform">
              פתיחת חשבון דיגיטלית
            </button>
            <button className="border border-white/40 text-white font-semibold px-5 py-3 rounded-full hover:bg-white/10 transition-colors">
              שיחה עם בנקאי
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
