const getRandomInt = require('./getRandomInt')

module.exports = (edgeList) => {
	const keys = Object.keys(edgeList)
	const randomIndex = getRandomInt(0, keys.length)

	return keys[randomIndex]
}