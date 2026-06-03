import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import '../lib/amplify'

export const metadata: Metadata = {
  title: 'IPHALL — AI-Powered Patent & IP Platform',
  description:
    'IPHALL is an AI platform for the full patent lifecycle: drafting, office action responses, novelty search, validity, freedom-to-operate (FTO), translation, and diagram generation. Built by Pintas IP Group.',
  keywords: [
    'patent AI',
    'patent drafting',
    'freedom to operate',
    'FTO analysis',
    'patent search',
    'validity analysis',
    'office action',
    'patent translation',
    'intellectual property',
    'Pintas IP',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
