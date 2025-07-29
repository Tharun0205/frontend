import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "../components/theme-provider"
import { AuthProvider } from "../hooks/useAuth"
import "./global.css"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StackPilot - Full-Stack Observability Platform",
  description:
    "Monitor, analyze, and optimize your applications with AI-powered insights, real-time monitoring, and comprehensive analytics.",
  keywords: ["observability", "monitoring", "analytics", "dashboard", "metrics", "performance"],
  authors: [{ name: "StackPilot Team" }],
  creator: "StackPilot",
  publisher: "StackPilot",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stackpilot.dev",
    title: "StackPilot - Full-Stack Observability Platform",
    description: "Monitor, analyze, and optimize your applications with AI-powered insights",
    siteName: "StackPilot",
  },
  twitter: {
    card: "summary_large_image",
    title: "StackPilot - Full-Stack Observability Platform",
    description: "Monitor, analyze, and optimize your applications with AI-powered insights",
    creator: "@stackpilot",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "var(--background)",
                  color: "var(--foreground)",
                  border: "1px solid var(--border)",
                },
                success: {
                  iconTheme: {
                    primary: "var(--primary)",
                    secondary: "var(--primary-foreground)",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "var(--destructive)",
                    secondary: "var(--destructive-foreground)",
                  },
                },
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
