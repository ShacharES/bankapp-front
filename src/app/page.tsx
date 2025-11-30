import React from 'react';
import Navbar from '@/components/layout/navbar';
import HeroSection from '@/components/layout/hero-section';
import FeatureCard from '@/components/layout/featureCard';
import Footer from '@/components/layout/footer';
import { FeatureItem } from '@/lib/types/app';

const featuresData: FeatureItem[] = [
  {
    id: 1,
    icon: <img src="/assets/icons/phone-bank.svg" className="w-20 h-20 object-contain" />,
    title: 'פתיחת חשבון דיגיטלית',
    description: 'פתיחת חשבון דיגיטלית, הצטרפו לבנק השחר בקלות.',
    buttonText: 'פתיחת חשבון',
  },
  {
    id: 2,
    icon: <img src="/assets/icons/hand-cash.svg" className="w-20 h-20 object-contain" />,
    title: 'הלוואה ברגע',
    description: 'הלוואה דיגיטלית מהירה בתנאים אטרקטיביים. הכסף אצלכם בחשבון.',
    buttonText: 'בדיקת זכאות',
  },
  {
    id: 3,
    icon: <img src="/assets/icons/investments.svg" className="w-20 h-20 object-contain" />,
    title: 'ייעוץ השקעות מתקדם',
    description: 'ליווי פיננסי חכם ומותאם אישית לניהול תיק ההשקעות שלכם.',
    buttonText: 'תיאום פגישה',
  },
];

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50 font-sans">
      <Navbar />
      
      <HeroSection />

      <main className="container mx-auto px-4 -mt-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresData.map((feature) => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
