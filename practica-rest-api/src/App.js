import React from "react";
import Seleccion from "./components/Seleccion";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Grafica from "./components/Grafica";

function App() {
	return (
		// Navegacion entre vistas
		<Router>
			<Route exact path='/'>
				<Seleccion />
			</Route>
			<Route path='/grafica/:op'>
				<Grafica />
			</Route>
		</Router>
	);
}

export default App;
