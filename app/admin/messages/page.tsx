"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { fetchAdminMessages } from "@/lib/redux/slices/adminSlice"

export default function MessagesPage() {
  const dispatch = useAppDispatch()
  const { messages, loading } = useAppSelector((state) => state.admin)

  useEffect(() => {
    dispatch(fetchAdminMessages())
  }, [dispatch])

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Loading messages...</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Messages</h1>
        <p className="text-muted-foreground">View and manage contact form submissions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-display">All Messages ({messages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {messages.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No messages found</p>
          ) : (
            <div className="space-y-4">
              {messages.map((msg: any) => (
                <div key={msg.id} className="border border-border rounded-lg p-6 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-semibold">{msg.name}</h3>
                        <Badge variant="default">new</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{msg.email}</p>
                      {msg.phone && <p className="text-sm text-muted-foreground">{msg.phone}</p>}
                    </div>
                    <p className="text-sm text-muted-foreground">{new Date(msg.createdAt).toLocaleString()}</p>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
