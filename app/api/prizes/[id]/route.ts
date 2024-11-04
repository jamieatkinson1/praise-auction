import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET single prize
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const prize = await prisma.prize.findUnique({
      where: {
        id: params.id
      }
    })

    if (!prize) {
      return NextResponse.json(
        { error: 'Prize not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(prize)
  } catch (error) {
    console.error('Failed to fetch prize:', error)
    return NextResponse.json(
      { error: 'Failed to fetch prize' },
      { status: 500 }
    )
  }
}

// PUT update prize
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const json = await request.json()
    const prize = await prisma.prize.update({
      where: {
        id: params.id
      },
      data: {
        name: json.name,
        description: json.description,
        minPoints: parseInt(json.minPoints),
        image: json.image,
        category: json.category
      }
    })
    return NextResponse.json(prize)
  } catch (error) {
    console.error('Failed to update prize:', error)
    return NextResponse.json(
      { error: 'Failed to update prize' },
      { status: 500 }
    )
  }
}

// DELETE prize
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.prize.delete({
      where: {
        id: params.id
      }
    })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Failed to delete prize:', error)
    return NextResponse.json(
      { error: 'Failed to delete prize' },
      { status: 500 }
    )
  }
} 