'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ColorPicker from './color-picker'

export function SettingsManagement() {
  const [logo, setLogo] = useState<File | null>(null)
  const [primaryColor, setPrimaryColor] = useState('#000000')
  const [secondaryColor, setSecondaryColor] = useState('#ffffff')
  const [schoolName, setSchoolName] = useState('')

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0])
    }
  }

  const handleSaveSettings = () => {
    // TODO: Implement API call to save settings
    console.log('Saving settings:', { logo, primaryColor, secondaryColor, schoolName })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings Management</CardTitle>
        <CardDescription>Customize the app&apos;s branding and appearance</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="branding">
          <TabsList>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>
          <TabsContent value="branding">
            <div className="space-y-4">
              <div>
                <Label htmlFor="logo">School Logo</Label>
                <Input id="logo" type="file" accept="image/*" onChange={handleLogoChange} />
                {logo && <p className="mt-2 text-sm text-gray-500">Selected file: {logo.name}</p>}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="colors">
            <div className="space-y-4">
              <div>
                <Label>Primary Color</Label>
                <ColorPicker color={primaryColor} onChange={setPrimaryColor} />
              </div>
              <div>
                <Label>Secondary Color</Label>
                <ColorPicker color={secondaryColor} onChange={setSecondaryColor} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="general">
            <div className="space-y-4">
              <div>
                <Label htmlFor="schoolName">School Name</Label>
                <Input
                  id="schoolName"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="Enter school name"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <Button onClick={handleSaveSettings} className="mt-6">Save Settings</Button>
      </CardContent>
    </Card>
  )
}