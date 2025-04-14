import './globals.css';

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
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
