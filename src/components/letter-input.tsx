import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type LetterInputProps = {
	letterCount: number | null;
	value: string;
	onChange: (value: string) => void;
	onSubmit: (value: string) => void;
	onActivateLetterCount?: () => void;
	disabled?: boolean;
};

export function LetterInput({
	letterCount,
	value,
	onChange,
	onSubmit,
	onActivateLetterCount,
	disabled,
}: LetterInputProps) {
	if (!letterCount) {
		return (
			<div className="space-y-4">
				<Button
					variant="ghost"
					onClick={onActivateLetterCount}
					disabled={disabled}
					className="w-fit text-center text-sepia-600 text-lg italic group">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-6 h-6 group-hover:text-green-500">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
						/>
					</svg>
					Revelar Cantidad de letras
				</Button>
				<div className="relative w-full">
					<Input
						type="text"
						value={value}
						onChange={(e) => onChange(e.target.value)}
						disabled={disabled}
						className="w-full font-crimson text-xl py-3 px-4 bg-parchment-50 border-2 border-sepia-300 focus:border-sepia-400 focus:ring-sepia-400 placeholder:text-sepia-400/50"
						placeholder="¿Qué personaje será...?"
					/>
					<Button
						variant="ghost"
						onClick={() => onSubmit(value)}
						disabled={disabled || !value}
						className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-sepia-600 hover:bg-sepia-700 text-parchment-50">
						Adivinar
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="flex gap-2 items-center justify-center">
				{Array.from({ length: letterCount }).map((_, index) => (
					<div
						key={index}
						className={cn(
							"w-8 h-12 border-b-2 border-primary flex items-center justify-center text-2xl font-bold"
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
			</div>
			<div className="flex justify-center">
				<Button
					onClick={() => onSubmit(value)}
					disabled={disabled || value.length !== letterCount}>
					Adivinar
				</Button>
			</div>
		</div>
	);
}
