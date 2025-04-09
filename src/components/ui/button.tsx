import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-lg text-xl font-crimson transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default:
					"bg-sepia-600 text-parchment-50 hover:bg-sepia-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 hover:shadow-lg",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md",
				outline:
					"border border-sepia-200 bg-background hover:bg-sepia-100 hover:text-sepia-900 hover:border-sepia-300 transition-all duration-200 hover:shadow-sm",
				ghost:
					"bg-sepia-600 text-parchment-50 hover:bg-sepia-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",

				link: "text-primary underline-offset-4 hover:underline hover:text-primary-dark",
			},
			size: {
				default: "h-12 px-6 py-3",
				sm: "h-10 rounded-md px-4",
				lg: "h-14 rounded-lg px-8",
				icon: "h-12 w-12",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
