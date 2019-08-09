const getMinCutFromEdges = require('../utils/getMinCutFromEdges')

test('format input data', () => {
	const minCutLength = getMinCutFromEdges({
		1: {
			2: [
				true,
				true,
			],
		},
		2: {
			1: [
				true,
				true,
			],
		},
	})

	expect(minCutLength).toEqual(2)

	const minCutLengthSecond = getMinCutFromEdges({
		1: {
			2: [
				true,
			],
		},
		2: {
			1: [
				true,
			],
		},
	})

	expect(minCutLengthSecond).toEqual(1)

	const minCutLengthThird = getMinCutFromEdges({
		1: {
			2: [
				true,
				true,
				true,
			],
		},
		2: {
			1: [
				true,
				true,
				true,
			],
		},
	})

	expect(minCutLengthThird).toEqual(3)
})
