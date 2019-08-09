const fs = require('fs')
const formatInputData = require('./utils/formatInputData')
const repeatRandomContradiction = require('./mainParts/repeatRandomContradiction')

fs.readFile('./data.txt', 'utf8', (err, data) => {
	if (err) throw err;

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
});

// improve: add typization, test coverage
// todo: feed different test cases in tests tests
