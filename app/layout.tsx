import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
    title: 'Sanjivani FC | Official Football Team',
    description: 'Official website of Sanjivani University Football Team — Home of the Blue & Gold. Follow our squad, matches, and more.',
    keywords: 'Sanjivani University, football, soccer, Maharashtra, university sports, SUGFC',
    openGraph: {
        title: 'Sanjivani FC | Official Football Team',
        description: 'Home of the Blue & Gold — Sanjivani University Football Club.',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </head>
            <body className="antialiased font-sans bg-slate-50 text-slate-800 flex flex-col min-h-screen">
                <Header />
                <main className="min-h-screen pt-16">
                    <PageTransition>{children}</PageTransition>
                </main>
                <Footer />
            </body>
        </html>
    )
}
