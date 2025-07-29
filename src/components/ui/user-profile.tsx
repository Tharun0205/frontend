"use client"

import { ChevronDown, HelpCircle, LogOut, Settings, Shield, User } from "lucide-react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../avatar"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "../popover"
import { Separator } from "../separator"

export function UserProfile() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="gap-2 px-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32&text=JD" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-slate-500">Admin</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="end">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg?height=48&width=48&text=JD" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">John Doe</CardTitle>
                <CardDescription>john.doe@company.com</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start gap-3 px-4 py-3">
                <User className="h-4 w-4" />
                Profile Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 px-4 py-3">
                <Settings className="h-4 w-4" />
                Preferences
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 px-4 py-3">
                <Shield className="h-4 w-4" />
                Security
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 px-4 py-3">
                <HelpCircle className="h-4 w-4" />
                Help & Support
              </Button>
              <Separator className="my-2" />
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
