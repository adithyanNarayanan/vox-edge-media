"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { loginUser } from "@/lib/redux/slices/authSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function AdminLogin() {
    const [email, setEmail] = useState("admin123@gmail.com") // Pre-fill for convenience as requested
    const [password, setPassword] = useState("123456")
    const [localError, setLocalError] = useState("")

    const dispatch = useAppDispatch()
    const router = useRouter()
    const { user, isAuthenticated, loading, error } = useAppSelector((state) => state.auth)

    // Redirect if already logged in as admin
    useEffect(() => {
        if (isAuthenticated && user?.role === 'admin') {
            router.push("/admin")
        }
    }, [isAuthenticated, user, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLocalError("")

        try {
            const resultAction = await dispatch(loginUser({ email, password }))
            if (loginUser.fulfilled.match(resultAction)) {
                const loggedInUser = resultAction.payload
                if (loggedInUser.role !== 'admin') {
                    setLocalError("Access denied: You do not have admin privileges.")
                    // Optionally logout immediately if you don't want non-admins to stay logged in
                } else {
                    router.push("/admin")
                }
            }
        } catch (err) {
            console.error("Login failed", err)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
                    <CardDescription className="text-center">
                        Enter your credentials to access the dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {(error || localError) && (
                            <Alert variant="destructive">
                                <AlertDescription>{localError || error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>

                        <div className="mt-4 text-center text-sm text-muted-foreground">
                            <Link href="/" className="hover:underline">Back to Website</Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
