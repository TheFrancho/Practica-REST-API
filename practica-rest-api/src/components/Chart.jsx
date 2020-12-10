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

const X = [
	0,
	500,
	1000,
	1500,
	2000,
	2500,
	3000,
	3500,
	4000,
	4500,
	5000,
	5500,
	6000,
	6500,
	7000,
	7500,
	8000,
	8500,
	9000,
	9500,
];
const Y = [
	"0.6931460759491206",
	"0.6746644228509739",
	"0.6729723811706415",
	"0.6724913835431222",
	"0.6715470869022853",
	"0.6690658011000605",
	"0.6628056956757922",
	"0.6486363713830567",
	"0.6224177952395826",
	"0.5860504476698916",
	"0.5449765787755543",
	"0.5013712737111722",
	"0.46035330830993887",
	"0.42656041014317686",
	"0.4002567659325813",
	"0.3799617583313279",
	"0.3642290858421141",
	"0.35192082829919613",
	"0.3421200820960732",
	"0.33405161875846023",
];

// const data = [
// 	{ name: "1", value: 100 },
// 	{ name: "2", value: 200 },
// 	{ name: "3", value: 300 },
//     { name: "4", value: 400 },
// ];

export default function Chart({ costos, iteraciones }) {
	const theme = useTheme();
	const data = iteraciones.map((x, index) => {
		return { costo: costos[index], iteraciones: x };
	});
	return (
		<React.Fragment>
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
				<XAxis dataKey="iteraciones" stroke={theme.palette.text.secondary}>
					<Label
						angle={0}
						position="bottom"
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
						position="left"
						style={{
							textAnchor: "middle",
							fill: theme.palette.text.primary,
						}}
					>
						Costo
					</Label>
				</YAxis>
				<Line type="monotone" dataKey="costo" stroke="#8884d8" />
				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
				<Tooltip />
			</LineChart>
		</React.Fragment>
	);
}
