const combineEdges = require('../utils/combineEdges')
const combineIndexes = require('../utils/combineIndexes')

module.exports = (
	initialVertices,
	initialEdges,
	A,
	B,
) => {
	const vertices = JSON.parse(JSON.stringify(initialVertices))
	const edges = JSON.parse(JSON.stringify(initialEdges))

	// contradict edge=(A,B) means:
	// 1. all edges from B now starts from A
	// 2. all edges to B now goes to A
	// 3. delete node B

	// 1. all edges from B now starts from A
	if (edges[B]) {
		if (edges[A]) {
			edges[A] = combineEdges(edges[A], edges[B])
		} else {
			edges[A] = edges[B]
		}

		if (edges[A][A]) {
			// delete self-loop
			delete edges[A][A]
		}
	}

	// 2. all edges to B now goes to A
	Object.entries(edges).forEach(([edgeStartNodeLabel, edgeEndNodeLabelList]) => {
		if (edgeEndNodeLabelList[B]) {
			if (edgeStartNodeLabel === A) {
				// delete self-loop
				delete edges[A][B]
			} else {

				if (edges[edgeStartNodeLabel][A]) {
					edges[edgeStartNodeLabel][A] = combineIndexes(edges[edgeStartNodeLabel][A], edges[edgeStartNodeLabel][B])

				} else {
					edges[edgeStartNodeLabel][A] = edges[edgeStartNodeLabel][B]
				}

				delete edges[edgeStartNodeLabel][B]
			}
		}
	})

	// 3. delete node B
	delete edges[B]
	delete vertices[B]

	return {
		vertices,
		edges,
		A,
		B,
	}
}