const fs = require('fs')
const formatInputData = require('../utils/formatInputData')
const repeatRandomContradiction = require('../mainParts/repeatRandomContradiction')

test('format input data', (done) => {
	fs.readFile('./testCases/1.txt', 'utf8', (err, data) => {
		if (err) throw err;

		// simplest way to add \t to text file in my IDE
		data = data.replace(/ /g, '\t')

		const {
			vertices,
			edges,
		} = formatInputData(data)

		// repeat enough time for success
		const minCutLength = repeatRandomContradiction({
			vertices,
			edges,
		})

		console.log('minCutLength', minCutLength)
		expect(minCutLength).toEqual(2)

		done()
	});
})

// improve: add typization, test coverage