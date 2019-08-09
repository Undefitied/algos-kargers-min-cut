module.exports = data => {

	/*
		Data format:

		vertices = Number

		edges = {
			[startNode]: {
				[endNode]: [Boolean]
			}
		}
	*/

	const rows = data.split('\n')

	let vertices = 0
	const edges = {}

	rows.forEach(row => {
		row = row.split('\t')

		const label = row[0]
		vertices++

		row.forEach((element, index) => {
			if (index === 0) {
				return
			}

			edges[label] = edges[label] ? edges[label] : {}
			edges[label][element] = edges[label][element] ? edges[label][element] : []
			edges[label][element].push(true)
		})
	})

	return {
		vertices,
		edges,
	}
}