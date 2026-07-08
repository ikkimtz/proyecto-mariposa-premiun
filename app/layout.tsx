import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Poppins } from "next/font/google";
import "./globals.css";
const greatVibes=Great_Vibes({subsets:["latin"],weight:"400",variable:"--font-great-vibes"});
const cormorant=Cormorant_Garamond({subsets:["latin"],weight:["400","500","600","700"],variable:"--font-cormorant"});
const poppins=Poppins({subsets:["latin"],weight:["300","400","500","600"],variable:"--font-poppins"});
export const metadata: Metadata={title:"Cumpleaños Inolvidable | Jessica & Claudia",description:"Invitación digital al cumpleaños de Jessica y Claudia.",openGraph:{title:"Cumpleaños Inolvidable | Jessica & Claudia",description:"Te invitamos a celebrar el cumpleaños de Jessica y Claudia.",type:"website"}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="es"><body className={`${greatVibes.variable} ${cormorant.variable} ${poppins.variable}`}>{children}</body></html>}
