const fs = require('fs')
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

		expect(vertices).toEqual(8)
		expect(edges).toEqual({
			1: {
				2: [
					true,
				],
				3: [
					true
				],
				4: [
					true
				],
				7: [
					true
				],
			},
			2: {
				1: [
					true
				],
				3: [
					true
				],
				4: [
					true
				],
			},
			3: {
				1: [
					true
				],
				2: [
					true
				],
				4: [
					true
				],
			},
			4: {
				1: [
					true
				],
				2: [
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
