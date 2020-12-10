import React, { useState, useEffect } from "react";
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
	// Recolectar parametro de la URL
	let { op } = useParams();

	// Manejo del "historial" del navegador para la navegacion entre vistas
	const history = useHistory();

	// constante donde se almacenan los estilos del CSS
	const brucss = quedelol();

	// Variable donde se almacena el costo proveniente del entrenamiento
	const [costo, setCosto] = useState([]);

	// Variable donde se almacenan las interaciones provenientes del entrenamiento
	const [iteraciones, setIteraciones] = useState([]);

	// Llamado cuando se entra a la vista para iniciar
	// el entrenamiento de la red neuronal correspondiente
	useEffect(() => {
		//Peticion tipo GET (op es el tipo de red neuronal, se puede ver en la URL de la pagina)
		axios
			.get(`http://localhost:5000/${op}`, {})
			.then((res) => {
				console.log(res.data);
				//Asignar la respuesta del servidor a las variables correspondientes
				setCosto(res.data.costs);
				setIteraciones(res.data.iterations);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// Preparar el formato del json para el metodo POST para predecir
	const [predecir, setPredecir] = useState({ input: "0,0" });

	// Variable que almacena la respuesta del servidor del metodo POST despues de predecir
	const [prediccion, setPrediccion] = useState("0");

	// Metodo para enviar la peticion POST al servidor para predecir
	const handlePrediccion = () => {
		//Peticion tipo POST
		axios
			.post(`http://localhost:5000/predecir`, {
				input: predecir.input.split(","),
			})
			.then((res) => {
				console.log(res.data);
				// Asignar la prediccion a la variable correspondiente
				setPrediccion(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Grid>
			{/* Barra superior */}
			<AppBar>
				<Toolbar>
					<Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
						Red Neuronal - {op}
					</Typography>
					<Button onClick={() => history.push("/")}>Volver</Button>
				</Toolbar>
			</AppBar>

			{/* Grafico */}
			<Grid className={brucss.grafico}>
				<Typography variant="h6" className={brucss.titulo}>
					Entrenamiento - {op}
				</Typography>
				<Chart costos={costo} iteraciones={iteraciones} />
			</Grid>

			{/* Grupo de inputs para predecir */}
			<Grid className={brucss.numeros}>
				{/* Input Data para la prediccion */}
				<TextField
					id="outlined-number"
					label="Input Data"
					type="text"
					InputLabelProps={{
						shrink: true,
					}}
					variant="outlined"
					value={predecir.input}
					onChange={(e) =>
						setPredecir({ ...predecir, input: e.target.value })
					}
				/>
				{/* Icono "igual" */}
				<DragHandleIcon
					style={{ color: indigo[300], marginTop: "10px" }}
					fontSize="large"
				/>
				{/* Output de la prediccion */}
				<TextField
					disabled
					id="outlined-number"
					label="Predicción"
					type="text"
					InputLabelProps={{
						shrink: true,
					}}
					variant="outlined"
					value={prediccion}
				/>
			</Grid>
			{/* Boton para enviar la solicitud para predecir */}
			<Grid style={{ textAlign: "center" }}>
				<IconButton style={{}} onClick={handlePrediccion}>
					<PlayArrowIcon style={{ color: indigo[300] }} fontSize="large" />
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
