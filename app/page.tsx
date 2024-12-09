"use client"

import { Header } from '@/components/header'
import { BestSellersCarousel } from '@/components/best-sellers-carousel'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import { useState } from 'react'
import { UseEmblaCarouselType } from 'embla-carousel-react'

export default function Home() {
  const [, setEmblaApi] = useState<UseEmblaCarouselType[1] | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative min-h-screen flex flex-col justify-center pt-[140px] pb-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-pink-950 dark:via-purple-950 dark:to-blue-950"></div>
            <div className="absolute inset-0 opacity-30 dark:opacity-40 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-300 via-purple-200 to-blue-300 dark:from-pink-700 dark:via-purple-800 dark:to-blue-700"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_var(--tw-gradient-stops))] from-transparent via-pink-200/30 to-transparent dark:via-pink-800/30"></div>
          </div>
          <div className="relative z-10 py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center font-serif">
                Nuestros Más Vendidos
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
                Descubre nuestra selección de productos más populares, elegidos por nuestros clientes más exigentes.
              </p>
            </div>
            <div className="relative">
              <BestSellersCarousel setEmblaApi={setEmblaApi} />
            </div>
          </div>
        </section>
        <section className="bg-background py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-center font-serif">Bienvenida a Trendy Shoes</h1>
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Descubre nuestra exquisita colección de zapatos y accesorios de moda, diseñados para la mujer moderna y sofisticada.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="bg-card shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <CardTitle className="text-primary text-2xl">Producto Destacado {i}</CardTitle>
                    <CardDescription className="text-base">Una joya de nuestra colección</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative overflow-hidden rounded-md">
                      <Image
                        src={`/placeholder.svg?height=200&width=300&text=Producto+${i}`}
                        alt={`Producto ${i}`}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <Button variant="secondary" className="text-white bg-primary hover:bg-primary/90">Ver Detalles</Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-primary">$99.99</span>
                    <Button variant="outline">Añadir al Carrito</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

