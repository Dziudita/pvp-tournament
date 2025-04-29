import './globals.css';
import Footer from '@/components/Footer'; // būtinai importuok

export const metadata = {
  title: 'Cherzi',
  description: 'Compete daily and win USDC + exclusive rewards.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex flex-col">
        <main className="flex-grow">
          {children}
        </main>
        <Footer /> {/* Footer čia, visada puslapio apačioje */}
      </body>
    </html>
  );
}
