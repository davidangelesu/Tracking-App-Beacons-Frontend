import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme";

import authReducer from "./store/reducers/auth";
import snackbarReducer from "./store/reducers/snackbar";
import projectsReducer from "./store/reducers/projects";
import activeProjectReducer from "./store/reducers/activeProject";
import activeProjectBeaconsReducer from "./store/reducers/beacons";
import activeProjectModelReducer from "./store/reducers/models";
import activeProjectItemReducer from "./store/reducers/item";
import activeProjectTrackedUserReducer from "./store/reducers/trackedUsers";
import bimViewerReducer from "./store/reducers/bimViewer";
//*** setup Redux Store
//development settup
const composeEnhancers =
	process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
//reducers
const rootReducer = combineReducers({
	auth: authReducer,
	snackbar: snackbarReducer,
	projects: projectsReducer,
	activeProject: activeProjectReducer,
	activeProjectBeacons: activeProjectBeaconsReducer,
	bimViewer: bimViewerReducer,
	activeProjectModel: activeProjectModelReducer,
	activeProjectItem: activeProjectItemReducer,
	activeProjectTrackedUser: activeProjectTrackedUserReducer,
});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

//check if the Bimplus Environment Server value is valid
if (
	process.env.REACT_APP_BIMPLUS_ENVIRONMENT !== "stage" &&
	process.env.REACT_APP_BIMPLUS_ENVIRONMENT !== "dev" &&
	process.env.REACT_APP_BIMPLUS_ENVIRONMENT !== "prod"
) {
	throw new Error("REACT_APP_BIMPLUS_ENVIRONMENT  environment Variable is set to invalid value");
}

const app = (
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<App />
				</ThemeProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
