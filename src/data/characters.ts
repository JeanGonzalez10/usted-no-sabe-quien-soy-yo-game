import { Character } from "@/types/character";

export const characters: Character[] = [
	{
		name: "Don Quijote",
		imageUrl: "/images/don-quijote.jpg",
		hints: [
			{
				text: "Soy un caballero andante que lucha contra molinos de viento.",
				imageRevealPercentage: 20,
			},
			{
				text: "Mi fiel escudero se llama Sancho Panza.",
				imageRevealPercentage: 40,
			},
			{
				text: "Mi amada se llama Dulcinea del Toboso.",
				imageRevealPercentage: 60,
			},
		],
	},
	{
		name: "Hamlet",
		imageUrl: "/images/hamlet.jpg",
		hints: [
			{
				text: "Soy el príncipe de Dinamarca.",
				imageRevealPercentage: 20,
			},
			{
				text: "Mi padre fue asesinado por mi tío.",
				imageRevealPercentage: 40,
			},
			{
				text: "Famosa es mi duda sobre ser o no ser.",
				imageRevealPercentage: 60,
			},
		],
	},
	{
		name: "Romeo y Julieta",
		imageUrl: "/images/romeo-y-julieta.jpg",
		hints: [
			{
				text: "Soy un joven de la familia Montesco.",
				imageRevealPercentage: 20,
			},
			{
				text: "Mi amor es de la familia Capuleto.",
				imageRevealPercentage: 40,
			},
			{
				text: "Mi historia termina en tragedia.",
				imageRevealPercentage: 60,
			},
		],
	},
];
