import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

interface StudentCSVRow {
  username: string
  firstName: string
  lastName: string
  name: string
  email: string
}

export async function POST(request: Request) {
  try {
    console.log('Received upload request')
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      console.log('No file in request')
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    console.log('Processing file:', file.name)
    const fileContent = await file.text()
    console.log('File content:', fileContent)

    // Split the content into lines and parse manually
    const lines = fileContent.split('\n')
    const headers = lines[0].split(',').map(h => h.trim())
    console.log('Headers:', headers)

    const rows = lines.slice(1).map(line => {
      if (!line.trim()) return null // Skip empty lines
      const values = line.split(',')
      const row: any = {}
      headers.forEach((header, index) => {
        row[header] = values[index]?.trim()
      })
      return row
    }).filter(row => row !== null) // Remove empty rows

    console.log('Parsed rows:', rows)

    const createdStudents = []
    const errors = []

    for (const row of rows) {
      try {
        if (!row.username || !row.firstName || !row.lastName || !row.name || !row.email) {
          console.log('Invalid row:', row)
          continue
        }

        console.log('Processing row:', row)

        // Log the data we're trying to create
        const userData = {
          username: row.username,
          password: await bcrypt.hash(row.username, 10),
          firstName: row.firstName,
          lastName: row.lastName,
          name: row.name,
          email: row.email,
          role: 'student'
        }
        console.log('Creating user with data:', userData)

        const student = await prisma.user.create({
          data: userData
        })
        console.log('Student created:', student)

        createdStudents.push(student)
      } catch (error) {
        console.error('Error creating student:', error)
        errors.push({
          row,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    console.log('Upload complete. Created:', createdStudents.length, 'Errors:', errors.length)

    return NextResponse.json({
      success: true,
      created: createdStudents.length,
      errors: errors.length > 0 ? errors : undefined
    })

  } catch (error) {
    console.error('CSV upload error:', error)
    return NextResponse.json(
      { error: 'Failed to process CSV file' },
      { status: 500 }
    )
  }
} 