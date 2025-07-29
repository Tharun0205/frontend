"use client"

import type React from "react"


import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Alert, AlertDescription } from "../components/ui/alert"
import { Eye, EyeOff, User, Mail, Lock, Activity, BarChart3, Shield, Zap, Github, Twitter } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import Dashboard from "../components/dashboard"
import { ThemeToggle } from "../components/theme-toggle"


export default function Home() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [isLogin, setIsLogin] = useState(true)

  const { user, login, register, loading, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (isLogin) {
        await login(formData.email, formData.password)
      } else {
        await register(formData.name, formData.email, formData.password)
      }
    } catch (error) {
      // Error is handled in the auth hook
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleDemoLogin = async () => {
    try {
      await login("demo@stackpilot.com", "demo123")
    } catch (error) {
      // Error is handled in the auth hook
    }
  }

  // If user is authenticated, show dashboard
  if (user) {
    return <Dashboard />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm shadow-sm dark:bg-gray-900/80 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  StackPilot
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Enterprise Observability Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/stackpilot" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://twitter.com/stackpilot" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Monitor Your Stack
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Like Never Before
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Full-Stack Observability Platform with AI-powered insights, real-time monitoring, and comprehensive
            analytics for modern applications.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-blue-900/20">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Real-time Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Monitor your applications in real-time with comprehensive metrics, alerts, and performance insights.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-xl bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-800 dark:to-purple-900/20">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">AI-Powered Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Get intelligent recommendations, automated issue detection, and predictive analytics.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-xl bg-gradient-to-br from-white to-green-50/50 dark:from-gray-800 dark:to-green-900/20">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Enterprise Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Bank-level security with role-based access control, audit trails, and compliance features.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-xl bg-gradient-to-br from-white to-orange-50/50 dark:from-gray-800 dark:to-orange-900/20">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Full-Stack Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Monitor frontend, backend, database, and infrastructure from a single dashboard.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Auth Form */}
        <div className="max-w-md mx-auto">
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{isLogin ? "Welcome Back" : "Create Account"}</CardTitle>
              <CardDescription>
                {isLogin ? "Sign in to access your dashboard" : "Join StackPilot to start monitoring"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert className="mb-4 border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Tabs value={isLogin ? "login" : "register"} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login" onClick={() => setIsLogin(true)}>
                    Login
                  </TabsTrigger>
                  <TabsTrigger value="register" onClick={() => setIsLogin(false)}>
                    Register
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                        Or try demo
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={handleDemoLogin}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Demo Login"}
                  </Button>
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password (min. 6 characters)"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="pl-10 pr-10"
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                <p className="mb-2">Demo Credentials:</p>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 text-xs font-mono">
                  <p>Email: demo@stackpilot.com</p>
                  <p>Password: demo123</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 StackPilot. All rights reserved.</p>
          <p className="text-sm mt-2">Built with Next.js, React, and TypeScript</p>
        </footer>
      </div>
    </div>
  )
}
