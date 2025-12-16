"use client"

import { useEffect, useState } from "react"
import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/lib/api-config"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Trash2, Loader2, Shield, User as UserIcon } from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"

interface User {
    _id: string
    displayName: string
    email: string
    phoneNumber?: string
    role: 'user' | 'admin'
    isActive: boolean
    lastLogin?: string
    createdAt: string
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    const fetchUsers = async () => {
        try {
            const data: any = await apiClient.get(API_ENDPOINTS.ADMIN.USERS)
            setUsers(data.users || [])
        } catch (error) {
            toast.error("Failed to fetch users")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
        try {
            const previousUsers = [...users]
            setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u))

            await apiClient.put(API_ENDPOINTS.ADMIN.UPDATE_USER(userId), { role: newRole })
            toast.success(`User role updated to ${newRole}`)
        } catch (error) {
            toast.error("Failed to update user role")
            fetchUsers() // Revert on error
        }
    }

    const handleActiveToggle = async (userId: string, currentStatus: boolean) => {
        try {
            const previousUsers = [...users]
            setUsers(users.map(u => u._id === userId ? { ...u, isActive: !currentStatus } : u))

            await apiClient.put(API_ENDPOINTS.ADMIN.UPDATE_USER(userId), { isActive: !currentStatus })
            toast.success(`User ${!currentStatus ? 'activated' : 'deactivated'}`)
        } catch (error) {
            toast.error("Failed to update user status")
            fetchUsers() // Revert on error
        }
    }

    const handleDelete = async (user: User) => {
        if (!confirm(`Are you sure you want to delete ${user.displayName}? This action cannot be undone.`)) return

        try {
            await apiClient.delete(API_ENDPOINTS.ADMIN.DELETE_USER(user._id))
            toast.success("User deleted successfully")
            setUsers(users.filter(u => u._id !== user._id))
        } catch (error) {
            toast.error("Failed to delete user")
        }
    }

    if (loading) return <div className="p-8"><Loader2 className="animate-spin" /></div>

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">User Management</h1>
                <div className="text-muted-foreground">
                    Total Users: {users.length}
                </div>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-primary/10 p-2 rounded-full">
                                                {user.role === 'admin' ? <Shield className="h-4 w-4 text-primary" /> : <UserIcon className="h-4 w-4 text-muted-foreground" />}
                                            </div>
                                            <div>
                                                <div className="font-medium">{user.displayName}</div>
                                                <div className="text-xs text-muted-foreground">Last login: {user.lastLogin ? format(new Date(user.lastLogin), 'MMM d, yyyy') : 'Never'}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">{user.email}</div>
                                        {user.phoneNumber && <div className="text-xs text-muted-foreground">{user.phoneNumber}</div>}
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            value={user.role}
                                            onValueChange={(val: 'user' | 'admin') => handleRoleChange(user._id, val)}
                                        >
                                            <SelectTrigger className="w-[100px] h-8">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="user">User</SelectItem>
                                                <SelectItem value="admin">Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {format(new Date(user.createdAt), 'MMM d, yyyy')}
                                    </TableCell>
                                    <TableCell>
                                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${user.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                                            {user.isActive ? 'Active' : 'Blocked'}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        {user.role !== 'admin' && (
                                            <Button
                                                variant={user.isActive ? "destructive" : "default"}
                                                size="sm"
                                                className="h-8"
                                                onClick={() => handleActiveToggle(user._id, user.isActive)}
                                            >
                                                {user.isActive ? 'Block' : 'Unblock'}
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                            onClick={() => handleDelete(user)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
