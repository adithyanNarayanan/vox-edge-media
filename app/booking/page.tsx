"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { useRouter } from "next/navigation"
import { DollarSign } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { createBooking, clearError } from "@/lib/redux/slices/bookingSlice"

export default function BookingPage() {
  const router = useRouter()

  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.booking)
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  const [date, setDate] = useState<Date>()
  const [studioType, setStudioType] = useState("")
  const [packageType, setPackageType] = useState("")
  const [timeSlot, setTimeSlot] = useState("")
  const [duration, setDuration] = useState("1")
  const [specialRequests, setSpecialRequests] = useState("")

  const timeSlots = ["09:00-11:00", "11:00-13:00", "13:00-15:00", "15:00-17:00", "17:00-19:00", "19:00-21:00"]

  const packages = {
    podcast: [
      { value: "basic", label: "Podcast Basic - ₹2,500/hr", price: 2500 },
      { value: "pro", label: "Podcast Pro - ₹4,000/hr", price: 4000 },
    ],
    video: [
      { value: "basic", label: "Video Basic - ₹5,000/hr", price: 5000 },
      { value: "pro", label: "Video Pro - ₹8,000/hr", price: 8000 },
    ],
    full: [{ value: "premium", label: "Full Production - ₹12,000/hr", price: 12000 }],
  }

  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [dispatch])

  const calculatePrice = () => {
    if (!studioType || !packageType || !duration) return 0

    const selectedPackages = packages[studioType as keyof typeof packages]
    const pkg = selectedPackages.find((p) => p.value === packageType)

    if (!pkg) return 0

    return pkg.price * Number.parseInt(duration)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAuthenticated) {
      router.push("/login?redirect=/booking")
      return
    }

    if (!date || !studioType || !packageType || !timeSlot) {
      return
    }

    const result = await dispatch(
      createBooking({
        studioType,
        bookingDate: date.toISOString().split("T")[0],
        timeSlot,
        duration: Number.parseInt(duration),
        packageType,
        totalPrice: calculatePrice(),
        specialRequests,
      }),
    )

    if (createBooking.fulfilled.match(result)) {
      router.push("/booking/confirmation")
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold">Book Your Studio Session</h1>
            <p className="text-lg text-muted-foreground">Select your studio, date, and time to get started</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-display">Booking Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Studio Type */}
                  <div className="space-y-2">
                    <Label htmlFor="studioType">Studio Type *</Label>
                    <Select value={studioType} onValueChange={setStudioType}>
                      <SelectTrigger id="studioType">
                        <SelectValue placeholder="Select studio type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="podcast">Podcast Studio</SelectItem>
                        <SelectItem value="video">Video Studio</SelectItem>
                        <SelectItem value="full">Full Production</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Package Type */}
                  <div className="space-y-2">
                    <Label htmlFor="packageType">Package *</Label>
                    <Select value={packageType} onValueChange={setPackageType} disabled={!studioType}>
                      <SelectTrigger id="packageType">
                        <SelectValue placeholder="Select package" />
                      </SelectTrigger>
                      <SelectContent>
                        {studioType &&
                          packages[studioType as keyof typeof packages].map((pkg) => (
                            <SelectItem key={pkg.value} value={pkg.value}>
                              {pkg.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Duration */}
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (hours) *</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger id="duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((hrs) => (
                          <SelectItem key={hrs} value={hrs.toString()}>
                            {hrs} {hrs === 1 ? "hour" : "hours"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Time Slot */}
                  <div className="space-y-2">
                    <Label htmlFor="timeSlot">Time Slot *</Label>
                    <Select value={timeSlot} onValueChange={setTimeSlot}>
                      <SelectTrigger id="timeSlot">
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Date Picker */}
                <div className="space-y-2">
                  <Label>Booking Date *</Label>
                  <div className="border rounded-lg p-4 overflow-x-auto flex justify-center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md"
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                  <Textarea
                    id="specialRequests"
                    placeholder="Any special requirements or notes for your session..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Price Summary */}
                {calculatePrice() > 0 && (
                  <Card className="bg-secondary">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Total Price</p>
                          <p className="text-3xl font-display font-bold">₹{calculatePrice().toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">
                            {duration} {Number.parseInt(duration) === 1 ? "hour" : "hours"} × ₹
                            {(calculatePrice() / Number.parseInt(duration)).toLocaleString()}/hr
                          </p>
                        </div>
                        <DollarSign className="h-12 w-12 text-muted-foreground/20" />
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Processing..." : "Confirm Booking"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By booking, you agree to our terms and conditions. You'll receive a confirmation email shortly.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
