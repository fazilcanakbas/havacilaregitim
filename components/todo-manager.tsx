"use client"

import { useLanguage } from "@/lib/language-context"

export function TodoManager() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
        <p className="text-sm text-muted-foreground mb-2">
          {language === "tr" ? "Dil:" : "Language:"} {language.toUpperCase()}
        </p>
        <button
          onClick={() => setLanguage(language === "tr" ? "en" : "tr")}
          className="text-primary hover:text-accent transition-colors text-sm"
        >
          {language === "tr" ? "Switch to English" : "Türkçe'ye Geç"}
        </button>
      </div>
    </div>
  )
}
