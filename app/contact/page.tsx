'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Check,
  CalendarDays,
} from 'lucide-react'

import '@fontsource/jost'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const jost = { fontFamily: 'Jost, sans-serif' }

const programs = [
  'Securities — CIRO Exam Prep',
  'Insurance — LLQP',
  'Insurance — GLQP',
  'Financial Planning — CFP Exam Prep',
  'Financial Planning — QAFP Exam Prep',
  'Digital Assets — CDAA',
  'Corporate / Enterprise training',
  'Something else',
]

const details = [
  {
    icon: Mail,
    tint: '#219ebc',
    label: 'Email us',
    value: 'info@businesscareercollege.ca',
    href: 'mailto:info@businesscareercollege.ca',
    note: 'We reply within one business day.',
  },
  {
    icon: Phone,
    tint: '#fb8500',
    label: 'Call us',
    value: '+1 (403) 555-0142',
    href: 'tel:+14035550142',
    note: 'Mon–Fri, 9:00am – 5:00pm MT.',
  },
  {
    icon: MapPin,
    tint: '#1a7f99',
    label: 'Visit',
    value: 'Calgary, Alberta, Canada',
    href: null,
    note: 'Online-first, coast to coast.',
  },
  {
    icon: Clock,
    tint: '#e05a4f',
    label: 'Office hours',
    value: 'Mon – Fri · 9 – 5 MT',
    href: null,
    note: 'Weekend replies by Monday.',
  },
]

const fieldClass =
  'h-12 w-full min-w-0 rounded-xl border border-border bg-white px-4 text-base text-foreground transition-[color,box-shadow] duration-200 outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20'

type FormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  program: string
  message: string
}

type Errors = Partial<Record<keyof FormState, string>>

