'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Bid {
  id: string
  prizeName: string
  bidAmount: number
  status: 'active' | 'won' | 'lost' | 'outbid'
  dateCreated: string
  currentHighestBid: number
}

export function StudentBids() {
  const [bids] = useState<Bid[]>([
    {
      id: '1',
      prizeName: 'Movie Ticket',
      bidAmount: 120,
      status: 'active',
      dateCreated: '2024-03-20',
      currentHighestBid: 120
    },
    {
      id: '2',
      prizeName: 'School Hoodie',
      bidAmount: 300,
      status: 'outbid',
      dateCreated: '2024-03-19',
      currentHighestBid: 350
    },
    // Add more mock bids
  ])

  const getStatusBadgeColor = (status: Bid['status']) => {
    const colors = {
      active: 'bg-blue-100 text-blue-800',
      won: 'bg-green-100 text-green-800',
      lost: 'bg-red-100 text-red-800',
      outbid: 'bg-yellow-100 text-yellow-800'
    }
    return colors[status]
  }

  const handleUpdateBid = (bidId: string) => {
    // TODO: Implement bid update logic
    console.log(`Updating bid ${bidId}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Bids</CardTitle>
        <CardDescription>Track your active and past bids</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prize</TableHead>
              <TableHead>Your Bid</TableHead>
              <TableHead>Current Highest</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bids.map((bid) => (
              <TableRow key={bid.id}>
                <TableCell>{bid.prizeName}</TableCell>
                <TableCell>{bid.bidAmount} points</TableCell>
                <TableCell>{bid.currentHighestBid} points</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeColor(bid.status)}`}>
                    {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>{bid.dateCreated}</TableCell>
                <TableCell>
                  {bid.status === 'outbid' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleUpdateBid(bid.id)}
                    >
                      Update Bid
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 