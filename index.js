const fs = require('fs')
const formatInputData = require('./utils/formatInputData')
const repeatRandomContradiction = require('./mainParts/repeatRandomContradiction')

fs.readFile('./data.txt', 'utf8', (err, data) => {
	if (err) throw err;

	const {
		vertices,
		edges,
	} = formatInputData(data)

	/*
		Data format:

		vertices = {
			[label]: true
		}

		edges = {
			[startNodeLabel]: {
				[endNodeLabel]: Array<edgeIndex> // parallel edges allowed
			}
		}
	*/

	// repeat enough time for success
	const minCutLength = repeatRandomContradiction({
		vertices,
		edges,
	})

	// debug: single run
	// const minCutLength = randomContradiction({
	// 	vertices,
	// 	edges,
	// 	counter: 1
	// })

	console.log('minCutLength', minCutLength)
});

// improve: add typization, test coverage