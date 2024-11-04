'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"

interface Report {
  id: string
  name: string
  description: string
  lastGenerated: string | null
  frequency: 'daily' | 'weekly' | 'monthly' | 'on-demand'
  status: 'ready' | 'generating' | 'failed'
}

export function ReportGeneration() {
  const [reports] = useState<Report[]>([
    {
      id: '1',
      name: 'Points Distribution',
      description: 'Overview of points distribution across year groups',
      lastGenerated: '2024-03-20',
      frequency: 'weekly',
      status: 'ready'
    },
    {
      id: '2',
      name: 'Prize Auction History',
      description: 'History of all prize auctions and winners',
      lastGenerated: '2024-03-19',
      frequency: 'monthly',
      status: 'ready'
    },
    {
      id: '3',
      name: 'Student Engagement',
      description: 'Analysis of student participation in auctions',
      lastGenerated: null,
      frequency: 'on-demand',
      status: 'ready'
    }
  ])

  const handleGenerateReport = (reportId: string) => {
    console.log('Generate report:', reportId)
  }

  const handleDownloadReport = (reportId: string) => {
    console.log('Download report:', reportId)
  }

  const getStatusBadgeColor = (status: Report['status']) => {
    const colors = {
      ready: 'bg-green-100 text-green-800',
      generating: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    }
    return colors[status]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Generation</CardTitle>
        <CardDescription>Generate and download system reports</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Last Generated</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.name}</TableCell>
                <TableCell>{report.description}</TableCell>
                <TableCell>{report.lastGenerated || 'Never'}</TableCell>
                <TableCell className="capitalize">{report.frequency}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeColor(report.status)}`}>
                    {report.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleGenerateReport(report.id)}
                      disabled={report.status === 'generating'}
                    >
                      Generate
                    </Button>
                    {report.lastGenerated && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadReport(report.id)}
                      >
                        Download
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 