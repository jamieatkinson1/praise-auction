import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '../.env') })

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.$connect()
    console.log('Database connection successful')
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('123456', 10)
    const user = await prisma.user.create({
      data: {
        username: 'jamie',
        password: hashedPassword,
        name: 'Jamie Smith',
        role: 'admin',
        email: 'jamie@school.com'
      }
    })
    console.log('Created user:', user)

    // Create test prizes
    const prizes = await Promise.all([
      prisma.prize.create({
        data: {
          name: 'Movie Ticket',
          description: 'Free movie ticket for any showing',
          minPoints: 100,
          currentBid: 0,
          image: '/placeholder.jpg',
          category: 'Entertainment'
        }
      }),
      prisma.prize.create({
        data: {
          name: 'School Hoodie',
          description: 'Custom school hoodie with your name',
          minPoints: 200,
          currentBid: 0,
          image: '/placeholder.jpg',
          category: 'Clothing'
        }
      })
    ])
    
    console.log('Created prizes:', prizes)

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

export {} 