const fs = require('fs')
const formatInputData = require('../utils/formatInputData')
const randomContradiction = require('../mainParts/randomContradiction')

test('format input data', (done) => {
	fs.readFile('./testCases/1.txt', 'utf8', (err, data) => {
		if (err) throw err;

		// simplest way to add \t to text file in my IDE
		data = data.replace(/ /g, '\t')

		const {
			vertices,
			edges,
		} = formatInputData(data)

		const counter = 0
		const bestResult = Number.MAX_VALUE
		const minCutLength = randomContradiction(vertices, edges, counter, bestResult)

		const maxMinCutSize = vertices - 1
		expect(minCutLength).toBeLessThanOrEqual(maxMinCutSize)

		done()
	});
})
