'use client'

import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const securitiesLinks = [
  { name: 'CIRO Exam Prep', href: '/securities' },
]

const insuranceLinks = [
  { name: 'LLQP', href: '/life-license-qualification-program' },
  { name: 'PQAP', href: '/programme-de-qualification-en-assurance-de-personnes' },
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
  { name: 'Sessions & Events', href: '#' },
  { name: 'News & Resources', href: '#' },
  { name: 'Enterprise Solutions', href: '#' },
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
      <h3 className="text-sm font-bold tracking-wider text-white mb-4">{title}</h3>
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
    <footer className="bg-[#2c3e50] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          <FooterSection title="SECURITIES" links={securitiesLinks} />
          <FooterSection title="INSURANCE" links={insuranceLinks} />
          <FooterSection title="FINANCIAL PLANNING" links={financialPlanningLinks} />
          <FooterSection title="DIGITAL ASSETS" links={digitalAssetsLinks} />

          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="grid grid-cols-2 gap-8">
              <FooterSection title="COMPANY" links={companyLinks} />
              <FooterSection title="LEGAL" links={legalLinks} />
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-600 pt-8 lg:ml-[60%]">
          <h3 className="text-sm font-bold tracking-wider text-white mb-4">JOIN OUR MAILING LIST</h3>
          <p className="text-sm text-gray-300 mb-4">Subscribe now for updates</p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-white text-gray-900 placeholder:text-gray-500 rounded-sm"
            />
            <Input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-white text-gray-900 placeholder:text-gray-500 rounded-sm"
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white text-gray-900 placeholder:text-gray-500 rounded-sm"
            />
            <Button
              type="submit"
              className="bg-[#e67e22] text-white hover:bg-[#d35400] rounded-sm"
            >
              Sign up
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-600 bg-[#1a252f] py-4">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-gray-400 sm:px-6 lg:px-8">
          <p>
            Copyright © 2026 Business Career College All rights reserved · RapidLMS, LearnerVerified, and the LearnerVerified double checkmark logo are trademarks of We Know Training.
          </p>
        </div>
      </div>
    </footer>
  )
}
