import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { StudentDashboardComponent } from '../components/student-dashboard'
import { AdminDashboardComponent } from '../components/admin-dashboard'
import { authOptions } from "./api/auth/[...nextauth]/auth"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  console.log('Full session data:', JSON.stringify(session, null, 2))

  const userRole = session?.user?.role
  const firstName = session?.user?.name

  if (userRole === 'admin') {
    return (
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome, {firstName}</h1>
        <AdminDashboardComponent />
      </main>
    )
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {firstName}</h1>
      <StudentDashboardComponent />
    </main>
  )
} 