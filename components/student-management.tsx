'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

interface Student {
  id: string
  username: string
  name: string
  email: string
  role: string
}

export function StudentManagement() {
  const [students, setStudents] = useState<Student[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  // Function to download sample CSV
  const downloadSampleCSV = () => {
    const sampleContent = 'username,name,email\njohn.doe,John Doe,john.doe@school.com\njane.smith,Jane Smith,jane.smith@school.com'
    const blob = new Blob([sampleContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sample-students.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      console.log('No file selected')
      return
    }

    console.log('File selected:', file.name)
    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      console.log('Sending request to /api/students/upload')
      const response = await fetch('/api/students/upload', {
        method: 'POST',
        body: formData,
      })

      console.log('Response received:', response.status)
      const result = await response.json()
      console.log('Result:', result)

      if (result.success) {
        toast({
          title: 'Upload Successful',
          description: `Created ${result.created} new students`,
        })
        fetchStudents()
      } else {
        throw new Error(result.error || 'Failed to upload CSV')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: 'Upload Failed',
        description: error instanceof Error ? error.message : 'Failed to upload CSV',
        variant: 'destructive',
      })
    } finally {
      setIsUploading(false)
      if (event.target) {
        event.target.value = ''
      }
    }
  }

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students')
      if (!response.ok) throw new Error('Failed to fetch students')
      const data = await response.json()
      setStudents(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch students',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Management</CardTitle>
        <CardDescription>Upload and manage student accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-4">
            <Input
              id="csvFile"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
            <Button disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Upload CSV'}
            </Button>
          </div>
          <Alert>
            <AlertDescription>
              CSV should include columns: username, name, email. Students will use their username as their initial password.
            </AlertDescription>
          </Alert>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.username}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {students.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 