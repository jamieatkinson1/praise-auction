'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'

interface CarouselItem {
  id: string
  image: string
  title: string
}

export function CarouselManagement() {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([])
  const [newItem, setNewItem] = useState({ image: '', title: '' })

  const handleAddItem = () => {
    if (newItem.image && newItem.title) {
      setCarouselItems([...carouselItems, { ...newItem, id: Date.now().toString() }])
      setNewItem({ image: '', title: '' })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Carousel Management</CardTitle>
        <CardDescription>Add and manage carousel items</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Image URL"
            value={newItem.image}
            onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
            className="mb-2"
          />
          <Input
            placeholder="Title"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            className="mb-2"
          />
          <Button onClick={handleAddItem}>Add Carousel Item</Button>
        </div>
        <div>
          {carouselItems.map((item) => (
            <div key={item.id} className="mb-2">
              <div className="relative aspect-square">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}