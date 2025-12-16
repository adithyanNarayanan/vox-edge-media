"use client"

import { useEffect, useState } from "react"
import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/lib/api-config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
    DialogDescription
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, Loader2, Info } from "lucide-react"
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Content {
    _id: string
    key: string
    title: string
    content: string
    metaDescription: string
}

export default function StudioContentPage() {
    const [contents, setContents] = useState<Content[]>([])
    const [loading, setLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [currentContent, setCurrentContent] = useState<Partial<Content>>({})
    const [isEditing, setIsEditing] = useState(false)
    const [saving, setSaving] = useState(false)

    const fetchContent = async () => {
        try {
            const data: any = await apiClient.get(API_ENDPOINTS.CONTENT.ADMIN_LIST)
            setContents(data.data || [])
        } catch (error) {
            toast.error("Failed to fetch content")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchContent()
    }, [])

    const handleOpenAdd = () => {
        setCurrentContent({})
        setIsEditing(false)
        setIsDialogOpen(true)
    }

    const handleOpenEdit = (content: Content) => {
        setCurrentContent(content)
        setIsEditing(true)
        setIsDialogOpen(true)
    }

    const handleDelete = async (key: string) => {
        if (!confirm(`Are you sure you want to delete content with key "${key}"?`)) return

        try {
            await apiClient.delete(API_ENDPOINTS.CONTENT.DELETE(key))
            toast.success("Content deleted successfully")
            setContents(contents.filter(c => c.key !== key))
        } catch (error) {
            toast.error("Failed to delete content")
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            // Upsert (create or update based on key) is handled by POST /api/content
            await apiClient.post(API_ENDPOINTS.CONTENT.UPDATE, currentContent)
            toast.success("Content saved successfully")
            setIsDialogOpen(false)
            fetchContent()
        } catch (error: any) {
            toast.error(error.message || "Failed to save content")
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="p-8"><Loader2 className="animate-spin" /></div>

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Studio Content</h1>
                <Button onClick={handleOpenAdd}>
                    <Plus className="mr-2 h-4 w-4" /> Add Content Block
                </Button>
            </div>

            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Content Keys</AlertTitle>
                <AlertDescription>
                    Use specific keys to populate website sections:
                    <span className="font-mono bg-secondary px-1 ml-1">studio_details</span> (About page),
                    <span className="font-mono bg-secondary px-1 ml-1">contact_info</span> (Contact details),
                    <span className="font-mono bg-secondary px-1 ml-1">home_hero</span> (Home page hero text).
                </AlertDescription>
            </Alert>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Key</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Preview</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contents.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                    No content found. Add one to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            contents.map((content) => (
                                <TableRow key={content._id}>
                                    <TableCell className="font-mono text-sm">{content.key}</TableCell>
                                    <TableCell className="font-medium">{content.title}</TableCell>
                                    <TableCell className="text-muted-foreground truncate max-w-xs">{content.content?.substring(0, 50)}...</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(content)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(content.key)}>
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
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? 'Edit Content' : 'Add New Content'}</DialogTitle>
                        <DialogDescription>
                            Create or update content blocks for the website using unique keys.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="key">Unique Key</Label>
                                <Input
                                    id="key"
                                    value={currentContent.key || ''}
                                    onChange={e => setCurrentContent({ ...currentContent, key: e.target.value })}
                                    required
                                    disabled={isEditing}
                                    placeholder="e.g. studio_details"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={currentContent.title || ''}
                                    onChange={e => setCurrentContent({ ...currentContent, title: e.target.value })}
                                    required
                                    placeholder="e.g. Studio Description"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                value={currentContent.content || ''}
                                onChange={e => setCurrentContent({ ...currentContent, content: e.target.value })}
                                rows={10}
                                required
                                placeholder="Enter content here..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="meta">Meta Description</Label>
                            <Input
                                id="meta"
                                value={currentContent.metaDescription || ''}
                                onChange={e => setCurrentContent({ ...currentContent, metaDescription: e.target.value })}
                                placeholder="SEO description"
                            />
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={saving}>
                                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Save Content
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
