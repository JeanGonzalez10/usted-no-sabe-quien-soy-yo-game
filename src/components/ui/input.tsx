import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"flex h-10 w-full rounded-lg border-2 border-sepia-300 bg-parchment-50 px-3 py-2 text-sm text-ink-900 placeholder:text-sepia-400 focus:outline-none focus:ring-2 focus:ring-accent-primary disabled:cursor-not-allowed disabled:opacity-50 font-crimson shadow-vintage-sm",
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = "Input";

export { Input };
