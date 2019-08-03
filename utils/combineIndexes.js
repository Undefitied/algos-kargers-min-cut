module.exports = (indexListA, indexListB) => {
	const indexesLength = indexListA.length + indexListB.length

	const indexes = []
	for (let i = 1; i <= indexesLength; i++) {
		indexes.push(i)
	}

	return indexes
}