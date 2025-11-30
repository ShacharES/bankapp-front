import React from 'react';
import { FeatureItem } from '@/lib/types/app';

const FeatureCard: React.FC<FeatureItem> = ({ icon, title, description, buttonText }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center transform hover:-translate-y-2 transition-transform duration-300 border border-purple-100 hover:border-purple-200">
      <div className="flex justify-center mb-6">
        <div className="text-purple-700 w-16 h-16 flex items-center justify-center bg-gradient-to-br from-purple-50 to-rose-50 rounded-full border border-purple-100 shadow-inner">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      <button className="bg-gradient-to-r from-purple-700 to-rose-600 hover:brightness-110 text-white font-semibold py-2.5 px-10 rounded-full shadow-lg transition-all">
        {buttonText}
      </button>
    </div>
  );
};

export default FeatureCard;
