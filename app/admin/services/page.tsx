"use client"

import { useEffect, useState } from "react"
import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/lib/api-config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface Service {
    _id: string
    title: string
    description: string
    startingPrice: number
    isActive: boolean
    slug: string
}

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [currentService, setCurrentService] = useState<Partial<Service>>({})
    const [isEditing, setIsEditing] = useState(false)
    const [saving, setSaving] = useState(false)

    const fetchServices = async () => {
        try {
            const data: any = await apiClient.get(API_ENDPOINTS.SERVICES.ADMIN_LIST)
            setServices(data.data || [])
        } catch (error) {
            toast.error("Failed to fetch services")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchServices()
    }, [])

    const handleOpenAdd = () => {
        setCurrentService({ isActive: true })
        setIsEditing(false)
        setIsDialogOpen(true)
    }

    const handleOpenEdit = (service: Service) => {
        setCurrentService(service)
        setIsEditing(true)
        setIsDialogOpen(true)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this service?")) return

        try {
            await apiClient.delete(API_ENDPOINTS.SERVICES.DELETE(id))
            toast.success("Service deleted successfully")
            setServices(services.filter(s => s._id !== id))
        } catch (error) {
            toast.error("Failed to delete service")
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            if (isEditing && currentService._id) {
                await apiClient.put(API_ENDPOINTS.SERVICES.UPDATE(currentService._id), currentService)
                toast.success("Service updated successfully")
            } else {
                await apiClient.post(API_ENDPOINTS.SERVICES.CREATE, currentService)
                toast.success("Service created successfully")
            }
            setIsDialogOpen(false)
            fetchServices()
        } catch (error: any) {
            toast.error(error.message || "Failed to save service")
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="p-8"><Loader2 className="animate-spin" /></div>

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Services</h1>
                <Button onClick={handleOpenAdd}>
                    <Plus className="mr-2 h-4 w-4" /> Add Service
                </Button>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                    No services found. Add one to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            services.map((service) => (
                                <TableRow key={service._id}>
                                    <TableCell className="font-medium">{service.title}</TableCell>
                                    <TableCell>₹{service.startingPrice}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs ${service.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                                            {service.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(service)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(service._id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{isEditing ? 'Edit Service' : 'Add New Service'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={currentService.title || ''}
                                onChange={e => setCurrentService({ ...currentService, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Starting Price (₹)</Label>
                            <Input
                                id="price"
                                type="number"
                                value={currentService.startingPrice || ''}
                                onChange={e => setCurrentService({ ...currentService, startingPrice: Number(e.target.value) })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Short Description</Label>
                            <Textarea
                                id="description"
                                value={currentService.description || ''}
                                onChange={e => setCurrentService({ ...currentService, description: e.target.value })}
                                required
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="active"
                                checked={currentService.isActive}
                                onCheckedChange={checked => setCurrentService({ ...currentService, isActive: checked })}
                            />
                            <Label htmlFor="active">Active</Label>
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={saving}>
                                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Save Service
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
