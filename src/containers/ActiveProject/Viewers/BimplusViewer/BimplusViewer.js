import React from "react";
import useBimplusExplorer from "../../../../hooks/useBimplusExplorer";

const BimplusViewer = (props) => {
	const { teamId, projectId,domElementId } = props;
	// eslint-disable-next-line no-unused-vars
	const [explorer, isExplorerLoaded] = useBimplusExplorer(teamId, projectId,domElementId);

	const renderer = (
		<iframe
			title="Viewer"
			id={domElementId}
			style={{ border: 0, height: "100%", width: "100%", backgroundColor: "white", margin: 0, padding: 0 }}
		></iframe>
	);

	return <React.Fragment>{renderer}</React.Fragment>;
};

export default BimplusViewer;
