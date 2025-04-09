import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { PowerUp, PowerUpState } from "@/types/game";

type PowerUpsProps = {
	powerUps: PowerUpState;
	remainingPowerUps: number;
	onUsePowerUp: (powerUp: PowerUp) => void;
	difficulty: "easy" | "medium" | "hard";
};

export function PowerUps({
	powerUps,
	remainingPowerUps,
	onUsePowerUp,
	difficulty,
}: PowerUpsProps) {
	return (
		<Card className="transform transition-all duration-300 hover:shadow-xl">
			<CardHeader>
				<CardTitle className="text-3xl font-bold text-sepia-800">
					Power-Ups ({remainingPowerUps} restantes)
				</CardTitle>
				<CardDescription className="text-xl">
					Tienes {remainingPowerUps} power-ups disponibles para usar
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					{/* Image Power-Up */}
					<div
						className={`p-6 rounded-lg ${
							powerUps.image ? "bg-primary/10" : "bg-gray-100"
						}`}>
						{powerUps.image ? (
							<p className="text-xl">Imagen revelada</p>
						) : (
							<Button
								variant="ghost"
								className="w-full text-left text-xl"
								onClick={() => onUsePowerUp("image")}
								disabled={powerUps.image || remainingPowerUps === 0}>
								Revelar imagen
							</Button>
						)}
					</div>

					{/* Category Power-Up */}
					<div
						className={`p-6 rounded-lg ${
							powerUps.category ? "bg-primary/10" : "bg-gray-100"
						}`}>
						{powerUps.category ? (
							<p className="text-xl">Categoría revelada</p>
						) : (
							<Button
								variant="ghost"
								className="w-full text-left text-xl"
								onClick={() => onUsePowerUp("category")}
								disabled={powerUps.category || remainingPowerUps === 0}>
								Revelar categoría
							</Button>
						)}
					</div>

					{/* Letter Count Power-Up */}
					{difficulty !== "hard" && (
						<div
							className={`p-6 rounded-lg ${
								powerUps.letterCount ? "bg-primary/10" : "bg-gray-100"
							}`}>
							{powerUps.letterCount ? (
								<p className="text-xl">Cantidad de letras revelada</p>
							) : (
								<Button
									variant="ghost"
									className="w-full text-left text-xl"
									onClick={() => onUsePowerUp("letterCount")}
									disabled={powerUps.letterCount || remainingPowerUps === 0}>
									Revelar cantidad de letras
								</Button>
							)}
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
