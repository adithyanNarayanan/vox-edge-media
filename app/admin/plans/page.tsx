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
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface Plan {
    _id: string
    name: string
    description: string
    price: number
    billingCycle: string
    currency: string
    features: { text: string; included: boolean }[]
    isActive: boolean
    isPopular: boolean
    buttonText?: string
    order?: number
}

export default function PlansPage() {
    const [plans, setPlans] = useState<Plan[]>([])
    const [loading, setLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [currentPlan, setCurrentPlan] = useState<Partial<Plan>>({})
    const [featureString, setFeatureString] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [saving, setSaving] = useState(false)

    const fetchPlans = async () => {
        try {
            const data: any = await apiClient.get(API_ENDPOINTS.PLANS.ADMIN_LIST)
            setPlans(data.data || [])
        } catch (error) {
            toast.error("Failed to fetch plans")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPlans()
    }, [])

    const handleOpenAdd = () => {
        setCurrentPlan({ isActive: true, currency: 'INR', billingCycle: 'hourly', features: [] })
        setFeatureString("")
        setIsEditing(false)
        setIsDialogOpen(true)
    }

    const handleOpenEdit = (plan: Plan) => {
        setCurrentPlan(plan)
        setFeatureString(plan.features.map(f => f.text).join('\n'))
        setIsEditing(true)
        setIsDialogOpen(true)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this plan?")) return

        try {
            await apiClient.delete(API_ENDPOINTS.PLANS.DELETE(id))
            toast.success("Plan deleted successfully")
            setPlans(plans.filter(p => p._id !== id))
        } catch (error) {
            toast.error("Failed to delete plan")
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        // Parse features from string
        const features = featureString.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .map(text => ({ text, included: true }))

        const payload = {
            ...currentPlan,
            features
        }

        try {
            if (isEditing && currentPlan._id) {
                await apiClient.put(API_ENDPOINTS.PLANS.UPDATE(currentPlan._id), payload)
                toast.success("Plan updated successfully")
            } else {
                await apiClient.post(API_ENDPOINTS.PLANS.CREATE, payload)
                toast.success("Plan created successfully")
            }
            setIsDialogOpen(false)
            fetchPlans()
        } catch (error: any) {
            toast.error(error.message || "Failed to save plan")
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="p-8"><Loader2 className="animate-spin" /></div>

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Subscription Plans</h1>
                <Button onClick={handleOpenAdd}>
                    <Plus className="mr-2 h-4 w-4" /> Add Plan
                </Button>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Billing</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {plans.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No plans found. Add one to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            plans.map((plan) => (
                                <TableRow key={plan._id}>
                                    <TableCell className="font-medium">
                                        {plan.name}
                                        {plan.isPopular && <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-1 rounded">Popular</span>}
                                    </TableCell>
                                    <TableCell>₹{plan.price}</TableCell>
                                    <TableCell className="capitalize">{plan.billingCycle}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs ${plan.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                                            {plan.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(plan)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(plan._id)}>
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
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? 'Edit Plan' : 'Add New Plan'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Plan Name</Label>
                                <Input
                                    id="name"
                                    value={currentPlan.name || ''}
                                    onChange={e => setCurrentPlan({ ...currentPlan, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Price (₹)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={currentPlan.price || ''}
                                    onChange={e => setCurrentPlan({ ...currentPlan, price: Number(e.target.value) })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="billing">Billing Cycle</Label>
                            <Select
                                value={currentPlan.billingCycle || 'hourly'}
                                onValueChange={val => setCurrentPlan({ ...currentPlan, billingCycle: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select billing cycle" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="hourly">Hourly</SelectItem>
                                    <SelectItem value="daily">Daily</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="yearly">Yearly</SelectItem>
                                    <SelectItem value="project">Per Project</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Short Description</Label>
                            <Input
                                id="description"
                                value={currentPlan.description || ''}
                                onChange={e => setCurrentPlan({ ...currentPlan, description: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="features">Features (One per line)</Label>
                            <Textarea
                                id="features"
                                value={featureString}
                                onChange={e => setFeatureString(e.target.value)}
                                rows={6}
                                placeholder="4K Video Recording&#10;Professional Audio&#10;Green Screen"
                            />
                        </div>

                        <div className="flex space-x-6 pt-2">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="active"
                                    checked={currentPlan.isActive}
                                    onCheckedChange={checked => setCurrentPlan({ ...currentPlan, isActive: checked })}
                                />
                                <Label htmlFor="active">Active</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="popular"
                                    checked={currentPlan.isPopular}
                                    onCheckedChange={checked => setCurrentPlan({ ...currentPlan, isPopular: checked })}
                                />
                                <Label htmlFor="popular">Mark as Popular</Label>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={saving}>
                                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Save Plan
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
