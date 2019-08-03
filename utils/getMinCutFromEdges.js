module.exports = (edges) => {
	const minCutLength = Object.entries(edges).reduce((result, [startLabel, endLabelList]) => {
		return result + Object.entries(endLabelList).reduce((r, [endLabel, indexList]) => r + indexList.length, 0)
	}, 0)

	return minCutLength
}