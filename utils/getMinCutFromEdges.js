module.exports = (edges) => {
	const keys = Object.keys(edges)
	// edges here is always an object with 2 keys, with mirror content
	return edges[keys[0]][keys[1]].length
}