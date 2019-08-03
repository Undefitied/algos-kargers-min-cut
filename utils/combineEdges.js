const combineIndexes = require('./combineIndexes')

module.exports = (endLabelsA, endLabelsB) => {
	const result = endLabelsA

	Object.entries(endLabelsB).forEach(([endLabel, indexList]) => {
		if (result[endLabel]) {
			// combine indexes
			result[endLabel] = combineIndexes(result[endLabel], indexList)

			return
		}

		result[endLabel] = indexList
	})

	return result
}