'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"

interface PointsTransaction {
  id: string
  date: string
  description: string
  amount: number
  type: 'credit' | 'debit'
}

interface StudentDetails {
  id: string
  firstName: string
  lastName: string
  email: string
  yearGroup: string
  form: string
  totalPoints: number
}

export function StudentProfile() {
  const [student, setStudent] = useState<StudentDetails>({
    id: 'ST123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@school.com',
    yearGroup: '10',
    form: '10A',
    totalPoints: 1250
  })

  const [pointsHistory] = useState<PointsTransaction[]>([
    {
      id: '1',
      date: '2024-03-20',
      description: 'Teacher Award - Excellence in Math',
      amount: 50,
      type: 'credit'
    },
    {
      id: '2',
      date: '2024-03-19',
      description: 'Bid on Movie Ticket',
      amount: 120,
      type: 'debit'
    }
  ])

  const [isEditing, setIsEditing] = useState(false)
  const [editedStudent, setEditedStudent] = useState(student)

  const handleSave = () => {
    setStudent(editedStudent)
    setIsEditing(false)
    // TODO: API call to update student details
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your account details and preferences</CardDescription>
            </div>
            <Button 
              variant="outline"
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={editedStudent.firstName}
                onChange={(e) => setEditedStudent({...editedStudent, firstName: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={editedStudent.lastName}
                onChange={(e) => setEditedStudent({...editedStudent, lastName: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editedStudent.email}
                onChange={(e) => setEditedStudent({...editedStudent, email: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="form">Form</Label>
              <Input
                id="form"
                value={editedStudent.form}
                disabled={true}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Points History</CardTitle>
          <CardDescription>Track your points earnings and spending</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pointsHistory.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      transaction.type === 'credit' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type === 'credit' ? 'Earned' : 'Spent'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                      {transaction.type === 'credit' ? '+' : '-'}{transaction.amount}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 