import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata={title:{default:'SOPIE — Discover Your Elegance',template:'%s | SOPIE'},description:'Discover elegant, modest women’s fashion at SOPIE in Jigjiga, Ethiopia. Explore abayas, dresses, occasion wear and hijabs.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
