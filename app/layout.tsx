import '@/styles/globals.css';
import '@/styles/typeography.scss';
import styles from "@/styles/layout.module.scss";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
		<html lang="en">
			<body className={inter.className}>
				<noscript>
					<h1>Please enable JavaScript to view our site.</h1>
				</noscript>
				<div className={styles.layout}>
					<Header />
					<main className={styles.content}>{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
