import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Flipkart Clone | Online Shopping platform",
    description: "Experience the best online shopping with Flipkart clone.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <CartProvider>
                    {children}
                </CartProvider>
            </body>
        </html>
    );
}
