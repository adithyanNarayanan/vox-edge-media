import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Target, Heart, Lightbulb, Users } from "lucide-react"

export const metadata = {
  title: "About Us - Studio",
  description: "Learn about our mission to empower creators with professional podcast and video production facilities.",
}

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Quality First",
      description: "We never compromise on the quality of our equipment or services. Your content deserves the best.",
    },
    {
      icon: Heart,
      title: "Creator-Focused",
      description: "Every decision we make is centered around helping creators succeed and grow their audience.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We stay ahead with the latest technology and techniques in content production.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a network of creators who support and inspire each other to reach new heights.",
    },
  ]

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      bio: "15 years of experience in audio engineering and production.",
    },
    {
      name: "Priya Sharma",
      role: "Head of Video Production",
      bio: "Award-winning cinematographer with a passion for storytelling.",
    },
    {
      name: "Arjun Patel",
      role: "Audio Engineer",
      bio: "Specialized in podcast production and sound design.",
    },
    {
      name: "Meera Singh",
      role: "Client Success Manager",
      bio: "Dedicated to ensuring every creator has an amazing experience.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-balance">
            Building the Future of Content Creation
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            We believe that every creator deserves access to professional-grade production facilities. That's why we
            built a studio where creators are made, not just content.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-display font-bold">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2020 in the heart of Bangalore, our studio was born from a simple observation: talented
                  creators were being held back by access to quality production facilities.
                </p>
                <p>
                  We started with a single podcast studio and a vision to democratize professional content creation.
                  Today, we're proud to serve hundreds of creators, from independent podcasters to major brands.
                </p>
                <p>
                  Our mission remains the same: provide world-class production facilities and expertise to help creators
                  bring their vision to life.
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
            <div className="relative aspect-square">
              <img
                src="/modern-studio-space-with-equipment.jpg"
                alt="Our studio space"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index}>
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals passionate about helping creators succeed
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 space-y-4">
                  <div className="aspect-square rounded-lg bg-secondary overflow-hidden">
                    <img
                      src={`/professional-portrait.png?height=300&width=300&query=professional portrait ${member.name}`}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-semibold">{member.name}</h3>
                    <p className="text-sm text-accent font-medium">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-balance">Ready to Start Creating?</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Join hundreds of creators who trust us with their content production.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/booking">Book a Session</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/studios">Explore Studios</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
