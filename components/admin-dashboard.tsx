'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentManagement } from './student-management'
import { PrizeManagement } from './prize-management'
import { MessageManagement } from './message-management'
import { CarouselManagement } from './carousel-management'
import { PollManagement } from './poll-management'
import { ReportGeneration } from './report-generation'
import { SettingsManagement } from './settings-management'

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
        <TabsList className="mb-4">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="prizes">Prizes</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="carousel">Carousel</TabsTrigger>
          <TabsTrigger value="polls">Polls</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <Card>
          <CardContent className="pt-6">
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
            <TabsContent value="settings">
              <SettingsManagement />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
} 