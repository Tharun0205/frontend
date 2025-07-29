    import { type ClassValue, clsx } from "clsx"
    import { twMerge } from "tailwind-merge"

    export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
    }

    export function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    }

    export function formatNumber(num: number) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
    }

    export function formatPercentage(value: number, decimals = 1) {
    return `${value.toFixed(decimals)}%`
    }

    export function formatDuration(ms: number) {
    if (ms < 1000) {
        return `${ms}ms`
    }
    if (ms < 60000) {
        return `${(ms / 1000).toFixed(1)}s`
    }
    if (ms < 3600000) {
        return `${(ms / 60000).toFixed(1)}m`
    }
    return `${(ms / 3600000).toFixed(1)}h`
    }

    export function getHealthColor(score: number) {
    if (score >= 85) return "text-emerald-600 dark:text-emerald-400"
    if (score >= 70) return "text-amber-600 dark:text-amber-400"
    return "text-red-600 dark:text-red-400"
    }

    export function getHealthBadgeVariant(score: number) {
    if (score >= 85) return "default"
    if (score >= 70) return "secondary"
    return "destructive"
    }

    export function getStatusColor(status: string) {
    switch (status) {
        case "healthy":
        return "text-emerald-600 dark:text-emerald-400"
        case "warning":
        return "text-amber-600 dark:text-amber-400"
        case "critical":
        return "text-red-600 dark:text-red-400"
        default:
        return "text-gray-600 dark:text-gray-400"
    }
    }

    export function getAlertColor(severity: string) {
    switch (severity) {
        case "critical":
        return "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-800"
        case "warning":
        return "text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950 dark:border-amber-800"
        case "info":
        return "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950 dark:border-blue-800"
        default:
        return "text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-950 dark:border-gray-800"
    }
    }

    export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), wait)
    }
    }

    export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
    let inThrottle: boolean
    return (...args: Parameters<T>) => {
        if (!inThrottle) {
        func(...args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
        }
    }
    }
