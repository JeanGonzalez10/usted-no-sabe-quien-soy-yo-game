import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Difficulty } from "@/types/game";

export function DifficultySelector({
	onSelect,
}: {
	onSelect: (difficulty: Difficulty) => void;
}) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
			{/* Fácil */}
			<Card className="transform transition-all duration-300 hover:shadow-xl cursor-pointer">
				<CardHeader className="p-4 md:p-6">
					<CardTitle className="text-xl md:text-2xl lg:text-3xl text-center text-sepia-800">
						Fácil
					</CardTitle>
					<CardDescription className="text-base md:text-lg lg:text-xl text-center">
						3 comodines disponibles
					</CardDescription>
				</CardHeader>
				<CardContent className="p-4 md:p-6">
					<div className="space-y-3 md:space-y-4">
						<ul className="space-y-2 md:space-y-4 text-sm md:text-base lg:text-xl">
							<li className="flex items-center gap-2">✓ Pistas</li>
							<li className="flex items-center gap-2">
								✓ Revelar cantidad de letras
							</li>
							<li className="flex items-center gap-2">
								✓ Revelar imagen parcialmente
							</li>
							<li className="flex items-center gap-2">✓ Revelar categoría</li>
						</ul>
						<Button
							onClick={() => onSelect("easy")}
							className="w-full text-sm md:text-base lg:text-xl"
							size="lg">
							Seleccionar
						</Button>
					</div>
				</CardContent>
			</Card>{" "}
			{/* Medio */}
			<Card className="transform transition-all duration-300 hover:shadow-xl cursor-pointer">
				<CardHeader className="p-4 md:p-6">
					<CardTitle className="text-xl md:text-2xl lg:text-3xl text-center text-sepia-800">
						Medio
					</CardTitle>
					<CardDescription className="text-base md:text-lg lg:text-xl text-center">
						2 comodines disponibles
					</CardDescription>
				</CardHeader>
				<CardContent className="p-4 md:p-6">
					<div className="space-y-3 md:space-y-4">
						<ul className="space-y-2 md:space-y-4 text-sm md:text-base lg:text-xl">
							<li className="flex items-center gap-2">✓ Pistas</li>
							<li className="flex items-center gap-2">
								✓ Revelar cantidad de letras
							</li>
							<li className="flex items-center gap-2">
								✓ Revelar imagen parcialmente
							</li>
							<li className="flex items-center gap-2">✓ Revelar categoría</li>
						</ul>
						<Button
							onClick={() => onSelect("medium")}
							className="w-full text-sm md:text-base lg:text-xl"
							size="lg">
							Seleccionar
						</Button>
					</div>
				</CardContent>
			</Card>{" "}
			{/* Difícil */}
			<Card className="transform transition-all duration-300 hover:shadow-xl cursor-pointer">
				<CardHeader className="p-4 md:p-6">
					<CardTitle className="text-xl md:text-2xl lg:text-3xl text-center text-sepia-800">
						Difícil
					</CardTitle>
					<CardDescription className="text-base md:text-lg lg:text-xl text-center">
						1 comodín disponible
					</CardDescription>
				</CardHeader>
				<CardContent className="p-4 md:p-6">
					<div className="space-y-3 md:space-y-4">
						<ul className="space-y-2 md:space-y-4 text-sm md:text-base lg:text-xl">
							<li className="flex items-center gap-2">✓ Pistas</li>
							<li className="flex items-center gap-2">
								✕ Revelar cantidad de letras
							</li>
							<li className="flex items-center gap-2">
								✓ Revelar imagen borrosa
							</li>
							<li className="flex items-center gap-2">✓ Revelar categoría</li>
						</ul>
						<Button
							onClick={() => onSelect("hard")}
							className="w-full text-sm md:text-base lg:text-xl"
							size="lg">
							Seleccionar
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
