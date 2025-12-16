import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Mic, Video, Users, Square, Headphones, Monitor, ArrowRight, CheckCircle2 } from "lucide-react"

export const metadata = {
  title: "Studios - Vox Edge Media",
  description:
    "Explore Vox Edge Media's professional podcast and video production studios equipped with state-of-the-art technology.",
}

export default function StudiosPage() {
  const podcastFeatures = [
    "Shure SM7B and Neumann U87 microphones",
    "Acoustic treatment and soundproofing",
    "Multi-track recording (up to 8 guests)",
    "Real-time audio processing and monitoring",
    "Comfortable seating for long sessions",
    "ISDN and remote recording capabilities",
  ]

  const videoFeatures = [
    "4K cinema cameras with multiple angles",
    "Professional LED lighting systems",
    "Green screen and custom backdrops",
    "Wireless lavalier microphones",
    "Teleprompter and monitor setups",
    "Live switching and preview monitors",
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-balance">
            Professional Studios for Every Creator
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            State-of-the-art facilities designed for podcasters, video creators, and content producers who demand the
            best.
          </p>
        </div>
      </section>

      {/* Podcast Studio */}
      <section id="podcast" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background text-sm font-medium">
                <Mic className="h-4 w-4" />
                Podcast Studio
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold">Podcast Recording Studio</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our podcast studio is designed for crystal-clear audio quality. Whether you're recording solo or with
                multiple guests, we provide the perfect environment for professional podcast production.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Up to 8 Guests</p>
                      <p className="text-xs text-muted-foreground">Multi-track recording</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Square className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">250 sq ft</p>
                      <p className="text-xs text-muted-foreground">Spacious layout</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                <h3 className="font-display font-semibold text-lg">Studio Features</h3>
                <ul className="space-y-2">
                  {podcastFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/booking">
                    Book Podcast Studio
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src="/professional-podcast-recording-studio-with-microph.jpg"
                  alt="Podcast Studio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img src="/podcast-studio-microphone-close-up.jpg" alt="Microphone setup" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src="/podcast-studio-control-panel.jpg"
                    alt="Audio control panel"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Studio */}
      <section id="video" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 order-2 lg:order-1">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src="/professional-video-production-studio-with-cameras-.jpg"
                  alt="Video Studio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img src="/video-studio-lighting-setup.jpg" alt="Lighting setup" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img src="/video-studio-green-screen.jpg" alt="Green screen" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium">
                <Video className="h-4 w-4" />
                Video Studio
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold">Video Production Studio</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Create stunning video content in our fully-equipped video studio. From YouTube videos to corporate
                productions, we have everything you need for professional-quality video.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Monitor className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">4K Recording</p>
                      <p className="text-xs text-muted-foreground">Cinema quality</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Square className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">400 sq ft</p>
                      <p className="text-xs text-muted-foreground">Spacious studio</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                <h3 className="font-display font-semibold text-lg">Studio Features</h3>
                <ul className="space-y-2">
                  {videoFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/booking">
                    Book Video Studio
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold">What's Included</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every studio booking includes these professional services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 space-y-3 text-center">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold">Technical Support</h3>
                <p className="text-muted-foreground">Professional engineer to help with setup and recording</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-3 text-center">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <Headphones className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold">Basic Editing</h3>
                <p className="text-muted-foreground">Basic post-production included in every package</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-3 text-center">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <Monitor className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold">Fast Delivery</h3>
                <p className="text-muted-foreground">Quick turnaround time for edited content</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-balance">Experience Our Studios in Person</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Schedule a tour to see our facilities and discuss your project with our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/booking">Book a Studio</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Schedule a Tour</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
