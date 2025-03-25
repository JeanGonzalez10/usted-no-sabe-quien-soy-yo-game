"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
	return (
		<main className="min-h-screen bg-[url('/paper-texture.jpg')] bg-cover bg-center bg-no-repeat">
			<div className="absolute inset-0 bg-gradient-to-b from-[#faf9f6]/80 to-[#eae6e0]/90" />

			<div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center space-y-8">
					<h1 className="text-6xl font-bold text-[#723520] sm:text-7xl md:text-8xl font-crimson drop-shadow-lg">
						Descubre el Clásico
					</h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.3 }}
						className="text-2xl text-[#8c3d22] max-w-2xl mx-auto font-crimson italic">
						Sumérgete en el mundo de la literatura clásica y pon a prueba tus
						conocimientos.
					</motion.p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.6 }}
					className="mt-16">
					<Card className="backdrop-blur-sm bg-[#faf9f6]/30 border-[#eae6e0] shadow-lg">
						<CardHeader className="space-y-6 py-8">
							<CardTitle className="text-5xl text-center font-crimson text-[#723520]">
								¡Comienza la Aventura!
							</CardTitle>
							<CardDescription className="text-center text-xl text-[#8c3d22] font-crimson">
								¿Estás listo para descubrir los personajes de la literatura
								clásica?
							</CardDescription>
						</CardHeader>
						<CardContent className="flex justify-center pb-12">
							<Link href="/game">
								<Button className="group bg-[#723520] hover:bg-[#8c3d22] text-[#faf9f6] px-8 py-6 text-xl font-crimson shadow-md hover:shadow-xl transition-all duration-300 rounded-lg">
									<BookOpenIcon className="h-8 w-8 mr-3 transition-transform group-hover:scale-110" />
									<span>Jugar Ahora</span>
								</Button>
							</Link>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</main>
	);
}
