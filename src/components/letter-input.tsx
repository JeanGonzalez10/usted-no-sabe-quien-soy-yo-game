import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type LetterInputProps = {
	letterCount: number | null;
	value: string;
	onChange: (value: string) => void;
	onSubmit: (value: string) => void;
	disabled?: boolean;
};

export function LetterInput({
	letterCount,
	value,
	onChange,
	onSubmit,
	disabled,
}: LetterInputProps) {
	if (!letterCount) {
		return (
			<div className="relative w-full">
				<Input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					disabled={disabled}
					className="w-full font-crimson text-base sm:text-lg md:text-xl py-2 sm:py-3 px-3 sm:px-4 bg-parchment-50 border-2 border-sepia-300 focus:border-sepia-400 focus:ring-sepia-400 placeholder:text-sepia-400/50"
					placeholder="¿Qué personaje será...?"
				/>
				<Button
					variant="ghost"
					onClick={() => onSubmit(value)}
					disabled={disabled || !value}
					className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-sepia-600 hover:bg-sepia-700 text-parchment-50 text-xs sm:text-sm md:text-base px-2 sm:px-3">
					Adivinar
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-3 md:space-y-4">
			<div className="flex flex-wrap gap-1 sm:gap-2 items-center justify-center">
				{Array.from({ length: letterCount }).map((_, index) => (
					<div
						key={index}
						className={cn(
							"w-6 sm:w-7 md:w-8 h-9 sm:h-10 md:h-12 border-b-2 border-primary flex items-center justify-center text-base sm:text-xl md:text-2xl font-bold"
						)}>
						<input
							type="text"
							value={value[index] || ""}
							onChange={(e) => {
								const newValue = value.split("");
								newValue[index] = e.target.value.toUpperCase();
								const nextInput =
									e.target.parentElement?.nextElementSibling?.querySelector(
										"input"
									);
								if (e.target.value && nextInput) {
									nextInput.focus();
								}
								onChange(newValue.join("").slice(0, letterCount));
							}}
							onKeyDown={(e) => {
								if (e.key === "Backspace" && !value[index]) {
									const prevInput =
										e.currentTarget.parentElement?.previousElementSibling?.querySelector(
											"input"
										);
									if (prevInput) {
										prevInput.focus();
									}
								}
							}}
							disabled={disabled}
							className="w-full h-full text-center bg-transparent border-none focus:ring-0 focus:outline-none"
							maxLength={1}
						/>
					</div>
				))}
			</div>{" "}
			<div className="flex justify-center">
				<Button
					onClick={() => onSubmit(value)}
					disabled={disabled || value.length !== letterCount}
					className="text-sm sm:text-base">
					Adivinar
				</Button>
			</div>
		</div>
	);
}
