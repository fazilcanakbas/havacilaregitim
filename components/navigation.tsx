"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/language-context"

const menuItems = [
  { href: "/", labelKey: "nav.home" },
  { href: "/hakkimizda", labelKey: "nav.about" },
  { href: "/hizmetlerimiz", labelKey: "nav.services" },
  { href: "/blog", labelKey: "nav.blog" },
  { href: "/duyurular", labelKey: "nav.announcements" },
  { href: "/iletisim", labelKey: "nav.contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()

  const headerRef = useRef<HTMLElement | null>(null)
  const [headerHeight, setHeaderHeight] = useState<number>(0)

  // Track whether viewport is "mobile" (match Tailwind's lg breakpoint: max-width 1023px)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // measure header height and keep it in state; update on resize / layout changes / isScrolled change
  useEffect(() => {
    const el = headerRef.current
    if (!el) return

    const setHeight = () => {
      const h = Math.ceil(el.getBoundingClientRect().height)
      setHeaderHeight(h)
    }

    setHeight()

    // use ResizeObserver for robust updates when internal content/layout changes
    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => setHeight())
      ro.observe(el)
    }

    // fallback: update on window resize
    const onResize = () => setHeight()
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      if (ro) ro.disconnect()
    }
  }, [isScrolled, pathname])

  // detect mobile via matchMedia and keep it updated (only client-side)
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia === "undefined") {
      setIsMobile(false)
      return
    }

    const mq = window.matchMedia("(max-width: 1023px)")
    const setFromMq = () => setIsMobile(mq.matches)

    // initial
    setFromMq()

    // listener
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", setFromMq)
    } else if (typeof (mq as any).addListener === "function") {
      ;(mq as any).addListener(setFromMq)
    }

    return () => {
      if (typeof mq.removeEventListener === "function") {
        mq.removeEventListener("change", setFromMq)
      } else if (typeof (mq as any).removeListener === "function") {
        ;(mq as any).removeListener(setFromMq)
      }
    }
  }, [])

  const isHome = pathname === "/"

  const softGradient =
    "linear-gradient(180deg, rgba(39,56,87,0.85) 0%, rgba(18,33,58,0.6) 35%, rgba(18,33,58,0.3) 60%, rgba(18,33,58,0.08) 85%, rgba(18,33,58,0) 100%)"

  const showOverlay = isHome && !isScrolled

  const navTextColor = isScrolled || isHome ? "rgb(255,255,255)" : "#0b2a4a"

  const defaultLogo = "/havacilaregitimtext.png"
  const lacivertLogo = "/havacilaregitimtextlaci.png"
  const scrolledLogo = "/havacilaregitimtextwhite.png"

  const logoSrc = isScrolled ? scrolledLogo : !isHome ? lacivertLogo : defaultLogo

  const logoContainerClass = `relative transition-all duration-300 ease-out flex-shrink-0 ${
    isScrolled ? "w-60 h-16" : "w-60 h-16"
  }`

  // Increased reduction to tighten mobile gap more (you can tweak this)
  const MOBILE_SPACER_REDUCTION_PX = 48

  // Compute spacer height: on mobile reduce by MOBILE_SPACER_REDUCTION_PX, never below 0
  const computedSpacerHeight = headerHeight
    ? isMobile
      ? Math.max(0, headerHeight - MOBILE_SPACER_REDUCTION_PX)
      : headerHeight
    : 0

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "h-16" : "h-24"} overflow-hidden`}
        style={{
          background: isScrolled ? "#12213aff" : "transparent",
        }}
      >
        <div
          aria-hidden
          className={`absolute inset-0 pointer-events-none transition-opacity duration-600 ease-out ${showOverlay ? "opacity-100" : "opacity-0"}`}
          style={{
            background: softGradient,
            zIndex: 0,
          }}
        />

        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 20 }}>
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className={logoContainerClass}>
                <Image
                  src={logoSrc}
                  alt="HAVACILAR EĞİTİM A.Ş."
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium hover:text-primary transition-colors"
                  style={{ color: navTextColor, fontSize: 18, mixBlendMode: "normal" }}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      className={
                        "flex items-center space-x-2 rounded-md px-3 py-1 text-sm transition-colors " +
                        "hover:bg-[rgba(255,255,255,0.04)] focus:bg-[rgba(255,255,255,0.04)] active:bg-[rgba(255,255,255,0.02)] " +
                        "focus:outline-none focus:ring-0"
                      }
                      style={{
                        color: navTextColor,
                        border: `1px solid ${isScrolled ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"}`,
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        outline: "none",
                        WebkitTapHighlightColor: "transparent",
                        accentColor: "auto",
                      }}
                    >
                      <Globe className="w-4 h-4" style={{ color: navTextColor }} />
                      <span className="text-sm font-medium uppercase" style={{ color: navTextColor }}>
                        {language}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="p-1 rounded-md"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      boxShadow: "0 8px 30px rgba(2, 6, 23, 0.5)",
                      backdropFilter: "blur(10px) saturate(120%)",
                      WebkitBackdropFilter: "blur(10px) saturate(120%)",
                      backgroundClip: "padding-box",
                      color: navTextColor,
                    }}
                  >
                    <DropdownMenuItem
                      onClick={() => setLanguage("tr")}
                      className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors outline-none select-none"
                      style={{
                        backgroundColor: language === "tr" ? "rgba(35, 36, 94, 1)" : "rgba(255, 255, 255, 1)",
                        color: language === "tr" ? "#f1f1f1ff" : "#000000ff",
                        boxShadow: "none",
                      }}
                    >
                      <span className="block hover:bg-[rgba(255,255,255,0.04)]">{`🇹🇷 Türkçe`}</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => setLanguage("en")}
                      className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors outline-none select-none"
                      style={{
                        backgroundColor: language === "en" ? "rgba(35, 36, 94, 1)" : "rgba(255, 255, 255, 1)",
                        color: language === "en" ? "#ffffffff" : "#000000ff",
                        boxShadow: "none",
                      }}
                    >
                      <span className="block hover:bg-[rgba(255,255,255,0.04)]">{`🇺🇸 English`}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  size="sm"
                  className="flex items-center justify-center rounded-md p-2"
                  style={{
                    color: navTextColor,
                    border: `1px solid ${
                      isScrolled ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"
                    }`,
                    backgroundColor: "white",
                  }}
                >
                  <Menu className="w-4 h-4" style={{ color: "black" }} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col items-center space-y-6 mt-6 text-center">
                  <Link href="/">
                  <div className="relative w-48 h-16">
                    <Image
                      src="/havacilaregitimtextlaci.png"
                      alt="HAVACILAR EĞİTİM A.Ş."
                      fill
                      className="object-contain"
                    />
                  </div>
                  </Link> 
                  <nav className="flex flex-col space-y-3 w-full">
                    {menuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="py-3 text-lg font-medium text-foreground hover:text-primary transition-colors w-full text-center"
                      >
                        {t(item.labelKey)}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-4 pt-4 border-t w-full">
                    <p className="text-sm font-medium mb-2 text-muted-foreground">Dil / Language</p>
                    <div className="flex gap-2 w-full">
                      <button
                        onClick={() => {
                          setLanguage("tr")
                          setIsOpen(false)
                        }}
                        className={`flex-1 px-3 py-2 rounded-md border text-sm font-medium ${
                          language === "tr"
                            ? "bg-[#1b1b56] text-white border-[#1b1b56]"
                            : "bg-white text-foreground border"
                        }`}
                      >
                        🇹🇷 Türkçe
                      </button>
                      <button
                        onClick={() => {
                          setLanguage("en")
                          setIsOpen(false)
                        }}
                        className={`flex-1 px-3 py-2 rounded-md border text-sm font-medium ${
                          language === "en"
                            ? "bg-[#1b1b56] text-white border-[#1b1b56]"
                            : "bg-white text-foreground border"
                        }`}
                      >
                        🇺🇸 English
                      </button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            </div>
          </div>
        </nav>
      </header>

      {/* spacer only on non-home pages AND only on mobile viewports, slightly reduced to feel tighter */}
      {!isHome && isMobile && <div aria-hidden style={{ height: computedSpacerHeight ? `${computedSpacerHeight}px` : undefined }} />}
    </>
  )
}