import type React from 'react'
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

const geist = Geist({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-geist'
})

export const metadata: Metadata = {
	title: 'Jorge Mena - Senior Software Engineer',
	description:
		'Senior Software Engineer specializing in AI, Next.js, Convex, and full-stack development. Building large-scale software with modern technologies.',
	generator: 'v0.app'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className={`${geist.variable} dark`}>
			<body className='font-sans antialiased'>
				{children}
				<Analytics />
			</body>
		</html>
	)
}
