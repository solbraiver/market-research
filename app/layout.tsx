import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Market Research Analyst AI',
  description: 'AI-powered market research analyst and concept designer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-900 text-gray-100">{children}</body>
    </html>
  )
}
