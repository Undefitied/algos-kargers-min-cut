const getMinCutFromEdges = require('../utils/getMinCutFromEdges')
const getRandomNodeLabel = require('../utils/getRandomNodeLabel')
const contradictEdge = require('./contradictEdge')

let history = []
const randomContradiction = (
	vertices,
	edges,
	counter,
	previousBestMinCut // todo: not implemented
) => {
	if (vertices === 2) {
		return getMinCutFromEdges(edges)
	}

	// counter for debugging
	const newCounter = counter + 1;

	const A = getRandomNodeLabel(edges)
	const B = getRandomNodeLabel(edges[A])

	// debugging stuff
	if (process.env.DEBUG === '1') {
		history.push({
			A,
			B,
			vertices,
			edges: JSON.parse(JSON.stringify(edges)),
			counter,
			previousBestMinCut
		})
	}

	const result = contradictEdge(
		vertices,
		edges,
		A,
		B,
	)

	const minCutLength = randomContradiction(
		result.vertices,
		result.edges,
		newCounter,
		previousBestMinCut
	)

	return minCutLength
}

module.exports = randomContradiction
