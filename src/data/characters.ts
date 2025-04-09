import { Character } from "@/types/game";

export const characters: Character[] = [
	{
		id: "don-quijote",
		name: "Don Quijote",
		category: "Novela de caballerías",
		hints: [
			{
				id: "hint-1",
				text: "Soy un caballero andante que lucha contra molinos de viento",
				imageRevealPercentage: 33,
			},
			{
				id: "hint-2",
				text: "Mi escudero se llama Sancho Panza",
				imageRevealPercentage: 66,
			},
			{
				id: "hint-3",
				text: "Mi nombre completo es Alonso Quijano",
				imageRevealPercentage: 100,
			},
		],
		imageUrl: "/images/don-quijote.jpg",
	},
	{
		id: "hamlet",
		name: "Hamlet",
		category: "Tragedia",
		hints: [
			{
				id: "hint-1",
				text: "Soy un príncipe de Dinamarca que busca venganza",
				imageRevealPercentage: 33,
			},
			{
				id: "hint-2",
				text: "Mi padre fue asesinado por mi tío, quien se casó con mi madre",
				imageRevealPercentage: 66,
			},
			{
				id: "hint-3",
				text: "Mi famosa frase es 'Ser o no ser, esa es la cuestión'",
				imageRevealPercentage: 100,
			},
		],
		imageUrl: "/images/hamlet.jpg",
	},
	{
		id: "romeo",
		name: "Romeo",
		category: "Tragedia romántica",
		hints: [
			{
				id: "hint-1",
				text: "Soy un joven de Verona que se enamora perdidamente",
				imageRevealPercentage: 33,
			},
			{
				id: "hint-2",
				text: "Mi amada pertenece a una familia enemiga de la mía",
				imageRevealPercentage: 66,
			},
			{
				id: "hint-3",
				text: "Mi historia termina en una tragedia junto a mi amada Julieta",
				imageRevealPercentage: 100,
			},
		],
		imageUrl: "/images/romeo.jpg",
	},
];
