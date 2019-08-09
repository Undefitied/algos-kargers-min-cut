const fs = require('fs')
const formatInputData = require('./utils/formatInputData')
const repeatRandomContradiction = require('./mainParts/repeatRandomContradiction')

fs.readFile('./testCases/1.txt', 'utf8', (err, data) => {
	if (err) throw err;
	// formatting of custom created file, to match initial input format
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

	console.log('minCutLength', minCutLength, minCutLength === 2)
});
//
// fs.readFile('./testCases/2.txt', 'utf8', (err, data) => {
// 	if (err) throw err;
// 	// formatting of custom created file, to match initial input format
// 	data = data.replace(/ /g, '\t')
//
// 	const {
// 		vertices,
// 		edges,
// 	} = formatInputData(data)
//
// 	// repeat enough time for success
// 	const minCutLength = repeatRandomContradiction({
// 		vertices,
// 		edges,
// 	})
//
// 	console.log('minCutLength', minCutLength, minCutLength === 2)
// });
//
// fs.readFile('./testCases/3.txt', 'utf8', (err, data) => {
// 	if (err) throw err;
// 	// formatting of custom created file, to match initial input format
// 	data = data.replace(/ /g, '\t')
//
// 	const {
// 		vertices,
// 		edges,
// 	} = formatInputData(data)
//
// 	// repeat enough time for success
// 	const minCutLength = repeatRandomContradiction({
// 		vertices,
// 		edges,
// 	})
//
// 	console.log('minCutLength', minCutLength, minCutLength === 1)
// });
