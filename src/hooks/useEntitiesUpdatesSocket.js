import io from "socket.io-client";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import usePrevious from "./usePrevious";
import * as actions from "../store/actions/index";

//Socket.io Server URL 
const ENDPOINT = process.env.REACT_APP_SOCKET_SERVER_URL;

/**
 * Updates the socket connection and subscribes to the update of the tracked entities
 * in trackedEntities not found in previousTrackedEntities Object.
 * @param {Socket} socket  Socket to socket.io Server 
 * @param {Object} trackedEntities Object with the tracked Entities 
 * @param {Object} previousTrackedEntities Object with the previous tracked Entities 
 * @param {String} projectId  Id of project
 */
const updateSocketRooms = (socket, trackedEntities, previousTrackedEntities, projectId) => {
	//initial hash table with tracked entities where added
	let newTrackedEntities = { ...trackedEntities };
	//initia hash table with tracked entities that where deleted
	let erasedTrackedEntities = { ...previousTrackedEntities };
	//compare the difference between both objects after first push
	if (previousTrackedEntities !== undefined) {
		for (let id in trackedEntities) {
			if (previousTrackedEntities[id]) {
				delete newTrackedEntities[id];
				delete erasedTrackedEntities[id];
			}
		}
	}
	//Join Room for updates regarding new entities
	for (let id in newTrackedEntities) {
		socket.emit("join", projectId, id);
		console.log("JOINING.....", id);
	}
	//erase event listeners to Entities
	for (let id in erasedTrackedEntities) {
		socket.emit("leave", projectId, id);
	}
};

/**
 * Custom Hook that Sets the socket connection and the subscriptions to the tracked Entities.
 */
const useEntitiesUpdatesSocket = () => {
	const activeProject = useSelector((state) => state.activeProject.activeProject);
	const trackedEntities = useSelector((state) => state.activeProject.trackedEntities);
	const previousTrackedEntities = usePrevious(trackedEntities);
	const [socket, setSocket] = useState(null);
	const dispatch = useDispatch();
	const updateEntityLocation = useCallback(
		(id, x, y, z) => dispatch(actions.updateTrackingEntityLocation(id, x, y, z)),
		[dispatch]
	);
	
	//setup Socket connection
	useEffect(() => {
		if (activeProject && !socket) {
			console.log("Active Project:");
			console.log(activeProject);
			//create Socket
			let tempSocket = io(ENDPOINT, { transports: ["websocket", "polling", "flashsocket"] }); //{ transports: ["websocket", "polling", "flashsocket"] }
			//Add the listener for new changes of location of entity
			tempSocket.on("entity-new-location", (entityId, location) => {
				const { x, y, z } = location;
				console.log("Updating location of ", entityId);
				updateEntityLocation(entityId, x, y, z);
			});
			setSocket(tempSocket);
		}

		//Disconnect Socket
		return () => {
			if (socket) {
				console.log("Disconnecting socket....");
				socket.disconnect();
				socket.off();
			}
		};
	}, [activeProject, socket, updateEntityLocation]);

	// Modify the room subscriptions for new tracked Entities
	useEffect(() => {
		if (socket) {
			updateSocketRooms(socket, trackedEntities, previousTrackedEntities, activeProject._id);
		}
	}, [trackedEntities, socket, previousTrackedEntities, activeProject]);

	return null;
};
export default useEntitiesUpdatesSocket;
