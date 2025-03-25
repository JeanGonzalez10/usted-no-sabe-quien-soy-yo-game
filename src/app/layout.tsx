import type { Metadata } from "next";
import { Crimson_Text } from "next/font/google";
import "./globals.css";

const crimsonText = Crimson_Text({
	subsets: ["latin"],
	weight: ["400", "600", "700"],
	variable: "--font-crimson",
});

export const metadata: Metadata = {
	title: "Descubre el Clásico",
	description:
		"Un juego de adivinanzas sobre personajes clásicos de la literatura",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es">
			<body className={crimsonText.className}>{children}</body>
		</html>
	);
}
