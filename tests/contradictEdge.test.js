const fs = require('fs')
const contradictEdge = require('../mainParts/contradictEdge')
const formatInputData = require('../utils/formatInputData')

test('format input data', (done) => {
	fs.readFile('./testCases/1.txt', 'utf8', (err, data) => {
		if (err) throw err;

		// simplest way to add \t to text file in my IDE
		data = data.replace(/ /g, '\t')

		const {
			vertices,
			edges,
		} = formatInputData(data)

		// // todo: move to getRandomNodeLabel.test
		// const A = getRandomNodeLabel(edges)
		// const B = getRandomNodeLabel(edges[A])
		//
		// expect(A).toBeLessThanOrEqual(vertices)
		// expect(edges[B]).toEqual(edges[A][B])

		const A = 1
		const B = 2

		const result = contradictEdge(
			vertices,
			edges,
			A,
			B,
		)

		expect(result.vertices).toEqual(vertices - 1)
		expect(result.edges).toEqual({
			1: {
				3: [
					true,
					true
				],
				4: [
					true,
					true
				],
				7: [
					true
				],
			},
			3: {
				1: [
					true,
					true
				],
				4: [
					true
				],
			},
			4: {
				1: [
					true,
					true
				],
				3: [
					true
				],
				5: [
					true
				],
			},
			5: {
				4: [
					true
				],
				6: [
					true
				],
				7: [
					true
				],
				8: [
					true
				],
			},
			6: {
				5: [
					true
				],
				7: [
					true
				],
				8: [
					true
				],
			},
			7: {
				1: [
					true
				],
				5: [
					true
				],
				6: [
					true
				],
				8: [
					true
				],
			},
			8: {
				5: [
					true
				],
				6: [
					true
				],
				7: [
					true
				],
			},
		})

		done()
	});
})
