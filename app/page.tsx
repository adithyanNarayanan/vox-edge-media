import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Mic, Video, Headphones, Sparkles, Users, Award, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Vox Edge Media - Premium Production Studio
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-balance">
              Creators Are Made Here
            </h1>

            <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground text-pretty">
              Professional podcast and video production studio where your creative vision comes to life.
              State-of-the-art equipment, expert team, and seamless workflow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="text-base">
                <Link href="/booking">
                  Book Your Session
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base bg-transparent">
                <Link href="/studios">Explore Studios</Link>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-16 relative">
            <div className="aspect-video rounded-lg overflow-hidden border border-border bg-secondary">
              <img
                src="/professional-podcast-studio-with-microphones-and-v.jpg"
                alt="Professional podcast and video studio"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Cards */}
            <div className="absolute -bottom-8 left-4 md:left-12">
              <Card className="bg-background shadow-lg">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mic className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Podcast Studio</p>
                    <p className="text-sm text-muted-foreground">Professional Audio</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="absolute -bottom-8 right-4 md:right-12">
              <Card className="bg-background shadow-lg">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Video className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Video Studio</p>
                    <p className="text-sm text-muted-foreground">4K Production</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-balance">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Everything you need to create professional content in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold">Premium Equipment</h3>
                <p className="text-muted-foreground">
                  Industry-leading microphones, cameras, and lighting equipment for broadcast-quality production.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold">Expert Team</h3>
                <p className="text-muted-foreground">
                  Experienced audio engineers and videographers to bring your vision to life.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Headphones className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold">Full Production</h3>
                <p className="text-muted-foreground">
                  From recording to editing and post-production, we handle everything for you.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Studios Preview */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-balance">Our Studios</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Choose the perfect space for your production needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src="/professional-podcast-recording-studio-with-microph.jpg"
                  alt="Podcast Studio"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6 space-y-2">
                <h3 className="text-2xl font-display font-semibold">Podcast Studio</h3>
                <p className="text-muted-foreground">
                  Acoustically treated space with premium microphones and audio processing for crystal-clear recordings.
                </p>
                <Button asChild variant="link" className="px-0">
                  <Link href="/studios#podcast">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src="/professional-video-production-studio-with-cameras-.jpg"
                  alt="Video Studio"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6 space-y-2">
                <h3 className="text-2xl font-display font-semibold">Video Studio</h3>
                <p className="text-muted-foreground">
                  Spacious studio with 4K cameras, professional lighting, and customizable backdrops for any production.
                </p>
                <Button asChild variant="link" className="px-0">
                  <Link href="/studios#video">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-balance">Ready to Create?</h2>
          <p className="text-lg md:text-xl opacity-90 text-pretty">
            Book your studio session today and bring your creative vision to life with our professional team and
            equipment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-base">
              <Link href="/booking">Book Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
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
