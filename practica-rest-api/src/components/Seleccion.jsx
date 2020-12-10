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
import axios from "axios";

function Seleccion() {
	const history = useHistory();

	const enviar = (e) => {
		history.push(`/grafica/${e.target.name}`);
		//history.push(`/${e.target.name}`);
		console.log(e.target.name);
	};

	const brucss = quedelol();

	useEffect(() => {}, []);
	return (
		<div className={brucss.principal}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6">
						Práctica REST-API - Red Neuronal
					</Typography>
				</Toolbar>
			</AppBar>
			<Grid className={brucss.grupoBotones}>
				<ButtonBase className={brucss.image} onClick={enviar}>
					<img className={brucss.img} alt="Or" src={or} name="OR" />
				</ButtonBase>
				<ButtonBase className={brucss.image} onClick={enviar}>
					<img className={brucss.img} alt="And" src={and} name="AND" />
				</ButtonBase>
				<ButtonBase className={brucss.image} onClick={enviar}>
					<img className={brucss.img} alt="Xor" src={xor} name="XOR" />
				</ButtonBase>
				<ButtonBase className={brucss.image} onClick={enviar}>
					<img className={brucss.img} alt="Suma" src={or} name="or" />
				</ButtonBase>
			</Grid>
		</div>
	);
}

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
