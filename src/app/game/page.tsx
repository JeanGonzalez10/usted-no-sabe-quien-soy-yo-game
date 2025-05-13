"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { characters } from "@/data/characters";
import { GameState, Difficulty, PowerUp } from "@/types/game";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { LetterInput } from "@/components/letter-input";
import { DifficultySelector } from "@/components/difficulty-selector";

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

	const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
	const [gameState, setGameState] = useState<GameState>({
		currentCharacter: null,
		gameStatus: "playing",
		attempts: 0,
		maxAttempts: 3,
		revealedHints: [],
		difficulty: "easy",
		powerUps: {
			category: false,
			letterCount: false,
			hints: 3,
			image: false,
		},
		remainingPowerUps: 0,
		letterCount: null,
		letterPositions: [],
	});
	const [inputValue, setInputValue] = useState("");
	const [isHovering, setIsHovering] = useState(false);

	const handleDifficultySelect = (selectedDifficulty: Difficulty) => {
		const powerUpsCount = {
			easy: 3,
			medium: 2,
			hard: 1,
		}[selectedDifficulty];

		setDifficulty(selectedDifficulty);
		setGameState((prev) => ({
			...prev,
			difficulty: selectedDifficulty,
			remainingPowerUps: powerUpsCount,
		}));
	};

	const selectRandomCharacter = () => {
		const randomIndex = Math.floor(Math.random() * characters.length);
		const character = characters[randomIndex];
		setGameState((prev) => ({
			...prev,
			currentCharacter: character,
			attempts: 0,
			revealedHints: [],
			gameStatus: "playing",
			letterCount: null,
			letterPositions: [],
		}));
	};

	const handlePowerUpUse = (powerUp: PowerUp) => {
		if (gameState.remainingPowerUps === 0) return;

		setGameState((prev) => {
			const newPowerUps = { ...prev.powerUps };
			switch (powerUp) {
				case "category":
					newPowerUps.category = true;
					break;
				case "letterCount":
					newPowerUps.letterCount = true;
					if (prev.currentCharacter) {
						prev.letterCount = prev.currentCharacter.name.length;
					}
					break;
				case "hints":
					newPowerUps.hints--;
					break;
				case "image":
					newPowerUps.image = true;
					break;
			}

			return {
				...prev,
				powerUps: newPowerUps,
				remainingPowerUps: prev.remainingPowerUps - 1,
			};
		});
	};

	const handleGuess = (guess: string) => {
		setInputValue(guess);
	};

	const handleSubmitGuess = (guess: string) => {
		if (!gameState.currentCharacter) return;

		const isCorrect =
			guess.toLowerCase() === gameState.currentCharacter.name.toLowerCase();

		if (isCorrect) {
			setGameState((prev) => ({
				...prev,
				gameStatus: "won",
			}));
		} else {
			setGameState((prev) => ({
				...prev,
				attempts: prev.attempts + 1,
				gameStatus: prev.attempts + 1 >= prev.maxAttempts ? "lost" : "playing",
			}));
		}
		setInputValue("");
	};

	const handleHint = () => {
		if (gameState.powerUps.hints === 0) return;

		setGameState((prev) => {
			const newRevealedHints = [...prev.revealedHints];
			const nextHintIndex = newRevealedHints.length;
			newRevealedHints.push(nextHintIndex);

			return {
				...prev,
				revealedHints: newRevealedHints,
				powerUps: {
					...prev.powerUps,
					hints: prev.powerUps.hints - 1,
				},
				remainingPowerUps: prev.remainingPowerUps - 1,
			};
		});
	};

	const resetGame = () => {
		setInputValue("");
		selectRandomCharacter();
		setGameState((prev) => ({
			...prev,
			gameStatus: "playing",
			attempts: 0,
			revealedHints: [],
			powerUps: {
				category: false,
				letterCount: false,
				hints: 3,
				image: false,
			},
			remainingPowerUps: {
				easy: 3,
				medium: 2,
				hard: 1,
			}[prev.difficulty],
			letterCount: null,
			letterPositions: [],
		}));
	};

	const getBlurAmount = () => {
		if (!gameState.powerUps.image || !gameState.currentCharacter) return 0;

		const baseBlur = {
			easy: 5,
			medium: 10,
			hard: 35,
		}[difficulty ?? "easy"];

		return baseBlur;
	};

	const blurAmount = getBlurAmount();

	if (!difficulty) {
		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">
					Selecciona la dificultad
				</h1>
				<DifficultySelector onSelect={handleDifficultySelect} />
			</div>
		);
	}

	if (!gameState.currentCharacter) {
		selectRandomCharacter();
		return null;
	}

	return (
		<main className="min-h-screen bg-[url('/paper-texture.jpg')] bg-cover bg-center bg-no-repeat pb-24">
			<div className="absolute inset-0 bg-gradient-to-b from-parchment-50/90 to-parchment-100/90" />

			<div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-12 flex flex-wrap justify-between items-center gap-4">
					<Link href="/">
						<Button className="group text-sm md:text-xl">
							<ArrowLeftIcon className="h-5 w-5 md:h-6 md:w-6 mr-1 md:mr-2 transition-transform group-hover:-translate-x-1" />
							<span className="truncate">Volver al Inicio</span>
						</Button>
					</Link>
				</div>

				<div className="space-y-8 md:space-y-12">
					<div>
						<h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-ink-900 font-crimson text-center mb-4 md:mb-6">
							¿Usted no sabe quién soy yo?
						</h1>
					</div>

					{/* Espacio para el juego */}
					<div className="grid gap-6 md:gap-8 lg:grid-cols-[2fr,1fr]">
						<div className="space-y-6 md:space-y-8">
							<Card className="transform transition-all duration-300 hover:shadow-xl">
								<CardContent className="pt-6">
									{/* Espacio para la categoría */}
									<div className="space-y-4 mt-4">
										<div
											className={`rounded-lg ${
												gameState.powerUps.category
													? "bg-primary/10 p-4 md:p-6"
													: ""
											}`}>
											{gameState.powerUps.category ? (
												<p className="text-base md:text-xl overflow-hidden text-ellipsis">
													Categoría: {gameState.currentCharacter?.category}
												</p>
											) : (
												<Button
													className="w-full md:w-fit text-left text-sepia-800 p-2 md:p-4 rounded-lg flex items-center gap-2 italic group text-sm md:text-base"
													variant="ghost"
													onClick={() => handlePowerUpUse("category")}
													disabled={
														gameState.powerUps.category ||
														gameState.remainingPowerUps === 0
													}>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth="1.5"
														stroke="currentColor"
														className="w-5 h-5 md:w-6 md:h-6 group-hover:text-blue-500 flex-shrink-0">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
														/>
													</svg>
													<span className="truncate">Revelar categoría</span>
												</Button>
											)}
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Espacio para la imagen */}
							<Card
								className="transform transition-all duration-300 hover:shadow-xl overflow-hidden relative group cursor-pointer w-full"
								onClick={() =>
									!gameState.powerUps.image && handlePowerUpUse("image")
								}
								onMouseEnter={() => setIsHovering(true)}
								onMouseLeave={() => setIsHovering(false)}>
								<div className="relative aspect-[16/9] w-full">
									<Image
										src={
											gameState.powerUps.image
												? gameState.currentCharacter.imageUrl
												: "/images/guess.png"
										}
										alt="Personaje misterioso"
										fill
										sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
										className={`object-contain bg-black ${
											!gameState.powerUps.image && "group-hover:opacity-75"
										}`}
										style={{
											filter: gameState.powerUps.image
												? `blur(${blurAmount}px)`
												: "none",
											maxHeight: "100%",
											width: "100%",
										}}
									/>
									{!gameState.powerUps.image && isHovering && (
										<div className="absolute inset-0 flex items-center justify-center">
											<span className="bg-black/50 text-white px-4 py-2 rounded-lg text-lg font-medium">
												Revelar imagen
											</span>
										</div>
									)}
								</div>
							</Card>

							{/* Espacio para el input de letras */}
							<Card className="transform transition-all duration-300 hover:shadow-xl">
								<CardContent className="pt-6">
									<div className="space-y-4">
										<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
											<div className="flex flex-wrap items-center gap-2 sm:gap-4">
												{gameState.powerUps.letterCount && (
													<span className="text-sm sm:text-base md:text-xl font-semibold text-primary-700 w-full sm:w-auto overflow-hidden text-ellipsis">
														Cantidad de letras:{" "}
														{gameState.currentCharacter.name.length} letras
													</span>
												)}
												{!gameState.powerUps.letterCount && (
													<Button
														variant="ghost"
														onClick={() => handlePowerUpUse("letterCount")}
														disabled={
															gameState.remainingPowerUps === 0 ||
															difficulty === "hard"
														}
														className="w-full sm:w-fit text-left text-sepia-800 p-2 sm:p-4 rounded-lg flex items-center gap-2 italic group text-xs sm:text-sm md:text-base">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth="1.5"
															stroke="currentColor"
															className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:text-green-500 flex-shrink-0">
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
															/>
														</svg>
														<span className="truncate">
															Revelar cantidad de letras
														</span>
													</Button>
												)}
											</div>
											<div className="flex items-center gap-2 ml-auto">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-5 h-5 md:w-6 md:h-6 text-red-500">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
													/>
												</svg>
												<span className="text-sm sm:text-base md:text-xl font-semibold text-red-500">
													{gameState.attempts}/{gameState.maxAttempts} intentos
												</span>
											</div>
										</div>

										<LetterInput
											letterCount={gameState.letterCount}
											value={inputValue}
											onChange={handleGuess}
											onSubmit={handleSubmitGuess}
											disabled={gameState.gameStatus !== "playing"}
										/>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Espacio para las pistas */}
						<div className="space-y-6 md:space-y-8">
							<Card className="transform transition-all duration-300 hover:shadow-xl">
								<CardHeader className="p-4 sm:p-6">
									<CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-sepia-800 flex items-center gap-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-5 h-5 md:w-6 md:h-6 transition-colors group-hover:text-yellow-500 flex-shrink-0">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
											/>
										</svg>
										<span className="truncate">Pistas Reveladas</span>
									</CardTitle>
								</CardHeader>
								<CardContent className="p-4 sm:p-6">
									<div className="space-y-4">
										{/* Mostrar las pistas reveladas */}
										{gameState.currentCharacter &&
											gameState.revealedHints.map((hintIndex) => (
												<div
													key={hintIndex}
													className="p-3 md:p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-start gap-2 overflow-hidden">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth="1.5"
														stroke="currentColor"
														className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 mt-0.5">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
														/>
													</svg>
													<p className="text-sepia-800 text-sm md:text-base break-words">
														{gameState.currentCharacter!.hints[hintIndex].text}
													</p>
												</div>
											))}{" "}
										{/* Botón para revelar la siguiente pista */}
										{gameState.currentCharacter &&
											gameState.revealedHints.length <
												gameState.currentCharacter.hints.length && (
												<Button
													variant="ghost"
													className="w-full text-left text-sepia-800 p-3 md:p-4 rounded-lg flex items-center gap-2 italic group text-sm md:text-base"
													onClick={handleHint}
													disabled={
														gameState.powerUps.hints === 0 ||
														gameState.remainingPowerUps === 0
													}>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth="1.5"
														stroke="currentColor"
														className="w-5 h-5 md:w-6 md:h-6 transition-colors group-hover:text-yellow-500 flex-shrink-0">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
														/>
													</svg>
													<span className="truncate">
														Revelar Nueva Pista ({gameState.powerUps.hints}{" "}
														restantes)
													</span>
												</Button>
											)}
									</div>
								</CardContent>
							</Card>

							{/* Espacio para los usados comodines */}
							<Card className="transform transition-all duration-300 hover:shadow-xl">
								<CardHeader className="p-4 sm:p-6">
									<CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-sepia-800">
										<span className="truncate">Comodines Usados</span>
									</CardTitle>
								</CardHeader>
								<CardContent className="p-4 sm:p-6">
									<div className="space-y-4">
										<p className="text-sm md:text-xl">
											Comodines restantes: {gameState.remainingPowerUps}
										</p>
										{Object.entries(gameState.powerUps)
											.filter(([key, value]) => {
												if (key === "hints") {
													return typeof value === "number" && value < 3;
												}
												return value === true;
											})
											.map(([usedPowerUp, value]) => {
												if (usedPowerUp === "hints") {
													const hintsUsed = 3 - (value as number);
													return Array.from({ length: hintsUsed }).map(
														(_, index) => (
															<div
																key={`hint-${index}`}
																className="p-3 md:p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-center gap-2">
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	fill="none"
																	viewBox="0 0 24 24"
																	strokeWidth="1.5"
																	stroke="currentColor"
																	className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 flex-shrink-0">
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
																	/>
																</svg>
																<span className="text-sm md:text-base">
																	Pista {index + 1} revelada
																</span>
															</div>
														)
													);
												}

												return (
													<div
														key={usedPowerUp}
														className="p-3 md:p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-center gap-2">
														{usedPowerUp === "category" && (
															<>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	fill="none"
																	viewBox="0 0 24 24"
																	strokeWidth="1.5"
																	stroke="currentColor"
																	className="w-5 h-5 md:w-6 md:h-6 text-blue-500 flex-shrink-0">
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
																	/>
																</svg>
																<span className="text-sm md:text-base">
																	Categoría revelada
																</span>
															</>
														)}
														{usedPowerUp === "letterCount" && (
															<>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	fill="none"
																	viewBox="0 0 24 24"
																	strokeWidth="1.5"
																	stroke="currentColor"
																	className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0">
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
																	/>
																</svg>
																<span className="text-sm md:text-base">
																	Cantidad de letras revelada
																</span>
															</>
														)}
														{usedPowerUp === "image" && (
															<>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	fill="none"
																	viewBox="0 0 24 24"
																	strokeWidth="1.5"
																	stroke="currentColor"
																	className="w-5 h-5 md:w-6 md:h-6 text-purple-500 flex-shrink-0">
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
																	/>
																</svg>
																<span className="text-sm md:text-base">
																	Imagen revelada
																</span>
															</>
														)}
													</div>
												);
											})}
									</div>
								</CardContent>
							</Card>

							{gameState.gameStatus !== "playing" && (
								<Card className="transform transition-all duration-300 hover:shadow-xl bg-primary/10">
									<CardContent className="py-6 md:py-8">
										<div className="space-y-3 md:space-y-4">
											<div className="text-center space-y-3 md:space-y-4">
												<h2 className="text-xl sm:text-2xl font-bold">
													{gameState.gameStatus === "won"
														? "¡Felicidades! Has ganado"
														: "¡Game Over!"}
												</h2>
												<p className="text-sm sm:text-base md:text-xl">
													El personaje era: {gameState.currentCharacter.name}
												</p>
												<Button
													onClick={resetGame}
													className="text-sm md:text-base">
													Jugar de nuevo
												</Button>
											</div>
										</div>
									</CardContent>
								</Card>
							)}
						</div>
					</div>
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
