import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	Label,
} from "recharts";

export default function Chart({ costos, iteraciones }) {
	// Tema de la pagina proveniente del framework MUI
	const theme = useTheme();

	// Recoleccion de datos provenientes del servidor para ser graficados
	const data = iteraciones.map((x, index) => {
		return { costo: costos[index], iteraciones: x };
	});

	// Retorno del HTML
	return (
		<React.Fragment>
			{/* Grafica con los datos del entrenamiento */}
			<LineChart
				width={800}
				height={400}
				data={data}
				margin={{
					top: 16,
					right: 16,
					bottom: 20,
					left: 24,
				}}
			>
				<XAxis dataKey='iteraciones' stroke={theme.palette.text.secondary}>
					<Label
						angle={0}
						position='bottom'
						style={{
							textAnchor: "middle",
							fill: theme.palette.text.primary,
						}}
					>
						Iteraciones
					</Label>
				</XAxis>
				<YAxis stroke={theme.palette.text.secondary}>
					<Label
						angle={270}
						position='left'
						style={{
							textAnchor: "middle",
							fill: theme.palette.text.primary,
						}}
					>
						Costo
					</Label>
				</YAxis>
				<Line type='monotone' dataKey='costo' stroke='#8884d8' />
				<CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
				<Tooltip />
			</LineChart>
		</React.Fragment>
	);
}