const initialForm: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  program: '',
  message: '',
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
  className,
}: {
  label: string
  htmlFor: string
  error?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-semibold text-foreground"
      >
        {label}
        {required && <span className="ml-0.5 text-[#e05a4f]">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs font-medium text-destructive">{error}</p>
      )}
    </div>
  )
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  const update = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = (): Errors => {
    const next: Errors = {}
    if (!form.firstName.trim()) next.firstName = 'Please enter your first name.'
    if (!form.lastName.trim()) next.lastName = 'Please enter your last name.'
    if (!form.email.trim()) next.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = 'Please enter a valid email address.'
    if (!form.message.trim()) next.message = 'Let us know how we can help.'
    return next
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const next = validate()
    if (Object.keys(next).length > 0) {
      setErrors(next)
      return
    }
    console.log('Contact enquiry:', form)
    setSubmitted(true)
  }

  return (
    <main>
      {/* ---- Hero band ---- */}
      <section className="relative overflow-hidden bg-[#fdf9ec]">
        {/* Coral blob, top right */}
        <div className="pointer-events-none absolute -top-24 right-28 z-0 hidden size-72 rounded-full bg-[#f4795b] lg:block" />
        {/* Amber wedge, right edge */}
        <div className="pointer-events-none absolute -top-12 -right-16 z-0 hidden size-64 rounded-full bg-[#ffb703] lg:block" />
        {/* Teal soft circle, left */}
        <div className="pointer-events-none absolute -bottom-40 -left-32 z-0 hidden size-[34rem] rounded-full bg-[#8ecae6]/60 lg:block" />
        {/* Dotted grid */}
        <div
          className="pointer-events-none absolute right-1/2 top-16 z-0 hidden size-28 lg:block"
          style={{
            backgroundImage: 'radial-gradient(#8ecae6 2px, transparent 2px)',
            backgroundSize: '22px 22px',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 sm:pb-28 sm:pt-16 lg:px-8 lg:pb-36 lg:pt-24">
          <div className="max-w-2xl animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-sm font-semibold text-[#1a7f99] ring-1 ring-[#8ecae6]/60 backdrop-blur">
              <span className="size-2 rounded-full bg-[#219ebc]" />
              We usually reply within a business day
            </span>
            <h1
              className="mt-6 text-3xl font-bold leading-[1.15] tracking-tight text-balance text-foreground sm:text-5xl sm:leading-[1.1] lg:text-6xl"
              style={jost}
            >
              Let&apos;s map out your{' '}
              <span className="text-primary">next step</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-foreground/70 sm:text-lg">
              Questions about licensing, exam prep, or the right designation
              pathway? Tell us where you are and where you want to be — a real
              advisor will point you in the right direction.
            </p>
          </div>
        </div>

        {/* Teal wave sweeping the bottom */}
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-12 w-full text-[#8ecae6] sm:h-24"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0 96c240 0 360-64 720-64s480 64 720 64v24H0z"
          />
        </svg>
      </section>

      {/* ---- Form + details ---- */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Form card */}
          <div
            className="animate-rise rounded-3xl bg-card p-6 shadow-sm ring-1 ring-black/5 sm:p-10"
            style={{ animationDelay: '80ms' }}
          >
            {submitted ? (
              <div className="flex min-h-[26rem] flex-col items-center justify-center text-center">
                <span className="grid size-16 place-items-center rounded-full bg-[#219ebc]/12 text-primary">
                  <Check className="size-8" strokeWidth={2.5} />
                </span>
                <h2
                  className="mt-6 text-2xl font-bold text-foreground sm:text-3xl"
                  style={jost}
                >
                  Message on its way
                </h2>
                <p className="mt-3 max-w-sm text-foreground/70">
                  Thanks, {form.firstName || 'there'}. We&apos;ve got your
                  enquiry and one of our advisors will be in touch within one
                  business day.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button
                    size="lg"
                    className="h-12 rounded-xl px-6 text-[15px] font-semibold"
                    onClick={() => {
                      setForm(initialForm)
                      setSubmitted(false)
                    }}
                  >
                    Send another message
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 rounded-xl border-primary/40 bg-transparent px-6 text-[15px] font-semibold text-primary hover:bg-primary/5 hover:text-primary"
                    nativeButton={false}
                    render={<Link href="/" />}
                  >
                    Back to home
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h2
                  className="text-2xl font-bold text-foreground sm:text-3xl"
                  style={jost}
                >
                  Send us a message
                </h2>
                <p className="mt-2 text-foreground/60">
                  Fields marked <span className="text-[#e05a4f]">*</span> are
                  required.
                </p>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-8 grid gap-5 sm:grid-cols-2"
                >
                  <Field
                    label="First name"
                    htmlFor="firstName"
                    error={errors.firstName}
                    required
                  >
                    <Input
                      id="firstName"
                      value={form.firstName}
                      onChange={update('firstName')}
                      aria-invalid={!!errors.firstName}
                      placeholder="Jordan"
                      autoComplete="given-name"
                      autoCapitalize="words"
                      enterKeyHint="next"
                      className={fieldClass}
                    />
                  </Field>

                  <Field
                    label="Last name"
                    htmlFor="lastName"
                    error={errors.lastName}
                    required
                  >
                    <Input
                      id="lastName"
                      value={form.lastName}
                      onChange={update('lastName')}
                      aria-invalid={!!errors.lastName}
                      placeholder="Reyes"
                      autoComplete="family-name"
                      autoCapitalize="words"
                      enterKeyHint="next"
                      className={fieldClass}
                    />
                  </Field>

                  <Field
                    label="Email"
                    htmlFor="email"
                    error={errors.email}
                    required
                  >
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      aria-invalid={!!errors.email}
                      placeholder="you@email.com"
                      autoComplete="email"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      inputMode="email"
                      enterKeyHint="next"
                      className={fieldClass}
                    />
                  </Field>

                  <Field label="Phone" htmlFor="phone">
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={update('phone')}
                      placeholder="Optional"
                      autoComplete="tel"
                      inputMode="tel"
                      enterKeyHint="next"
                      className={fieldClass}
                    />
                  </Field>

                  <Field
                    label="I'm interested in"
                    htmlFor="program"
                    className="sm:col-span-2"
                  >
                    <select
                      id="program"
                      value={form.program}
                      onChange={update('program')}
                      className={`${fieldClass} appearance-none bg-[length:20px] bg-[right_1rem_center] bg-no-repeat pr-11`}
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none' stroke='%23023047' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 4.5l3 3 3-3'/%3E%3C/svg%3E\")",
                      }}
                    >
                      <option value="">Select a program…</option>
                      {programs.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    label="How can we help?"
                    htmlFor="message"
                    error={errors.message}
                    required
                    className="sm:col-span-2"
                  >
                    <textarea
                      id="message"
                      value={form.message}
                      onChange={update('message')}
                      aria-invalid={!!errors.message}
                      rows={5}
                      placeholder="Tell us a little about your goals or your question…"
                      enterKeyHint="enter"
                      className={`${fieldClass} h-auto resize-y py-3 leading-relaxed`}
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Button
                      type="submit"
                      size="lg"
                      className="h-13 w-full rounded-xl px-8 text-base font-semibold sm:w-auto"
                    >
                      Send message
                      <ArrowRight
                        data-icon="inline-end"
                        className="ml-2 size-5"
                      />
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Details column */}
          <div className="animate-rise" style={{ animationDelay: '160ms' }}>
            <h2
              className="text-2xl font-bold text-foreground"
              style={jost}
            >
              Other ways to reach us
            </h2>
            <p className="mt-2 text-foreground/60">
              Prefer email or a quick call? Here&apos;s where to find us.
            </p>

            <div className="mt-8 space-y-3">
              {details.map(({ icon: Icon, tint, label, value, href, note }) => {
                const body = (
                  <div className="flex items-start gap-4 rounded-2xl bg-card p-4 ring-1 ring-black/5 transition-shadow hover:shadow-md">
                    <span
                      className="grid size-11 flex-shrink-0 place-items-center rounded-xl"
                      style={{ backgroundColor: `${tint}1f`, color: tint }}
                    >
                      <Icon className="size-5" strokeWidth={2} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-foreground/50">
                        {label}
                      </p>
                      <p className="mt-0.5 font-semibold break-words text-foreground">
                        {value}
                      </p>
                      <p className="mt-0.5 text-sm text-foreground/60">{note}</p>
                    </div>
                  </div>
                )
                return href ? (
                  <a key={label} href={href} className="block">
                    {body}
                  </a>
                ) : (
                  <div key={label}>{body}</div>
                )
              })}
            </div>

            {/* Consultation nudge */}
            <div className="mt-6 overflow-hidden rounded-2xl bg-[#023047] p-6 text-white">
              <div className="flex items-start gap-4">
                <span className="grid size-11 flex-shrink-0 place-items-center rounded-xl bg-white/10 text-[#8ecae6]">
                  <CalendarDays className="size-5" strokeWidth={2} />
                </span>
                <div>
                  <h3 className="font-bold" style={jost}>
                    Rather talk it through?
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">
                    Book a free 20-minute consultation and we&apos;ll help you
                    choose the right pathway.
                  </p>
                  <Button
                    variant="outline"
                    size="lg"
                    className="mt-4 h-12 w-full rounded-xl border-white/25 bg-transparent px-5 text-[15px] font-semibold text-white hover:bg-white/10 hover:text-white sm:h-11 sm:w-auto"
                    nativeButton={false}
                    render={<Link href="/events" />}
                  >
                    Book a consultation
                    <ArrowRight data-icon="inline-end" className="ml-2 size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
