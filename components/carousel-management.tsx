'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"
import Image from 'next/image'

interface CarouselSlide {
  id: string
  title: string
  image: string
  order: number
  isActive: boolean
  link?: string
}

export function CarouselManagement() {
  const [slides] = useState<CarouselSlide[]>([
    {
      id: '1',
      title: 'Welcome to Praise Points',
      image: '/placeholder.jpg',
      order: 1,
      isActive: true,
      link: '/about'
    },
    {
      id: '2',
      title: 'New Prizes Available',
      image: '/placeholder.jpg',
      order: 2,
      isActive: true
    }
  ])

  const handleEditSlide = (slideId: string) => {
    console.log('Edit slide:', slideId)
  }

  const handleDeleteSlide = (slideId: string) => {
    console.log('Delete slide:', slideId)
  }

  const handleToggleActive = (slideId: string) => {
    console.log('Toggle active status:', slideId)
  }

  const handleReorder = (slideId: string, direction: 'up' | 'down') => {
    console.log('Reorder slide:', slideId, direction)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Carousel Management</CardTitle>
        <CardDescription>Manage homepage carousel slides</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end">
          <Button>Add New Slide</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Link</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {slides.map((slide) => (
              <TableRow key={slide.id}>
                <TableCell>
                  <div className="relative w-20 h-12">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                </TableCell>
                <TableCell>{slide.title}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {slide.order}
                    <div className="flex flex-col">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleReorder(slide.id, 'up')}
                        disabled={slide.order === 1}
                      >
                        ↑
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleReorder(slide.id, 'down')}
                        disabled={slide.order === slides.length}
                      >
                        ↓
                      </Button>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Button 
                    variant={slide.isActive ? "outline" : "secondary"}
                    size="sm"
                    onClick={() => handleToggleActive(slide.id)}
                  >
                    {slide.isActive ? 'Active' : 'Inactive'}
                  </Button>
                </TableCell>
                <TableCell>{slide.link || 'No link'}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditSlide(slide.id)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteSlide(slide.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 