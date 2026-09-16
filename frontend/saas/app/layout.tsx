import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { SWRConfig } from 'swr';
import {PublicNav}  from '@/components/ui/nav'

export const metadata: Metadata = {
  title: 'Next.js SaaS Starter',
  description: 'Get started quickly with Next.js, Postgres, and Stripe.'
};

export const viewport: Viewport = {
  maximumScale: 1
};

const manrope = Manrope({ subsets: ['latin'] });

// 1. A mock component that reads the cached data using useSWR
function Profile() {
    const { data: user } = useSWR('/api/user');
    const { data: team } = useSWR('/api/team');

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>Test Profile Information</h2>
            <p><strong>User:</strong> {user}</p>
            <p><strong>Team:</strong> {team}</p>
        </div>
    );
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <body className="min-h-[100dvh] bg-gray-50">
      <PublicNav/>
      <SWRConfig
          
          value={{
              fallback: {
                  // We do NOT await here
                  // Only components that read this data will suspend
                  '/api/user': 'Yulia',
                  '/api/team': 'Dev'
              }
          }}
      >
          {children}
      </SWRConfig>
    
      </body>
    </html>
  );
}
