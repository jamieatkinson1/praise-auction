'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Announcement {
  id: string
  title: string
  message: string
  date: string
  isRead: boolean
}

export function StudentAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'New Prizes Added!',
      message: 'Check out the new prizes available in the marketplace. Limited time offers available!',
      date: '2024-03-20',
      isRead: false
    },
    {
      id: '2',
      title: 'End of Term Auction',
      message: 'The end of term auction will begin next week. Get your points ready!',
      date: '2024-03-19',
      isRead: true
    },
    // Add more mock announcements
  ])

  const markAsRead = (id: string) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === id 
        ? { ...announcement, isRead: true }
        : announcement
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Announcements</CardTitle>
        <CardDescription>Stay updated with the latest news</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          {announcements.map((announcement) => (
            <Card 
              key={announcement.id} 
              className={`mb-4 ${!announcement.isRead ? 'border-blue-500' : ''}`}
              onClick={() => markAsRead(announcement.id)}
            >
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{announcement.title}</CardTitle>
                  <span className="text-sm text-muted-foreground">{announcement.date}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p>{announcement.message}</p>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 