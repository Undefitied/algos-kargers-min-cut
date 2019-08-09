const fs = require('fs')
const formatInputData = require('../utils/formatInputData')
const getRandomNodeLabel = require('../utils/getRandomNodeLabel')

test('format input data', (done) => {
	fs.readFile('./testCases/1.txt', 'utf8', (err, data) => {
		if (err) throw err;

		// simplest way to add \t to text file in my IDE
		data = data.replace(/ /g, '\t')

		const {
			vertices,
			edges,
		} = formatInputData(data)

		// todo: move to getRandomNodeLabel.test
		const A = getRandomNodeLabel(edges)
		const B = getRandomNodeLabel(edges[A])

		expect(parseInt(A, 10)).toBeLessThanOrEqual(vertices)
		expect(edges[A]).toHaveProperty(B)

		done()
	});
})
