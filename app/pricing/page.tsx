import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react"

export const metadata = {
  title: "Pricing - Vox Edge Media",
  description: "Transparent pricing for podcast and video production studio bookings at Vox Edge Media.",
}

export default function PricingPage() {
  const pricingPlans = [
    {
      name: "Podcast Basic",
      price: "₹2,500",
      duration: "per hour",
      description: "Perfect for solo podcasters and interviews",
      features: [
        "Premium podcast studio",
        "Up to 2 guests",
        "Multi-track recording",
        "Basic audio editing",
        "48-hour delivery",
        "Professional engineer support",
      ],
      popular: false,
    },
    {
      name: "Podcast Pro",
      price: "₹4,000",
      duration: "per hour",
      description: "Ideal for professional podcasters",
      features: [
        "Premium podcast studio",
        "Up to 6 guests",
        "Multi-track recording",
        "Advanced audio editing & mastering",
        "24-hour delivery",
        "Professional engineer support",
        "Show notes & timestamps",
        "Audiogram creation",
      ],
      popular: true,
    },
    {
      name: "Video Basic",
      price: "₹5,000",
      duration: "per hour",
      description: "Great for YouTube creators",
      features: [
        "Professional video studio",
        "Single camera 4K recording",
        "Professional lighting",
        "Basic video editing",
        "5-day delivery",
        "Professional engineer support",
      ],
      popular: false,
    },
    {
      name: "Video Pro",
      price: "₹8,000",
      duration: "per hour",
      description: "Perfect for professional content",
      features: [
        "Professional video studio",
        "Multi-camera 4K setup",
        "Professional lighting & audio",
        "Advanced editing & color grading",
        "3-day delivery",
        "Full production team",
        "Motion graphics included",
        "Custom thumbnails",
      ],
      popular: true,
    },
    {
      name: "Full Production",
      price: "₹12,000",
      duration: "per hour",
      description: "Complete production package",
      features: [
        "Both podcast & video studios",
        "Multi-camera 4K setup",
        "Full production team",
        "Premium editing & post-production",
        "Same-day delivery option",
        "Motion graphics & animations",
        "Social media clips",
        "Dedicated project manager",
      ],
      popular: false,
    },
  ]

  const addOns = [
    { name: "Additional Editing Hour", price: "₹1,500" },
    { name: "Motion Graphics Package", price: "₹3,000" },
    { name: "Social Media Clips (5 clips)", price: "₹2,000" },
    { name: "Thumbnail Design", price: "₹800" },
    { name: "Audiogram (per minute)", price: "₹200" },
    { name: "Rush Delivery (24h)", price: "₹2,500" },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Transparent Pricing
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-balance">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            Choose the package that fits your needs. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-xl scale-105" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="space-y-4 pb-6">
                  <CardTitle className="text-2xl font-display">{plan.name}</CardTitle>
                  <p className="text-muted-foreground">{plan.description}</p>
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-display font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/ {plan.duration}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"}>
                    <Link href="/booking">
                      Book Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Add-On Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enhance your production with these additional services
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon, index) => (
              <Card key={index}>
                <CardContent className="p-6 flex items-center justify-between">
                  <span className="font-medium">{addon.name}</span>
                  <span className="text-lg font-display font-bold">{addon.price}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {[
              {
                q: "Can I book for multiple hours?",
                a: "Yes! We offer discounts for bookings of 4+ hours. Contact us for custom packages.",
              },
              {
                q: "What's included in the editing?",
                a: "Basic editing includes trimming, noise reduction, and basic mixing. Advanced packages include mastering, color grading, and effects.",
              },
              {
                q: "Do you offer monthly packages?",
                a: "Yes, we have monthly subscription packages for regular creators. Contact us for details.",
              },
              {
                q: "What's your cancellation policy?",
                a: "Free cancellation up to 48 hours before your booking. Cancellations within 48 hours incur a 50% fee.",
              },
              {
                q: "Can I bring my own equipment?",
                a: "You're welcome to bring any additional equipment you'd like to use.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6 space-y-2">
                  <h3 className="font-display font-semibold text-lg">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-balance">Ready to Get Started?</h2>
          <p className="text-lg md:text-xl opacity-90 text-pretty">
            Book your studio session today and create content that stands out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/booking">Book Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
