"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, DollarSign, MessageSquare, Users } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { fetchDashboardStats } from "@/lib/redux/slices/adminSlice"

export default function AdminDashboard() {
  const dispatch = useAppDispatch()
  const { stats, bookings, loading } = useAppSelector((state) => state.admin)

  useEffect(() => {
    dispatch(fetchDashboardStats())
  }, [dispatch])

  const statCards = [
    {
      title: "Total Bookings",
      value: stats?.bookings?.total || 0,
      icon: Calendar,
      description: `Pending: ${stats?.bookings?.pending || 0}`,
    },
    {
      title: "Total Revenue",
      value: `₹${Number(stats?.bookings?.revenue || 0).toLocaleString()}`,
      icon: DollarSign,
      description: "From confirmed bookings",
    },
    {
      title: "Total Users",
      value: stats?.users?.total || 0,
      icon: Users,
      description: `${stats?.users?.admins || 0} Admins`,
    },
    {
      title: "Active Services",
      value: stats?.content?.services || 0,
      icon: MessageSquare, // Using MessageSquare as generic icon, ideally use Layers or similar
      description: `${stats?.content?.plans || 0} Subscription Plans`,
    },
  ]

  if (loading) {
    return (
      <div className="p-8 space-y-8">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your studio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-display font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-display">Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No bookings yet</p>
            ) : (
              bookings.map((booking: any) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{booking.userName}</p>
                    <p className="text-sm text-muted-foreground">{booking.userEmail}</p>
                    <p className="text-sm">
                      {booking.studioType} - {booking.timeSlot}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-display font-bold">₹{Number(booking.totalPrice).toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs ${booking.status === "confirmed"
                          ? "bg-accent/10 text-accent"
                          : booking.status === "pending"
                            ? "bg-yellow-500/10 text-yellow-600"
                            : "bg-red-500/10 text-red-600"
                        }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
