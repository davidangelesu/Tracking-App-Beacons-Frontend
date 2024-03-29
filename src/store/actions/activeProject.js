import * as actionTypes from "./actionTypes";
import axios from "../../axios-instance";
import {drawTrackedEntity} from './bimViewer'

const setActiveProjectStart = () => {
	return { type: actionTypes.SET_ACTIVE_PROJECT_START };
};

const setActiveProjectSuccess = (project) => {
	return {
		type: actionTypes.SET_ACTIVE_PROJECT_SUCCESS,
		activeProject: project,
	};
};

const setActiveProjectFail = (error) => {
	return {
		type: actionTypes.SET_ACTIVE_PROJECT_FAIL,
		error: error,
	};
};

export const clearActiveProject = () => {
	return {
		type: actionTypes.CLEAR_ACTIVE_PROJECT,
	};
};

export const setActiveProject = (projectId) => {
	return (dispatch, getState) => {
		dispatch(setActiveProjectStart());
		const header = { Authorization: "Bearer " + getState().auth.token };
		axios
			.get("projects/" + projectId, { headers: header })
			.then((res) => {
				dispatch(setActiveProjectSuccess(res.data.project));
			})
			.catch((err) => {
				dispatch(setActiveProjectFail(err.response.data));
			});
	};
};

export const setActiveProjetMode = (projectMode) => {
	return {
		type: actionTypes.SET_ACTIVE_PROJECT_MODE,
		mode: projectMode,
	};
};

export const startTrackingEntity = (id, entityType, x, y, z) => {
	return {
		type: actionTypes.START_TRACKING_ENTITY,
		id: id,
		entityType: entityType,
		coordinates: {
			x: x,
			y: y,
			z: z,
		},
	};
};

const updateTrackingEntityLocationAction = (id, x, y, z) => {
	return {
		type: actionTypes.UPDATE_TRACKING_ENTITY_LOCATION,
		id: id,
		coordinates: {
			x: x,
			y: y,
			z: z,
		},
	};
};

export const updateTrackingEntityLocation= (id, x, y, z) => {
	return (dispatch, getState) => {
		dispatch(updateTrackingEntityLocationAction(id, x, y, z));
		dispatch(drawTrackedEntity (id,x, y, z));
	}
}


export const stopTrackingEntity = (id) => {
	return {
		type: actionTypes.STOP_TRACKING_ENTITY,
		id: id,
	};
};
