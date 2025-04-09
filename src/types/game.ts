export type Difficulty = "easy" | "medium" | "hard";

export type PowerUp = "category" | "letterCount" | "hints" | "image";

export type PowerUpState = {
	category: boolean;
	letterCount: boolean;
	hints: number;
	image: boolean;
};

export type GameState = {
	currentCharacter: Character | null;
	gameStatus: "playing" | "won" | "lost";
	attempts: number;
	maxAttempts: number;
	revealedHints: number[];
	difficulty: Difficulty;
	powerUps: PowerUpState;
	remainingPowerUps: number;
	letterCount: number | null;
	letterPositions: boolean[];
};

export type Character = {
	id: string;
	name: string;
	category: string;
	hints: Hint[];
	imageUrl: string;
};

export type Hint = {
	id: string;
	text: string;
	imageRevealPercentage: number;
};
