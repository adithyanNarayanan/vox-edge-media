import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Mic, Video, Headphones, Palette, Users, FileAudio, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react"

export const metadata = {
  title: "Services - Vox Edge Media",
  description: "Comprehensive podcast and video production services from recording to post-production at Vox Edge Media.",
}

export default function ServicesPage() {
  const services = [
    {
      icon: Mic,
      title: "Podcast Recording",
      description: "Professional podcast recording with multi-track capabilities and real-time monitoring.",
      features: [
        "Premium microphones (Shure SM7B, Neumann U87)",
        "Acoustic treatment for pristine audio",
        "Multi-track recording up to 8 guests",
        "Real-time audio processing",
      ],
    },
    {
      icon: Video,
      title: "Video Production",
      description: "Full-service video production from pre-production planning to final delivery.",
      features: [
        "4K video recording with multiple cameras",
        "Professional lighting setups",
        "Green screen and custom backdrops",
        "Live switching and monitoring",
      ],
    },
    {
      icon: Headphones,
      title: "Audio Engineering",
      description: "Expert audio mixing and mastering to ensure broadcast-quality sound.",
      features: [
        "Professional mixing and mastering",
        "Noise reduction and audio cleanup",
        "Loudness optimization for platforms",
        "Sound design and effects",
      ],
    },
    {
      icon: Palette,
      title: "Post-Production",
      description: "Complete post-production services including editing, color grading, and graphics.",
      features: [
        "Professional video editing",
        "Color grading and correction",
        "Motion graphics and titles",
        "Audio sync and enhancement",
      ],
    },
    {
      icon: Users,
      title: "Live Streaming",
      description: "Multi-camera live streaming setup for events, podcasts, and webinars.",
      features: [
        "Multi-platform streaming (YouTube, Twitch, etc.)",
        "Professional switching and graphics",
        "Real-time engagement tools",
        "Recording for later use",
      ],
    },
    {
      icon: FileAudio,
      title: "Consultation",
      description: "Expert guidance on content strategy, equipment, and production workflows.",
      features: [
        "Content strategy development",
        "Equipment recommendations",
        "Workflow optimization",
        "Training and coaching",
      ],
    },
  ]

  const packages = [
    {
      name: "Podcast Package",
      price: "₹3,000",
      duration: "per hour",
      description: "Perfect for podcast creators and interviews",
      features: [
        "Premium podcast studio",
        "Up to 4 guests",
        "Multi-track recording",
        "Basic audio editing",
        "Delivery in 48 hours",
      ],
    },
    {
      name: "Video Package",
      price: "₹5,000",
      duration: "per hour",
      description: "Ideal for video content creators",
      features: [
        "Professional video studio",
        "4K multi-camera setup",
        "Professional lighting",
        "Basic video editing",
        "Delivery in 5 days",
      ],
    },
    {
      name: "Premium Package",
      price: "₹8,000",
      duration: "per hour",
      description: "Complete production with all bells and whistles",
      features: [
        "Both podcast and video studios",
        "Full production team",
        "Advanced post-production",
        "Motion graphics included",
        "Priority delivery in 3 days",
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Full-Service Production
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-balance">
            Everything You Need to Create Amazing Content
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            From recording to post-production, our comprehensive services cover every aspect of content creation.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Service Packages</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the package that fits your needs and budget
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={index === 1 ? "border-primary shadow-lg" : ""}>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-bold">{pkg.name}</h3>
                    <p className="text-muted-foreground">{pkg.description}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-display font-bold">{pkg.price}</span>
                      <span className="text-muted-foreground">/ {pkg.duration}</span>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full" variant={index === 1 ? "default" : "outline"}>
                    <Link href="/booking">Book Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Our Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, streamlined workflow from booking to delivery
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Book Your Session", desc: "Choose your studio and time slot online" },
              { step: "02", title: "Pre-Production", desc: "We'll help you plan and prepare" },
              { step: "03", title: "Recording Day", desc: "Professional recording in our studio" },
              { step: "04", title: "Post & Delivery", desc: "Editing, mixing, and final delivery" },
            ].map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="text-5xl font-display font-bold text-primary/20">{item.step}</div>
                <h3 className="text-xl font-display font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-balance">
            Ready to Bring Your Vision to Life?
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Book a consultation or studio session today and let's create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/booking">
                Book Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
