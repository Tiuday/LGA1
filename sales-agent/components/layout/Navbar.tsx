"use client";

interface NavbarProps {
  title?: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="h-14 border-b border-surface-border flex items-center px-6 bg-surface-1/80 backdrop-blur-sm sticky top-0 z-30">
      {title && (
        <h1 className="text-sm font-mono text-white/60">{title}</h1>
      )}
    </header>
  );
}
