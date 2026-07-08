import type { Config } from "tailwindcss";
const config: Config = { content:["./app/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.{js,ts,jsx,tsx,mdx}"], theme:{extend:{colors:{ivory:"#FFFDF8",paper:"#FFF9F3",rose:"#E8B8C7",coral:"#F28C8C",lavender:"#DCCEF8",sage:"#AFC9B0",gold:"#C8A84E",ink:"#4E3B3B",muted:"#7A6A66"},fontFamily:{script:["var(--font-great-vibes)"],serif:["var(--font-cormorant)"],sans:["var(--font-poppins)"]},boxShadow:{soft:"0 20px 42px rgba(84,58,45,.08)",premium:"0 32px 60px rgba(78,59,59,.16)"}}},plugins:[]};
export default config;
