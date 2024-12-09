"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Image from 'next/image'
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const marquee = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const MarqueeContainer = styled.div`
  display: flex;
  animation: ${marquee} 20s linear infinite;
`;

const categories = [
  { name: "Zapatos", href: "/categoria/zapatos" },
  { name: "Bolsos", href: "/categoria/bolsos" },
  { name: "Accesorios", href: "/categoria/accesorios" },
  { name: "Ofertas", href: "/ofertas" },
]

const promotions = [
  "¡50% de descuento en zapatos de verano!",
  "Envío gratis en compras superiores a $100",
  "Nueva colección de bolsos - ¡Ya disponible!",
  "Ofertas especiales solo por este fin de semana"
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      "fixed w-full z-50 bg-background transition-all duration-300",
      isScrolled ? "shadow-md" : ""
    )}>
      <div className={cn(
        "bg-primary text-primary-foreground overflow-hidden transition-all duration-300",
        isScrolled ? "h-0" : "h-10"
      )}>
        <div className="container mx-auto px-4 h-full flex items-center">
          <MarqueeContainer className="whitespace-nowrap">
            {[...promotions, ...promotions].map((promo, index) => (
              <span key={index} className="mx-8 text-sm font-medium">{promo}</span>
            ))}
          </MarqueeContainer>
        </div>
      </div>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center w-full md:w-auto justify-between md:justify-start">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Menú</span>
            </Button>
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.svg" alt="Trendy Shoes Logo" width={40} height={40} />
              <span className="text-xl font-bold text-primary">Trendy Shoes</span>
            </Link>
          </div>
          <nav className={cn("w-full md:w-auto mt-4 md:mt-0", isMobileMenuOpen ? "block" : "hidden md:block")}>
            <ul className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-6">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link href={category.href} className="text-foreground hover:text-primary transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="relative">
              <Input
                type="search"
                placeholder="Buscar..."
                className="w-full md:w-40 lg:w-60 pr-8"
              />
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5 text-foreground" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="outline" size="sm" className="text-foreground hover:text-primary-foreground hover:bg-primary transition-colors">
              <User className="h-4 w-4 mr-2" />
              Iniciar sesión
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

