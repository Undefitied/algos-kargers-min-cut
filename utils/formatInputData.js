module.exports = data => {
	const rows = data.split('\n')

	const vertices = {}
	const edges = {}

	rows.forEach(row => {
		row = row.split('\t')

		const label = row[0]
		vertices[label] = true
		edges[label] = {}

		row.forEach((element, index) => {
			if (index === 0) {
				return
			}

			if (edges[label][element]) {
				const list = edges[label][element];

				// indexes for parallel edges
				edges[label][element].push(list.length)

			} else {
				edges[label][element] = [1]
			}
		})

		if (Object.keys(edges[label]).length === 0) {
			throw new Error()
		}
	})

	return {
		vertices,
		edges,
	}
}