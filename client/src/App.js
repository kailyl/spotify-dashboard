import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";
import Homepage from "./components/Homepage"; 
import ScrollToTop from "./components/ScrollToTop"
import "./App.css";

function App() {
	return (
		<>
			<Router>
				<ScrollToTop />
				<Routes>
					<Route exact path="/"
						element={<Homepage />} />
 				</Routes>
			</Router>
		</>
	);
}

export default App;