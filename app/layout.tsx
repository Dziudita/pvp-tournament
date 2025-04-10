export const metadata = {
  title: 'Daily PvP Tournament',
  description: 'Compete daily and win USDC + exclusive rewards.',
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

