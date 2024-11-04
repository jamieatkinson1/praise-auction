'use client'

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentManagement } from './student-management'
import { PrizeManagement } from './prize-management'
import { MessageManagement } from './message-management'
import { CarouselManagement } from './carousel-management'
import { PollManagement } from './poll-management'
import { ReportGeneration } from './report-generation'

export function AdminDashboardComponent() {
  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
          <CardDescription>Manage the School Praise Auction system</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="students">
        <TabsList>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="prizes">Prizes</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="carousel">Carousel</TabsTrigger>
          <TabsTrigger value="polls">Polls</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="students">
          <StudentManagement />
        </TabsContent>
        <TabsContent value="prizes">
          <PrizeManagement />
        </TabsContent>
        <TabsContent value="messages">
          <MessageManagement />
        </TabsContent>
        <TabsContent value="carousel">
          <CarouselManagement />
        </TabsContent>
        <TabsContent value="polls">
          <PollManagement />
        </TabsContent>
        <TabsContent value="reports">
          <ReportGeneration />
        </TabsContent>
      </Tabs>
    </div>
  )
}