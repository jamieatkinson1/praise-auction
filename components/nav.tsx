'use client'

import { signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"

export function Nav() {
  const { data: session } = useSession()

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="font-bold">Praise Auction</div>
        {session && (
          <div className="flex items-center gap-4">
            <span>Welcome, {session.user?.name}</span>
            <Button variant="outline" onClick={() => signOut()}>
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
} 