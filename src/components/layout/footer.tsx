import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-sm py-10 mt-16 border-t border-purple-100 text-sm text-gray-600">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* פרטי קשר */}
        <div className="flex flex-wrap gap-6 items-center justify-center">
           <div className="flex items-center gap-2">
             <span>📞</span>
             <span>צרו קשר: בנק השחר</span>
           </div>
           <div className="flex items-center gap-2">
             <span>📱</span>
             <span>054-123-4567</span>
           </div>
           <div className="flex items-center gap-2">
             <span>📧</span>
             <span>info.il@shacharbank.com</span>
           </div>
        </div>
        
        {/* קישורים משפטיים */}
        <div className="flex flex-wrap gap-4 justify-center">
            <a href="#" className="hover:text-purple-700">מדיניות פרטיות</a>
            <span>|</span>
            <a href="#" className="hover:text-purple-700">תנאי שימוש</a>
            <span>|</span>
            <a href="#" className="hover:text-purple-700">נגישות</a>
        </div>

         {/* זכויות יוצרים */}
        <div className="text-gray-500">
            © כל הזכויות שמורות - בנק השחר
        </div>
      </div>
    </footer>
  );
};

export default Footer;
