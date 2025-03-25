"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { characters } from "@/data/characters";
import { GameState, Hint } from "@/types/game";
import {
	ArrowLeftIcon,
	LightBulbIcon,
	CheckIcon,
	XMarkIcon,
	ArrowPathIcon,
} from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function Game() {
	const [windowSize, setWindowSize] = useState({
		width: typeof window !== "undefined" ? window.innerWidth : 0,
		height: typeof window !== "undefined" ? window.innerHeight : 0,
	});

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const [gameState, setGameState] = useState<GameState>({
		currentCharacter: characters[0],
		hints: characters[0].hints,
		attempts: [],
		gameStatus: "playing",
		revealedHints: [],
	});

	const handleGuess = (guess: string) => {
		const normalizedGuess = guess.toLowerCase().trim();
		const normalizedAnswer = gameState.currentCharacter.name
			.toLowerCase()
			.trim();

		if (normalizedGuess === normalizedAnswer) {
			setGameState((prev) => ({
				...prev,
				gameStatus: "won",
			}));
		} else {
			const newAttempts = [...gameState.attempts, guess];
			if (newAttempts.length >= 3) {
				setGameState((prev) => ({
					...prev,
					attempts: newAttempts,
					gameStatus: "lost",
				}));
			} else {
				setGameState((prev) => ({
					...prev,
					attempts: newAttempts,
				}));
			}
		}
	};

	const resetGame = () => {
		// Seleccionar un personaje aleatorio
		const randomIndex = Math.floor(Math.random() * characters.length);
		setGameState({
			currentCharacter: characters[randomIndex],
			hints: characters[randomIndex].hints,
			attempts: [],
			gameStatus: "playing",
			revealedHints: [],
		});
	};

	const revealNextHint = () => {
		if (gameState.revealedHints.length < gameState.hints.length) {
			setGameState((prev) => ({
				...prev,
				revealedHints: [
					...prev.revealedHints,
					prev.hints[prev.revealedHints.length],
				],
			}));
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const guess = formData.get("guess") as string;
		if (guess?.trim()) {
			handleGuess(guess);
			(e.target as HTMLFormElement).reset();
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			const guess = e.currentTarget.value;
			if (guess.trim()) {
				handleGuess(guess);
				e.currentTarget.value = "";
			}
			e.preventDefault();
		}
	};

	const remainingHints =
		gameState.hints.length - gameState.revealedHints.length;
	const isGameOver =
		gameState.gameStatus === "won" || gameState.gameStatus === "lost";

	// Calcular el porcentaje de revelación basado en la última pista revelada
	const currentRevealPercentage =
		gameState.revealedHints.length > 0
			? gameState.revealedHints[gameState.revealedHints.length - 1]
					.imageRevealPercentage
			: 0;

	const blurAmount = isGameOver ? 0 : 20 - (currentRevealPercentage / 100) * 20;

	return (
		<main className="min-h-screen bg-[url('/paper-texture.jpg')] bg-cover bg-center bg-no-repeat">
			<div className="absolute inset-0 bg-gradient-to-b from-parchment-50/90 to-parchment-100/90" />

			<div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="mb-12 flex justify-between items-center">
					<Link href="/">
						<Button variant="ghost" className="group text-xl">
							<ArrowLeftIcon className="h-6 w-6 mr-2 transition-transform group-hover:-translate-x-1" />
							Volver al Inicio
						</Button>
					</Link>
					<div className="text-sepia-700 text-xl font-semibold">
						Intentos: {gameState.attempts.length}/3
					</div>
				</div>

				<div className="space-y-12">
					<div>
						<h1 className="text-6xl font-bold text-ink-900 font-crimson text-center mb-6">
							Descubre el Personaje
						</h1>
						<Progress
							value={(gameState.attempts.length / 3) * 100}
							className="h-3 max-w-2xl mx-auto"
						/>
					</div>

					<div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
						<div className="space-y-8">
							<Card className="transform transition-all duration-300 hover:shadow-xl overflow-hidden">
								<div className="relative aspect-[16/9] w-full">
									<Image
										src={gameState.currentCharacter.imageUrl}
										alt="Personaje misterioso"
										fill
										className="object-cover transition-all duration-500"
										style={{
											filter: `blur(${blurAmount}px)`,
										}}
									/>
								</div>
							</Card>

							<Card className="transform transition-all duration-300 hover:shadow-xl">
								<CardContent className="pt-6">
									<form onSubmit={handleSubmit} className="flex gap-4">
										<Input
											type="text"
											name="guess"
											placeholder="Escribe tu respuesta..."
											onKeyPress={handleKeyPress}
											disabled={isGameOver}
											className="font-crimson text-xl py-6"
										/>
										<Button
											type="submit"
											disabled={isGameOver}
											className="bg-accent-primary hover:bg-accent-secondary text-xl px-8">
											<CheckIcon className="h-6 w-6 mr-2" />
											Comprobar
										</Button>
									</form>
								</CardContent>
							</Card>
						</div>

						<div className="space-y-8">
							<Card className="transform transition-all duration-300 hover:shadow-xl">
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-2xl">
										<LightBulbIcon className="h-8 w-8 text-accent-primary" />
										Pistas Reveladas
									</CardTitle>
								</CardHeader>
								<CardContent>
									{gameState.revealedHints.length > 0 ? (
										<ul className="space-y-4">
											{gameState.revealedHints.map(
												(hint: Hint, index: number) => (
													<li
														key={index}
														className="flex items-start gap-3 animate-fadeIn">
														<span className="mt-1 text-accent-primary text-xl">
															•
														</span>
														<span className="text-sepia-700 text-xl">
															{hint.text}
														</span>
													</li>
												)
											)}
										</ul>
									) : (
										<p className="text-sepia-500 italic text-center text-xl">
											¡Solicita tu primera pista para comenzar!
										</p>
									)}
									{remainingHints > 0 && !isGameOver && (
										<div className="mt-6 flex justify-center">
											<Button
												onClick={revealNextHint}
												className="group bg-accent-primary/10 hover:bg-accent-primary/20 text-lg">
												<LightBulbIcon className="h-6 w-6 mr-2 group-hover:text-yellow-500" />
												Revelar Nueva Pista ({remainingHints} restantes)
											</Button>
										</div>
									)}
								</CardContent>
							</Card>

							<Card className="transform transition-all duration-300 hover:shadow-xl">
								<CardHeader>
									<CardTitle className="text-2xl">
										Intentos Anteriores
									</CardTitle>
								</CardHeader>
								<CardContent>
									{gameState.attempts.length > 0 ? (
										<ul className="space-y-3">
											{gameState.attempts.map((attempt, index) => (
												<li
													key={index}
													className="flex items-center gap-2 text-sepia-700 animate-slideIn text-xl">
													<span className="text-accent-primary">•</span>
													{attempt}
												</li>
											))}
										</ul>
									) : (
										<p className="text-sepia-500 italic text-center text-xl">
											Aún no has realizado ningún intento
										</p>
									)}
								</CardContent>
							</Card>
						</div>
					</div>

					{isGameOver && (
						<Card
							className={`${
								gameState.gameStatus === "won"
									? "bg-accent-primary/10 border-accent-primary"
									: "bg-red-100 border-red-500"
							} transform transition-all duration-500 hover:shadow-2xl animate-fadeIn`}>
							<CardContent className="py-8">
								<div className="flex flex-col items-center text-center">
									{gameState.gameStatus === "won" ? (
										<>
											<CheckIcon className="h-16 w-16 text-accent-primary mb-6 animate-bounce" />
											<h2 className="text-4xl font-bold text-ink-900 mb-4">
												¡Felicidades!
											</h2>
											<p className="text-sepia-700 text-2xl mb-8">
												Has descubierto que el personaje es{" "}
												<span className="font-semibold text-accent-primary">
													{gameState.currentCharacter.name}
												</span>
											</p>
										</>
									) : (
										<>
											<XMarkIcon className="h-16 w-16 text-red-500 mb-6" />
											<h2 className="text-4xl font-bold text-ink-900 mb-4">
												¡Has agotado tus intentos!
											</h2>
											<p className="text-sepia-700 text-2xl mb-8">
												El personaje era{" "}
												<span className="font-semibold text-accent-primary">
													{gameState.currentCharacter.name}
												</span>
											</p>
										</>
									)}
									<Button
										onClick={resetGame}
										className="bg-accent-primary hover:bg-accent-secondary text-xl px-8 py-6">
										<ArrowPathIcon className="h-6 w-6 mr-2" />
										Jugar de Nuevo
									</Button>
								</div>
							</CardContent>
						</Card>
					)}
				</div>
			</div>

			{gameState.gameStatus === "won" && (
				<Confetti
					width={windowSize.width}
					height={windowSize.height}
					numberOfPieces={200}
					recycle={false}
				/>
			)}
		</main>
	);
}
