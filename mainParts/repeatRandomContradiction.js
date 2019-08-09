const randomContradiction = require('./randomContradiction')

module.exports = ({
	vertices,
	edges,
}) => {
	const n = vertices
	const numberOfTimes = n * (n - 1) * Math.log(n)
	console.log('numberOfTimes', numberOfTimes)

	let bestResult = Number.MAX_VALUE

	for (let i = 0; i < numberOfTimes; i++) {
		const counter = 1;

		const newVerticesInstance = JSON.parse(JSON.stringify(vertices))
		const newEdgesInstance = JSON.parse(JSON.stringify(edges))

		const minCutLength = randomContradiction(newVerticesInstance, newEdgesInstance, bestResult)
		console.log('#' + i, 'minCutLength', minCutLength);

		if (minCutLength < bestResult) {
			bestResult = minCutLength
			// idea put to next call previous best result, to stop calculation if it is getting already worse
		}
	}

	return bestResult
}