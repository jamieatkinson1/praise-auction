import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET all prizes
export async function GET() {
  try {
    const prizes = await prisma.prize.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    return NextResponse.json(prizes)
  } catch (error) {
    console.error('Failed to fetch prizes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch prizes' },
      { status: 500 }
    )
  }
}

// POST new prize
export async function POST(request: Request) {
  try {
    const json = await request.json()
    const prize = await prisma.prize.create({
      data: {
        name: json.name,
        description: json.description,
        minPoints: parseInt(json.minPoints),
        currentBid: 0,
        image: json.image || '/placeholder.png',
        category: json.category
      }
    })
    return NextResponse.json(prize)
  } catch (error) {
    console.error('Failed to create prize:', error)
    return NextResponse.json(
      { error: 'Failed to create prize' },
      { status: 500 }
    )
  }
} 