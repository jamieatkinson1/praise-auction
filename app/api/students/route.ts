import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    console.log('Fetching students')
    const students = await prisma.user.findMany({
      where: {
        role: 'student'
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        role: true
      }
    })
    
    console.log('Found students:', students.length)
    return NextResponse.json(students)
  } catch (error) {
    console.error('Failed to fetch students:', error)
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    )
  }
} 