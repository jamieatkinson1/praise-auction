'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "../components/ui/textarea"

interface Message {
  id: string
  title: string
  content: string
  dateCreated: string
  status: 'draft' | 'published'
  targetGroup: 'all' | 'students' | 'staff'
}

export function MessageManagement() {
  const [messages] = useState<Message[]>([
    {
      id: '1',
      title: 'New Prizes Available',
      content: 'Check out the new prizes in the marketplace! Limited time offers available.',
      dateCreated: '2024-03-20',
      status: 'published',
      targetGroup: 'all'
    },
    {
      id: '2',
      title: 'End of Term Auction',
      content: 'The end of term auction will begin next week. Get your points ready!',
      dateCreated: '2024-03-19',
      status: 'draft',
      targetGroup: 'students'
    }
  ])

  const handleEditMessage = (messageId: string) => {
    console.log('Edit message:', messageId)
  }

  const handleDeleteMessage = (messageId: string) => {
    console.log('Delete message:', messageId)
  }

  const handleToggleStatus = (messageId: string) => {
    console.log('Toggle status:', messageId)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Message Management</CardTitle>
        <CardDescription>Manage announcements and notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-between items-center">
          <Input 
            placeholder="Search messages..." 
            className="max-w-sm"
          />
          <Button>Create New Message</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Target Group</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>{message.title}</TableCell>
                <TableCell className="max-w-md truncate">{message.content}</TableCell>
                <TableCell>{message.dateCreated}</TableCell>
                <TableCell className="capitalize">{message.targetGroup}</TableCell>
                <TableCell>
                  <Button 
                    variant={message.status === 'published' ? "outline" : "secondary"}
                    size="sm"
                    onClick={() => handleToggleStatus(message.id)}
                  >
                    {message.status === 'published' ? 'Published' : 'Draft'}
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditMessage(message.id)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteMessage(message.id)}
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