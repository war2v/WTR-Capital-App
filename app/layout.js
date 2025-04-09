import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { Toaster } from "@/components/ui/toaster";


const inter = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ["400"]
});


export const metadata = {
  title: "WTR Capital",
  description: "A Sleek Property Management Solution",
  content: "width=device-width, intial-scale=1.0",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} antialiased 
              h-screen
              bg-slate-100`}>
          <Provider>
            <Toaster />
            {children}
          </Provider>
          
        </body>
      </html>
  );
}
