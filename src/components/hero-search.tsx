"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function HeroSearch() {
  return (
    <div 
      className="w-full max-w-xl relative cursor-text group"
      onClick={() => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
      }}
    >
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <Input 
        className="w-full h-14 pl-10 pr-16 bg-background border-2 border-border/50 shadow-sm text-lg rounded-2xl focus-visible:ring-primary/50 cursor-pointer" 
        placeholder="Search for a tool... (e.g., JSON formatter)"
        readOnly
      />
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
    </div>
  );
}
