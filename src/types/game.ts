export type Hint = {
	text: string;
	imageRevealPercentage: number;
};

export type GameState = {
	currentCharacter: {
		name: string;
		hints: Hint[];
		imageUrl: string;
	};
	hints: Hint[];
	attempts: string[];
	gameStatus: "playing" | "won" | "lost";
	revealedHints: Hint[];
};
