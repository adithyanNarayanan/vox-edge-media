"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Mail, Phone, Clock, CheckCircle } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { submitContactForm, clearError, clearSuccess } from "@/lib/redux/slices/contactSlice"

export default function ContactPage() {
  const dispatch = useAppDispatch()
  const { loading, success, error } = useAppSelector((state) => state.contact)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (success) {
      setName("")
      setEmail("")
      setPhone("")
      setMessage("")

      const timer = setTimeout(() => {
        dispatch(clearSuccess())
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [success, dispatch])

  useEffect(() => {
    return () => {
      dispatch(clearError())
      dispatch(clearSuccess())
    }
  }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await dispatch(submitContactForm({ name, email, phone, message }))
  }

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-balance">Get in Touch</h1>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-display font-bold mb-6">Send Us a Message</h2>

                  {success && (
                    <div className="mb-6 p-4 rounded-lg bg-accent/10 text-accent flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 flex-shrink-0" />
                      <span>Thank you! We've received your message and will get back to you soon.</span>
                    </div>
                  )}

                  {error && (
                    <div className="mb-6 p-4 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project or how we can help..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={loading}>
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-sm text-muted-foreground">
                            NO 111, 3RD MAIN, CIL LAYOUT, SANJAYNAGAR, R.M.V. Extension II Stage, Bangalore North, Bangalore- 560094, Karnataka
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Email</p>
                          <a
                            href="mailto:voxedgemedia01@gmail.com"
                            className="text-sm text-muted-foreground hover:text-primary"
                          >
                            voxedgemedia01@gmail.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Phone</p>
                          <a href="tel:+919447220618" className="text-sm text-muted-foreground hover:text-primary">
                            +91 9447220618
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Business Hours</p>
                          <p className="text-sm text-muted-foreground">
                            Monday - Saturday
                            <br />
                            9:00 AM - 9:00 PM
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-lg mb-3">Quick Response</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We typically respond to all inquiries within 24 hours during business days.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>General inquiries: 4-6 hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>Booking questions: 2-4 hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>Technical support: 1-2 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section >

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Visit Our Studio</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Located in the heart of Bangalore, our studio is easily accessible
            </p>
          </div>
          <div className="aspect-video rounded-lg overflow-hidden border border-border bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6977476674545!2d77.61145087507623!3d12.927923987382155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15db9b8f92d1%3A0x207e0b0e1b0b0b0b!2sKoramangala%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890123"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Studio Location"
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Common Questions</h2>
            <p className="text-lg text-muted-foreground">Quick answers to questions you may have</p>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "How do I book a studio session?",
                a: "You can book directly through our website by selecting your preferred date, time, and studio type. You'll need to create an account first.",
              },
              {
                q: "Can I schedule a studio tour?",
                a: "Contact us to schedule a free tour of our facilities. We'll show you around and answer any questions you have.",
              },
              {
                q: "Do you offer package deals?",
                a: "Yes, we offer discounted rates for bulk bookings and monthly subscriptions. Contact us for custom packages tailored to your needs.",
              },
              {
                q: "What if I need to reschedule?",
                a: "You can reschedule up to 48 hours before your session at no charge. Cancellations within 48 hours incur a 50% fee.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6 space-y-2">
                  <h3 className="font-display font-semibold">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div >
  )
}
