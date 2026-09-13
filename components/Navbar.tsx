"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "হোম" },
  { href: "/library", label: "ক্লাসিক লাইব্রেরি" },
  { href: "/write", label: "লিখুন" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl italic text-navy">লেখাঘর</span>
          <span aria-hidden className="text-sm text-plum">
            ❦
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink/80 transition-colors hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <button
            aria-label="খুঁজুন"
            className="text-ink/70 transition-colors hover:text-navy"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
          </button>
          <Link
            href="/login"
            className="border border-navy px-4 py-1.5 text-sm text-navy transition-colors hover:bg-navy hover:text-cream"
          >
            লগইন
          </Link>
        </div>

        <button
          className="text-ink md:hidden"
          aria-label="মেনু খুলুন"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-hairline px-5 pb-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-ink/80"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setOpen(false)} className="py-2 text-navy">
            লগইন
          </Link>
        </nav>
      )}
    </header>
  );
}
