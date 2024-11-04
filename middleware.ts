import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // Admin routes
      if (req.nextUrl.pathname.startsWith('/admin')) {
        return token?.role === 'admin'
      }
      // Student routes
      if (req.nextUrl.pathname.startsWith('/student')) {
        return !!token
      }
      return true
    }
  }
})

export const config = {
  matcher: ['/admin/:path*', '/student/:path*', '/']
} 