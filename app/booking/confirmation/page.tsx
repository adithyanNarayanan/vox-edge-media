import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle, Home, Calendar } from "lucide-react"

export const metadata = {
  title: "Booking Confirmed - Studio",
  description: "Your studio booking has been confirmed.",
}

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardContent className="p-12 text-center space-y-6">
              <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-display font-bold">Booking Confirmed!</h1>
                <p className="text-lg text-muted-foreground">Your studio session has been successfully booked.</p>
              </div>

              <div className="space-y-3 text-left bg-secondary p-6 rounded-lg">
                <h3 className="font-display font-semibold">What's Next?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    <span>You'll receive a confirmation email with all booking details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    <span>Our team will contact you 24 hours before your session</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    <span>Please arrive 15 minutes early for setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    <span>Bring any personal equipment or materials you need</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="flex-1">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="flex-1 bg-transparent">
                  <Link href="/booking">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Another Session
                  </Link>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground pt-4">
                Need to make changes? Contact us at voxedgemedia01@gmail.com or call +91 9447220618
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
