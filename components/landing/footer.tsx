'use client'

import Link from 'next/link'
import { Mail } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const securitiesLinks = [
  { name: 'CIRO Exam Prep', href: '/securities' },
  { name: 'CSE', href: '#' },
  { name: 'ESE', href: '#' },
]

const insuranceLinks = [
  { name: 'LLQP', href: '/life-license-qualification-program' },
  { name: 'A&S', href: '#' },
  { name: 'GLQP', href: '/general-level-1-insurance-qualification-program' },
]

const financialPlanningLinks = [
  { name: 'CFP® Exam Prep', href: '/certified-financial-planner' },
  { name: 'QAFP™ Exam Prep', href: '/qualified-associate-financial-planner' },
]

const digitalAssetsLinks = [
  { name: 'CDAA Advisor', href: '/digital-asset-financial-advisor' },
  { name: 'CDAA Enterprise', href: '/digital-asset-corporate-training' },
]

const companyLinks = [
  { name: 'About', href: '#' },
  { name: 'Success Stories', href: '#' },
  { name: 'Events', href: '#' },
  { name: 'Blog', href: '#' },
  { name: 'Contact', href: '#' },
]

const legalLinks = [
  { name: 'Terms of Use', href: '#' },
  { name: 'Privacy Policy', href: '#' },
  { name: 'Refund Policy', href: '#' },
]

function FooterSection({ title, links }: { title: string; links: { name: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-bold tracking-wide text-white mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Mailing list signup:', { firstName, lastName, email })
  }

  return (
    <footer className="bg-[#1a3a63] text-white">
      <div className="flex h-2">
        <div className="flex-1 bg-[#2c7d9e]" />
        <div className="flex-1 bg-[#7cc4cd]" />
        <div className="flex-1 bg-[#fbe8bc]" />
        <div className="flex-1 bg-[#e05a4f]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          <FooterSection title="SECURITIES" links={securitiesLinks} />
          <FooterSection title="INSURANCE" links={insuranceLinks} />
          <FooterSection title="FINANCIAL PLANNING" links={financialPlanningLinks} />
          <FooterSection title="DIGITAL ASSETS" links={digitalAssetsLinks} />
          <FooterSection title="COMPANY" links={companyLinks} />
          <FooterSection title="LEGAL" links={legalLinks} />
        </div>

        <div className="mt-12 border-t border-white/15 pt-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex items-center gap-4">
              <Mail size={32} strokeWidth={1.5} className="flex-shrink-0 text-white" />
              <div>
                <p className="font-bold text-white">Join our mailing list</p>
                <p className="text-sm text-gray-300">Subscribe now for updates</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input
                type="text"
                aria-label="First Name"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-11 w-full sm:w-40 bg-white text-gray-900 placeholder:text-gray-500 rounded-sm border-0"
              />
              <Input
                type="text"
                aria-label="Last Name"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-11 w-full sm:w-40 bg-white text-gray-900 placeholder:text-gray-500 rounded-sm border-0"
              />
              <Input
                type="email"
                aria-label="Email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full sm:w-48 bg-white text-gray-900 placeholder:text-gray-500 rounded-sm border-0"
              />
              <Button
                type="submit"
                className="h-11 px-7 bg-[#e05a4f] text-white hover:bg-[#cc4c42] rounded-sm font-semibold"
              >
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-gray-400 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 Business Career College. All rights reserved.</p>
          <p>Proudly Canadian. Learning for a brighter future.</p>
        </div>
      </div>
    </footer>
  )
}
