'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [inputColor, setInputColor] = useState(color)

  useEffect(() => {
    setInputColor(color)
  }, [color])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputColor(e.target.value)
    onChange(e.target.value)
  }

  return (
    <div className="flex items-center space-x-2">
      <div
        className="w-10 h-10 rounded-full border border-gray-300"
        style={{ backgroundColor: inputColor }}
      />
      <Input
        type="color"
        value={inputColor}
        onChange={handleChange}
        className="w-14 h-10 p-0 border-0"
      />
      <Input
        type="text"
        value={inputColor}
        onChange={handleChange}
        className="w-28"
      />
    </div>
  )
}