import React, { useState } from "react";
import {
	AppBar,
	Button,
	Grid,
	IconButton,
	TextField,
	Toolbar,
	Typography,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import Chart from "./Chart";
import { makeStyles } from "@material-ui/core/styles";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import indigo from "@material-ui/core/colors/indigo";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import axios from "axios";

const Grafica = () => {
	let { op } = useParams();
	const history = useHistory();
	const brucss = quedelol();

	const [predecir, setPredecir] = useState({ tipo: op, input: 0 });
	const [prediccion, setPrediccion] = useState("0");
	const handlePrediccion = () => {
		axios
			.post(`http://localhost:5000/predecir`, predecir)
			.then((res) => {
				console.log(res.data);
				setPrediccion(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Grid>
			<AppBar>
				<Toolbar>
					<Typography variant='h6' noWrap style={{ flexGrow: 1 }}>
						Red Neuronal - {op}
					</Typography>
					<Button onClick={() => history.push("/")}>Volver</Button>
				</Toolbar>
			</AppBar>
			<Grid className={brucss.grafico}>
				<Typography variant='h6' className={brucss.titulo}>
					Entrenamiento - {op}
				</Typography>
				<Chart />
			</Grid>
			<Grid className={brucss.numeros}>
				<TextField
					id='outlined-number'
					label='Input Data'
					type='text'
					InputLabelProps={{
						shrink: true,
					}}
					variant='outlined'
					value={predecir.input}
					onChange={(e) => setPredecir({ ...predecir, input: e.target.value })}
				/>
				<DragHandleIcon
					style={{ color: indigo[300], marginTop: "10px" }}
					fontSize='large'
				/>
				<TextField
					disabled
					id='outlined-number'
					label='Predicción'
					type='text'
					InputLabelProps={{
						shrink: true,
					}}
					variant='outlined'
					value={prediccion}
				/>
			</Grid>
			<Grid style={{ textAlign: "center" }}>
				<IconButton style={{}} onClick={handlePrediccion}>
					<PlayArrowIcon style={{ color: indigo[300] }} fontSize='large' />
				</IconButton>
			</Grid>
		</Grid>
	);
};

const quedelol = makeStyles((theme) => ({
	grafico: {
		marginTop: "8%",
		textAlign: "-webkit-center",
	},
	titulo: {
		color: "#fff",
		fontSize: "50px",
		marginBottom: "10px",
	},
	numeros: {
		textAlign: "center",
		marginTop: "30px",
	},
	icono: {
		textAlign: "center",
	},
}));

export default Grafica;
