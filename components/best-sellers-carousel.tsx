"use client"

import React, { useEffect, useCallback } from 'react'
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import { Star } from 'lucide-react'

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
}

const products: Product[] = [
  { id: 1, name: "Zapatos Elegantes", price: 89.99, image: "/assets/zapato-elegante.jpeg", rating: 4.5 },
  { id: 2, name: "Bolso de Cuero", price: 129.99, image: "/assets/bolso.webp", rating: 4.8 },
  { id: 3, name: "Tacones Altos", price: 99.99, image: "/assets/tacones.jpg", rating: 4.2 },
  { id: 4, name: "Sandalias de Verano", price: 59.99, image: "/assets/sandalias.jpg", rating: 4.7 },
  { id: 5, name: "Cartera de Moda", price: 79.99, image: "/assets/wallet.jpg", rating: 4.6 },
]

interface BestSellersCarouselProps {
  setEmblaApi?: (api: UseEmblaCarouselType[1]) => void
}

export function BestSellersCarousel({ setEmblaApi }: BestSellersCarouselProps) {
  const autoplayOptions = {
    delay: 4000,
    rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
    stopOnInteraction: false, // This will prevent autoplay from stopping after user interaction
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', skipSnaps: false },
    [Autoplay(autoplayOptions)]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    if (setEmblaApi) {
      setEmblaApi(emblaApi)
    }
  }, [emblaApi, onSelect, setEmblaApi])

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex -mx-4">
          {products.map((product) => (
            <div className="flex-[0_0_100%] min-w-0 px-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]" key={product.id}>
              <Card className="h-full overflow-visible group transition-all duration-300 shadow-md hover:shadow-xl rounded-lg">
                <CardContent className="p-0 relative overflow-hidden rounded-t-lg">
                  <div className="relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
                    <div className="absolute top-2 left-2 z-10">
                      <Badge variant="secondary" className="bg-primary text-primary-foreground">Más Vendido</Badge>
                    </div>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={400}
                      className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover rounded-t-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 transition-opacity duration-300">
                      <CardTitle className="text-xl mb-2 text-white font-semibold">{product.name}</CardTitle>
                      <p className="text-gray-200 font-bold text-lg">${product.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
                        ))}
                        <span className="ml-2 text-sm text-white">{product.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-3">
                  <Button className="w-full" variant="secondary">Añadir al carrito</Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

