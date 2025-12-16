"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { fetchAdminBookings } from "@/lib/redux/slices/adminSlice"

export default function BookingsPage() {
  const dispatch = useAppDispatch()
  const { bookings, loading } = useAppSelector((state) => state.admin)

  useEffect(() => {
    dispatch(fetchAdminBookings())
  }, [dispatch])

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Loading bookings...</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Bookings</h1>
        <p className="text-muted-foreground">Manage all studio bookings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-display">All Bookings ({bookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No bookings found</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking: any) => (
                <div key={booking.id} className="border border-border rounded-lg p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-semibold text-lg">{booking.userName}</h3>
                        <Badge
                          variant={
                            booking.status === "confirmed"
                              ? "default"
                              : booking.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{booking.userEmail}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-display font-bold">₹{Number(booking.totalPrice).toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Booking ID: #{booking.id.slice(-4)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Studio Type</p>
                      <p className="font-medium capitalize">{booking.studioType}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-medium">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Time Slot</p>
                      <p className="font-medium">{booking.timeSlot}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">
                        {booking.duration} {booking.duration === 1 ? "hour" : "hours"}
                      </p>
                    </div>
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
