const randomContradiction = require('./randomContradiction')

module.exports = ({
	vertices,
	edges,
}) => {
	const n = Object.keys(vertices).length
	const numberOfTimes = n * (n - 1) * Math.log(n)
	console.log('numberOfTimes', numberOfTimes)

	let k = Number.MAX_VALUE

	for (let i = 0; i < numberOfTimes; i++) {
		const counter = 1;

		const minCutLength = randomContradiction(vertices, edges, counter)
		console.log(minCutLength, Object.keys(vertices).length, Object.keys(edges).length);

		if (minCutLength < k) {
			k = minCutLength
			// idea put to next call previous best result, to stop calculation if it is getting already worse
		}
	}

	return k
}