    "use client"

    import axios from "axios"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { toast } from "react-hot-toast"

    interface User {
    id: string
    name: string
    email: string
    role: string
    avatar?: string
    preferences?: {
        theme: string
        notifications: {
        email: boolean
        push: boolean
        sms: boolean
        }
        dashboard: {
        defaultTimeRange: string
        refreshInterval: number
        }
    }
    createdAt: string
    lastLogin?: string
    }

    interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<void>
    register: (name: string, email: string, password: string) => Promise<void>
    logout: () => void
    updateProfile: (data: Partial<User>) => Promise<void>
    loading: boolean
    error: string | null
    isAuthenticated: boolean
    }

    const AuthContext = createContext<AuthContextType | undefined>(undefined)

    const API_URL ="https://backend-fz9m.onrender.com"

    export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Configure axios defaults
    axios.defaults.baseURL = API_URL

    // Add token to requests if available
    useEffect(() => {
        const token = localStorage.getItem("stackpilot_token")
        if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        getCurrentUser()
        } else {
        setLoading(false)
        }
    }, [])

    const getCurrentUser = async () => {
        try {
        const response = await axios.get("/api/auth/me")
        if (response.data.success) {
            setUser(response.data.user)
        }
        } catch (error: any) {
        console.error("Get current user error:", error)
        // Token might be invalid, remove it
        localStorage.removeItem("stackpilot_token")
        delete axios.defaults.headers.common["Authorization"]
        } finally {
        setLoading(false)
        }
    }

    const login = async (email: string, password: string) => {
        setLoading(true)
        setError(null)

        try {
        const response = await axios.post("/api/auth/login", { email, password })

        if (response.data.success) {
            const { token, user } = response.data

            // Store token
            localStorage.setItem("stackpilot_token", token)
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

            // Set user
            setUser(user)
            toast.success("Login successful!")
        }
        } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Login failed"
        setError(errorMessage)
        toast.error(errorMessage)
        throw new Error(errorMessage)
        } finally {
        setLoading(false)
        }
    }

    const register = async (name: string, email: string, password: string) => {
        setLoading(true)
        setError(null)

        try {
        const response = await axios.post("/api/auth/register", { name, email, password })

        if (response.data.success) {
            const { token, user } = response.data

            // Store token
            localStorage.setItem("stackpilot_token", token)
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

            // Set user
            setUser(user)
            toast.success("Account created successfully!")
        }
        } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Registration failed"
        setError(errorMessage)
        toast.error(errorMessage)
        throw new Error(errorMessage)
        } finally {
        setLoading(false)
        }
    }

    const updateProfile = async (data: Partial<User>) => {
        try {
        const response = await axios.put("/api/auth/profile", data)

        if (response.data.success) {
            setUser(response.data.user)
            toast.success("Profile updated successfully!")
        }
        } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Profile update failed"
        toast.error(errorMessage)
        throw new Error(errorMessage)
        }
    }

    const logout = () => {
        localStorage.removeItem("stackpilot_token")
        delete axios.defaults.headers.common["Authorization"]
        setUser(null)
        setError(null)
        toast.success("Logged out successfully")
    }

    return (
        <AuthContext.Provider
        value={{
            user,
            login,
            register,
            logout,
            updateProfile,
            loading,
            error,
            isAuthenticated: !!user,
        }}
        >
        {children}
        </AuthContext.Provider>
    )
    }

    export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
    }
