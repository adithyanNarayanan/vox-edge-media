import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react"
import { API_ENDPOINTS } from "@/lib/api-config"
import pricingData from '@/data/pricing.json'

export const metadata = {
  title: "Pricing - Vox Edge Media",
  description: "Transparent pricing for podcast and video production studio bookings at Vox Edge Media.",
}

async function getPlans() {
  try {
    const res = await fetch(API_ENDPOINTS.PLANS.LIST, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch plans:", error);
    return null;
  }
}

export default async function PricingPage() {
  const plansData = await getPlans();
  const dbPlans = plansData?.data || [];

  const staticPlans = pricingData.staticPlans;

  // Map DB plans to front-end model
  const pricingPlans = dbPlans.length > 0 ? dbPlans.map((p: any) => ({
    name: p.name,
    price: `₹${p.price}`,
    duration: `per ${p.billingCycle}`,
    description: p.description,
    // Extract included items text
    features: p.features.filter((f: any) => f.included).map((f: any) => f.text),
    popular: p.isPopular
  })) : staticPlans;

  const addOns = pricingData.addOns;

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
            {pricingPlans.map((plan: any, index: number) => (
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
                    {plan.features.map((feature: string, idx: number) => (
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
            {addOns.map((addon: any, index: number) => (
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
            {pricingData.faqs.map((faq: any, index: number) => (
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
