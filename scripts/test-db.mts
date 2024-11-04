import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import bcrypt from 'bcrypt'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import * as dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '../.env') })

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.$connect()
    console.log('Database connection successful')
    
    console.log('Clearing existing data...')
    // First check if tables exist
    try {
      await prisma.user.findFirst()
      // If we get here, tables exist, so we can delete data
      await prisma.bid.deleteMany()
      await prisma.prize.deleteMany()
      await prisma.user.deleteMany()
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log('Tables do not exist yet. Running migrations...')
        // You'll need to run migrations manually:
        console.log('Please run: npx prisma migrate dev --name init')
        process.exit(1)
      } else {
        throw error
      }
    }
    
    console.log('Creating admin user...')
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const adminUser = await prisma.user.create({
      data: {
        username: 'admin',
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin',
        email: 'admin@school.com'
      }
    })
    console.log('Admin user created:', adminUser)

    console.log('Creating student user...')
    const studentPassword = await bcrypt.hash('student123', 10)
    const studentUser = await prisma.user.create({
      data: {
        username: 'student',
        password: studentPassword,
        name: 'Test Student',
        role: 'student',
        email: 'student@school.com'
      }
    })
    console.log('Student user created:', studentUser)

    console.log('Creating prizes...')
    const movieTicket = await prisma.prize.create({
      data: {
        name: 'Movie Ticket',
        description: 'Free movie ticket for any showing',
        minPoints: 100,
        currentBid: 0,
        image: '/placeholder.jpg',
        category: 'Entertainment'
      }
    })

    const schoolHoodie = await prisma.prize.create({
      data: {
        name: 'School Hoodie',
        description: 'Custom school hoodie with your name',
        minPoints: 200,
        currentBid: 0,
        image: '/placeholder.jpg',
        category: 'Clothing'
      }
    })
    console.log('Prizes created:', [movieTicket, schoolHoodie])

    console.log('Creating test bid...')
    const bid = await prisma.bid.create({
      data: {
        userId: studentUser.id,
        prizeId: movieTicket.id,
        amount: 120,
        status: 'active',
        createdAt: new Date()
      }
    })
    console.log('Test bid created:', bid)

    // Get final counts
    const [userCount, prizeCount, bidCount] = await Promise.all([
      prisma.user.count(),
      prisma.prize.count(),
      prisma.bid.count()
    ])
    
    console.log('Final counts:')
    console.log(`Users: ${userCount}`)
    console.log(`Prizes: ${prizeCount}`)
    console.log(`Bids: ${bidCount}`)
    
  } catch (error) {
    console.error('Database operation failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
}) 