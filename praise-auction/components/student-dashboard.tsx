'use client'

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PrizeMarketplace } from './prize-marketplace'
import { StudentProfile } from './student-profile'
import { StudentBids } from './student-bids'
import { StudentAnnouncements } from './student-announcements'

export function StudentDashboardComponent() {
  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Student Dashboard</CardTitle>
              <CardDescription>Welcome back, [Student Name]</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">1,250</div>
              <div className="text-sm text-muted-foreground">Available Points</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="marketplace">
        <TabsList>
          <TabsTrigger value="marketplace">Prize Marketplace</TabsTrigger>
          <TabsTrigger value="bids">My Bids</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="marketplace">
          <PrizeMarketplace />
        </TabsContent>
        <TabsContent value="bids">
          <StudentBids />
        </TabsContent>
        <TabsContent value="announcements">
          <StudentAnnouncements />
        </TabsContent>
        <TabsContent value="profile">
          <StudentProfile />
        </TabsContent>
      </Tabs>
    </div>
  )
} 