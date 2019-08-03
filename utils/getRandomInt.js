module.exports = (min, max) => {
	// including min, not including max
	return Math.floor(Math.random() * (max - min)) + min;
}