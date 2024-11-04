'use client'

import { useState } from 'react'
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Prize {
  id: string
  name: string
  description: string
  minPoints: number
  currentBid: number
  image: string
}

export function StudentDashboardComponent() {
  const [points] = useState(500)
  const [prizes] = useState<Prize[]>([
    {
      id: '1',
      name: 'Movie Ticket',
      description: 'Free movie ticket',
      minPoints: 100,
      currentBid: 0,
      image: '/placeholder.png'
    },
    {
      id: '2',
      name: 'Lunch Voucher',
      description: 'Free lunch at the cafeteria',
      minPoints: 150,
      currentBid: 0,
      image: '/placeholder.png'
    },
    {
      id: '3',
      name: 'School Hoodie',
      description: 'Exclusive school hoodie',
      minPoints: 300,
      currentBid: 0,
      image: '/placeholder.png'
    }
  ])

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Welcome Section */}
      <Card className="mb-8 p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome, John Doe</h1>
        <p className="text-gray-600">Your current points: <span className="font-semibold">{points}</span></p>
      </Card>

      {/* Carousel Section */}
      <div className="relative mb-8 bg-gray-100 rounded-lg overflow-hidden">
        <div className="aspect-[3/1] relative">
          {/* Placeholder for carousel image */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="text-gray-400">Carousel Image</div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gray-800/60 text-white p-4">
          <h2 className="text-xl font-bold">New Prizes Available!</h2>
        </div>
      </div>

      {/* Available Prizes */}
      <h2 className="text-2xl font-bold mb-4">Available Prizes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prizes.map((prize) => (
          <Card key={prize.id} className="overflow-hidden">
            <div className="aspect-[4/3] relative bg-gray-100">
              {/* Placeholder for prize image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Prize Image
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-1">{prize.name}</h3>
              <p className="text-gray-600 mb-4">{prize.description}</p>
              <Button className="w-full">Place Bid</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 