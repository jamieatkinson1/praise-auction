'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface PrizeFormData {
  name: string
  description: string
  minPoints: number
  category: string
  image: string
}

interface PrizeFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: PrizeFormData) => Promise<void>
  initialData?: PrizeFormData
}

export function PrizeFormModal({ isOpen, onClose, onSubmit, initialData }: PrizeFormModalProps) {
  const [formData, setFormData] = React.useState<PrizeFormData>(
    initialData || {
      name: '',
      description: '',
      minPoints: 0,
      category: '',
      image: '/placeholder.png'
    }
  )
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit(formData)
      onClose()
      toast({
        title: 'Success',
        description: initialData ? 'Prize updated successfully' : 'Prize created successfully'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save prize',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Prize' : 'Add New Prize'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Prize Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="minPoints">Minimum Points</Label>
            <Input
              id="minPoints"
              type="number"
              min="0"
              value={formData.minPoints}
              onChange={(e) => setFormData({ ...formData, minPoints: parseInt(e.target.value) })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="/placeholder.png"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : initialData ? 'Update Prize' : 'Add Prize'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 