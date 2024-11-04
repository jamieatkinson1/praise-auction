'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { PrizeFormModal } from './prize-form-modal'
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

export function PrizeManagement() {
  const [prizes, setPrizes] = useState<Prize[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPrize, setSelectedPrize] = useState<Prize | undefined>()
  const { toast } = useToast()

  useEffect(() => {
    fetchPrizes()
  }, [])

  const fetchPrizes = async () => {
    try {
      console.log('Fetching prizes...')
      const response = await fetch('/api/prizes')
      console.log('Fetch response:', response)
      if (!response.ok) throw new Error('Failed to fetch prizes')
      const data = await response.json()
      console.log('Fetched prizes:', data)
      setPrizes(data)
    } catch (error) {
      console.error('Fetch error:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch prizes',
        variant: 'destructive',
      })
    }
  }

  const handleAddPrize = () => {
    console.log('Add prize clicked')
    setSelectedPrize(undefined)
    setIsModalOpen(true)
  }

  const handleEditPrize = (prize: Prize) => {
    setSelectedPrize(prize)
    setIsModalOpen(true)
  }

  const handleSubmitPrize = async (formData: Omit<Prize, 'id' | 'currentBid'>) => {
    try {
      const url = selectedPrize 
        ? `/api/prizes/${selectedPrize.id}`
        : '/api/prizes'
      
      const response = await fetch(url, {
        method: selectedPrize ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to save prize')
      
      fetchPrizes()
    } catch (error) {
      throw error // Let the modal handle the error
    }
  }

  const handleDeletePrize = async (prizeId: string) => {
    if (!confirm('Are you sure you want to delete this prize?')) return

    try {
      const response = await fetch(`/api/prizes/${prizeId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete prize')

      toast({
        title: 'Success',
        description: 'Prize deleted successfully',
      })

      fetchPrizes()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete prize',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Prize Management</CardTitle>
              <CardDescription>Manage auction prizes</CardDescription>
            </div>
            <Button onClick={handleAddPrize}>Add New Prize</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Min Points</TableHead>
                <TableHead>Current Bid</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prizes.map((prize) => (
                <TableRow key={prize.id}>
                  <TableCell>
                    <div className="relative w-12 h-12">
                      <Image
                        src={prize.image || "/placeholder.png"}
                        alt={prize.name}
                        width={100}
                        height={100}
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{prize.name}</TableCell>
                  <TableCell>{prize.description}</TableCell>
                  <TableCell>{prize.minPoints}</TableCell>
                  <TableCell>{prize.currentBid || 'No bids'}</TableCell>
                  <TableCell>{prize.category}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditPrize(prize)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeletePrize(prize.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {prizes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No prizes found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <PrizeFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitPrize}
        initialData={selectedPrize}
      />
    </>
  )
} 