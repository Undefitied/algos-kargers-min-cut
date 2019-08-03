const getMinCutFromEdges = require('../utils/getMinCutFromEdges')
const getRandomNodeLabel = require('../utils/getRandomNodeLabel')
const contradictEdge = require('./contradictEdge')

const randomContradiction = (
	vertices,
	edges,
	counter,
) => {
	if (Object.keys(vertices).length === 2) {
		return getMinCutFromEdges(edges)
	}

	const newCounter = counter + 1;

	const A = getRandomNodeLabel(edges)
	const B = getRandomNodeLabel(edges[A])

	const result = contradictEdge(
		vertices,
		edges,
		A,
		B,
	)

	return randomContradiction(
		result.vertices,
		result.edges,
		newCounter
	)
}

module.exports = randomContradiction
