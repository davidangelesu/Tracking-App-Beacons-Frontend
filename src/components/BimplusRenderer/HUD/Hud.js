import React, { useMemo } from "react";
import useStyles from "./useStyles";
import ExpandibleButton from "./ExpandibleButton/ExpandibleButton";

import Fab from "@material-ui/core/Fab";
import VideocamIcon from "@material-ui/icons/Videocam";
import FlipIcon from "@material-ui/icons/Flip";
import VisibilityIcon from "@material-ui/icons/Visibility";

const Hud = (props) => {
	const classes = useStyles();
	const { viewportService } = props;

	const viewMenu = useMemo(
		() => [
			{
				name: "Reset View",
				function: viewportService.resetView,
			},
			{
				name: "Front View",
				function: viewportService.frontView,
			},
			{
				name: "Top View",
				function: viewportService.topView,
			},
			{
				name: "Side View",
				function: viewportService.sideView,
			},
			{
				name: "Perspective View",
				function: viewportService.perspectiveView,
			},
		],
		[viewportService]
	);

	const sectionViewMenu = useMemo(
		() => [
			{
				name: "Reset Section",
				function: viewportService.resetSelectionMode,
			},
			{
				name: "X axis",
				function: viewportService.sectionX,
			},
			{
				name: "Y axis",
				function: viewportService.sectionY,
			},
			{
				name: "Z axis",
				function: viewportService.sectionZ,
			},
			{
				name: "Free",
				function: viewportService.sectionFree,
			},
		],
		[viewportService]
	);

	const viewModesMenu = useMemo(
		() => [
			{
				name: "Reset",
				function: viewportService.resetSelectionMode,
			},
			{
				name: "Isolate",
				function: viewportService.isolate,
			},
			{
				name: "Clipping Box",
				function: viewportService.isolateHide,
			},
			{
				name: "Hide Unisolated",
				function: viewportService.isolateClippingBox,
			},
		],
		[viewportService]
	);

	return (
		<div className={classes.Hud}>
			<ExpandibleButton listOptions={viewMenu}>
				<Fab size="small" color="secondary" aria-label="add" className={classes.margin}>
					<VideocamIcon />
				</Fab>
			</ExpandibleButton>
			<ExpandibleButton listOptions={sectionViewMenu}>
				<Fab size="small" color="secondary" aria-label="add" className={classes.margin}>
					<FlipIcon />
				</Fab>
			</ExpandibleButton>
			<ExpandibleButton listOptions={viewModesMenu}>
				<Fab size="small" color="secondary" aria-label="add" className={classes.margin}>
					<VisibilityIcon />
				</Fab>
			</ExpandibleButton>
		</div>
	);
};

export default Hud;
