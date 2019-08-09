const combineEdges = require('../utils/combineEdges')
const combineIndexes = require('../utils/combineIndexes')

/*
	Data format:

	vertices = Number

	edges = {
		[startNode]: {
			[endNode]: [Boolean]
		}
	}
*/

module.exports = (
	vertices,
	edges,
	A,
	B,
) => {
	// contradict edge=(A,B) means:
	// 0. remove self loops
	// 1. all edges from B now starts from A
	// 2. all edges to B now goes to A
	// 3. delete node B

	// 0. remove self loops
	delete edges[A][B]
	delete edges[B][A]

	Object.keys(edges[B]).forEach((endLabel) => {
		// 1. all edges from B now starts from A
		// if has same start points, merge inner edge arrays
		if (edges[A][endLabel]) {
			edges[A][endLabel] = [
				...edges[A][endLabel],
				...edges[B][endLabel],
			]
		} else {
			edges[A][endLabel] = edges[B][endLabel]
		}

		// 2. all edges to B now goes to A
		// if there already was A, merge by same way as above
		if (edges[endLabel][A]) {
			edges[endLabel][A] = [
				...edges[endLabel][A],
				...edges[endLabel][B],
			]
		} else {
			edges[endLabel][A] = edges[endLabel][B]
		}

		delete edges[endLabel][B]
	})

	// 3. delete node B
	delete edges[B]
	vertices--

	return {
		vertices,
		edges,
		A,
		B,
	}
}