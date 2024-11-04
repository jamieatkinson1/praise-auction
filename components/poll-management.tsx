'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"

interface PollOption {
  id: string
  text: string
  votes: number
}

interface Poll {
  id: string
  question: string
  options: PollOption[]
  startDate: string
  endDate: string
  isActive: boolean
  totalVotes: number
}

export function PollManagement() {
  const [polls] = useState<Poll[]>([
    {
      id: '1',
      question: 'What prizes would you like to see in the marketplace?',
      options: [
        { id: '1', text: 'Sports Equipment', votes: 45 },
        { id: '2', text: 'Movie Tickets', votes: 32 },
        { id: '3', text: 'School Merchandise', votes: 28 }
      ],
      startDate: '2024-03-20',
      endDate: '2024-03-27',
      isActive: true,
      totalVotes: 105
    },
    {
      id: '2',
      question: 'Best time for the end of term auction?',
      options: [
        { id: '1', text: 'Monday Lunch', votes: 25 },
        { id: '2', text: 'Wednesday After School', votes: 40 },
        { id: '3', text: 'Friday Assembly', votes: 35 }
      ],
      startDate: '2024-03-15',
      endDate: '2024-03-22',
      isActive: false,
      totalVotes: 100
    }
  ])

  const handleEditPoll = (pollId: string) => {
    console.log('Edit poll:', pollId)
  }

  const handleDeletePoll = (pollId: string) => {
    console.log('Delete poll:', pollId)
  }

  const handleToggleActive = (pollId: string) => {
    console.log('Toggle active status:', pollId)
  }

  const getVotePercentage = (votes: number, total: number) => {
    return `${Math.round((votes / total) * 100)}%`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Poll Management</CardTitle>
        <CardDescription>Create and manage student polls</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end">
          <Button>Create New Poll</Button>
        </div>
        <div className="space-y-6">
          {polls.map((poll) => (
            <Card key={poll.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{poll.question}</CardTitle>
                    <CardDescription>
                      {poll.startDate} - {poll.endDate}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant={poll.isActive ? "outline" : "secondary"}
                      size="sm"
                      onClick={() => handleToggleActive(poll.id)}
                    >
                      {poll.isActive ? 'Active' : 'Inactive'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditPoll(poll.id)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeletePoll(poll.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Option</TableHead>
                      <TableHead>Votes</TableHead>
                      <TableHead>Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {poll.options.map((option) => (
                      <TableRow key={option.id}>
                        <TableCell>{option.text}</TableCell>
                        <TableCell>{option.votes}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary"
                                style={{ width: getVotePercentage(option.votes, poll.totalVotes) }}
                              />
                            </div>
                            {getVotePercentage(option.votes, poll.totalVotes)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-2 text-sm text-muted-foreground">
                  Total Votes: {poll.totalVotes}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 