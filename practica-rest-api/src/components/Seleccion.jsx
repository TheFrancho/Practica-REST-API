import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { ButtonBase, Grid, Paper } from "@material-ui/core";
import or from "./images/or.png";
import and from "./images/and.png";
import xor from "./images/xor.png";
import { useHistory } from "react-router-dom";

function Seleccion() {
	// Metodo para manejar el "historial" del navegador y asi navegar entre vistas
	const history = useHistory();

	// Metodo para pasar de una vista a otra dependiendo del boton que es clickeado
	const enviar = (e) => {
		history.push(`/grafica/${e.target.name}`);
		//history.push(`/${e.target.name}`);
		console.log(e.target.name);
	};

	// Constante de estilos de CSS
	const brucss = quedelol();

	// Retornar HTML
	return (
		<div className={brucss.principal}>
			{/* Barra superior donde esta el titulo de la pagina */}
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6'>Práctica REST-API - Red Neuronal</Typography>
				</Toolbar>
			</AppBar>

			{/* Grupo de botones representando cada red neuronal */}
			<Grid className={brucss.grupoBotones}>
				{/* Red Neuronal para OR */}
				<ButtonBase className={brucss.image} onClick={enviar}>
					<img className={brucss.img} alt='Or' src={or} name='OR' />
				</ButtonBase>

				{/* Red Neuronal para AND */}
				<ButtonBase className={brucss.image} onClick={enviar}>
					<img className={brucss.img} alt='And' src={and} name='AND' />
				</ButtonBase>

				{/* Red Neuronal para XOR */}
				<ButtonBase className={brucss.image} onClick={enviar}>
					<img className={brucss.img} alt='Xor' src={xor} name='XOR' />
				</ButtonBase>

				{/* Red Neuronal para la suma de numeros */}
				<ButtonBase className={brucss.image} onClick={enviar}>
					<img className={brucss.img} alt='Suma' src={or} name='or' />
				</ButtonBase>
			</Grid>
		</div>
	);
}

// Estilos de CSS
const quedelol = makeStyles((theme) => ({
	principal: {
		backgroundColor: theme.palette.secondary,
	},
	grupoBotones: {
		textAlign: "center",
		marginTop: "50px",
	},
	image: {
		margin: "30px",
	},
}));

export default Seleccion;
