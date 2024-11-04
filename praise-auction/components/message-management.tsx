'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function MessageManagement() {
  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    // TODO: Implement API call to send message
    console.log('Sending message:', message)
    setMessage('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Message Management</CardTitle>
        <CardDescription>Create and send announcements to students</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Enter your announcement here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mb-4"
        />
        <Button onClick={handleSendMessage}>Send Announcement</Button>
      </CardContent>
    </Card>
  )
}