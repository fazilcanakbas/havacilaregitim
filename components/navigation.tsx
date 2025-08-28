  "use client"

  import { useState, useEffect } from "react"
  import Link from "next/link"
  import Image from "next/image"
  import { Button } from "@/components/ui/button"
  import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
  import { Menu, Globe } from "lucide-react"
  import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
  import { useLanguage } from "@/lib/language-context"

  const menuItems = [
    { href: "/", labelKey: "nav.home" },
    { href: "/kurumsal", labelKey: "nav.corporate" },
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

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10)
      }
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-background/90 backdrop-blur-sm"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-70 h-70">
                <Image
                  src="/havacilaregitimtext.png"
                  alt="HAVACILAR EĞİTİM A.Ş."
                  fill
                  className="object-contain"
                
                />
              </div>
              {/* <div className="hidden sm:block">
                <h1 className="font-bold text-lg text-foreground">
                  {language === "tr" ? "HAVACILAR EĞİTİM" : "AVIATION EDUCATION"}
                </h1>
              </div> */}
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm font-medium uppercase">{language}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => setLanguage("tr")}
                    className={`cursor-pointer ${language === "tr" ? "bg-accent" : ""}`}
                  >
                    🇹🇷 Türkçe
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setLanguage("en")}
                    className={`cursor-pointer ${language === "en" ? "bg-accent" : ""}`}
                  >
                    🇺🇸 English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline" size="sm">
                    <Menu className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col space-y-6 mt-6">
                    <div className="flex items-center space-x-3 pb-4 border-b">
                      <div className="relative w-8 h-8">
                        <Image
                          src="/havacilaregitimtext.png"
                          alt="HAVACILAR EĞİTİM A.Ş."
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h2 className="font-bold text-foreground">
                        {language === "tr" ? "HAVACILAR EĞİTİM" : "AVIATION EDUCATION"}
                      </h2>
                    </div>

                    <nav className="flex flex-col space-y-2">
                      {menuItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="text-foreground hover:text-primary transition-colors py-2"
                        >
                          {t(item.labelKey)}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>
    )
  }
