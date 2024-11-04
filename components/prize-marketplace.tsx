'use client'

import { useState } from 'react'
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import Image from 'next/image'

interface Prize {
  id: string
  name: string
  description: string
  minPoints: number
  currentBid: number
  image: string
  category: string
}

export function PrizeMarketplace() {
  const [prizes] = useState<Prize[]>([
    {
      id: '1',
      name: 'Movie Ticket',
      description: 'Free movie ticket for any showing',
      minPoints: 100,
      currentBid: 120,
      image: '/placeholder.jpg',
      category: 'Entertainment'
    }
  ])

  const [bidAmount, setBidAmount] = useState('')

  const handleBid = (prize: Prize) => {
    console.log(`Placing bid of ${bidAmount} points on ${prize.name}`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {prizes.map((prize) => (
        <Card key={prize.id}>
          <CardHeader>
            <CardTitle>{prize.name}</CardTitle>
            <CardDescription>{prize.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square mb-4 relative">
              <Image
                src={prize.image}
                alt={prize.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex justify-between mb-4">
              <div>Minimum Points: {prize.minPoints}</div>
              <div>Current Bid: {prize.currentBid}</div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Place Bid</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Place a Bid</DialogTitle>
                  <DialogDescription>
                    Enter your bid amount for {prize.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter bid amount"
                    min={prize.currentBid}
                  />
                  <Button onClick={() => handleBid(prize)}>Confirm Bid</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 