// src/components/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import { NavLink } from '@/lib/types/app';

// נתונים לדוגמה לקישורים
const navLinks: NavLink[] = [
  { label: 'עובר ושב', href: '/login' },
  { label: 'הלוואות', href: '/login' },
  { label: 'השקעות', href: '/login' },
  { label: 'דיגיטל', href: '/login' },
  { label: 'אודות', href: '#' },
];

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white/90 backdrop-blur-xl border-b border-purple-100 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        <div className="flex items-center space-x-3 space-x-reverse">
            <img src="/assets/icons/sunrise.svg" className="w-14 h-12 md:w-16 drop-shadow-sm" />
          <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-900 to-rose-600 text-transparent bg-clip-text tracking-tight">
            בנק השחר
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-4 space-x-reverse font-semibold text-gray-700">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              className="px-3 py-2 rounded-full hover:text-purple-800 hover:bg-purple-50 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div>
          <Link
            href="/login"
            className="bg-gradient-to-r from-purple-800 to-rose-700 hover:brightness-110 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all"
          >
            כניסה לחשבון
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
