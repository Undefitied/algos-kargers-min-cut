const fs = require('fs')

// idea: from creating new label AB reduce algorithm to using only first label - A

const getRandomInt = (min, max) => {
	// including min, not including max
	return Math.floor(Math.random() * (max - min)) + min;
}

fs.readFile('./data.txt', 'utf8', (err, data) => {
	if (err) throw err;
	const rows = data.split('\n')
	// console.log('rows', rows);

	const vertices = {}
	const edges = {}

	/*
		vertices = {
			[label]: true
		}
	*/
	/*
		edges = {
			[startNodeLabel]: {
				[endNodeLabel]: Array<edgeIndex> // parallel edges allowed
			}
		}
	*/

	// populate data
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
				const biggestIndex = list[list.length - 1]
				edges[label][element].push(biggestIndex + 1)

			} else {
				edges[label][element] = [1]
			}
		})

		if (Object.keys(edges[label]).length === 0) {
			throw new Error()
		}
	})

	const minCutLength = repeatRandomContradiction({
		vertices,
		edges,
		callback: (r) => {
			console.log('r', r)
		}
	})
	// const result = randomContradiction({
	// 	vertices: {
	// 		...vertices,
	// 	},
	// 	edges: {
	// 		...edges
	// 	},
	// 	counter: 1
	// })
	//
	// console.log('result', result.edges)
	//
	// const minCutLength = getMinCutFromResult(result)

	console.log('minCutLength', minCutLength)
});

const getMinCutFromResult = (result) => {
	const minCutLength = Object.entries(result.edges).reduce((result, [startLabel, endLabelList]) => {
		return result + Object.entries(endLabelList).reduce((r, [endLabel, indexList]) => r + indexList.length, 0)
	}, 0)

	return minCutLength
}

const repeatRandomContradiction = ({
	vertices,
	edges,
	callback,
}) => {
	const n = Object.keys(vertices).length
	const numberOfTimes = n * (n - 1) * Math.log(n)
	console.log('numberOfTimes', numberOfTimes)

	let k = n

	for (let i = 0; i < numberOfTimes; i++) {
		setTimeout(() => {
			const counter = 1;
			const newVerticesInstance = { ...vertices }
			const newEdgesInstance = { ...edges }
			const result = randomContradiction(newVerticesInstance, newEdgesInstance, counter)

			const minCutLength = getMinCutFromResult(result)
			console.log(minCutLength, Object.keys(vertices).length, Object.keys(edges).length);

			if (minCutLength < k) {
				k = minCutLength
			}

			if (i === numberOfTimes - 1) {
				callback(k)
			}
		}, 1)
	}

	return k
}

const getRandomNodeLabel = (edgeList) => {
	const keys = Object.keys(edgeList)
	const randomIndex = getRandomInt(0, keys.length)

	return keys[randomIndex]
}

const randomContradiction = (
	vertices,
	edges,
	counter,
) => {
	if (Object.keys(vertices).length === 2) {
		return {
			counter,
			vertices,
			edges
		}
	}

	const newCounter = counter + 1;

	const A = getRandomNodeLabel(edges)
	const B = getRandomNodeLabel(edges[A])

	const result = contradictEdge({
		vertices,
		edges,
		A,
		B,
	})

	return randomContradiction(
		result.vertices,
		result.edges,
		newCounter
	)
}

const combineIndexes = (indexListA, indexListB) => {
	const indexesLength = indexListA.length + indexListB.length

	const indexes = []
	for (let i = 1; i <= indexesLength; i++) {
		indexes.push(i)
	}

	return indexes
}

const combineEdges = (endLabelsA, endLabelsB) => {
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

const contradictEdge = ({
	vertices,
	edges,
	A,
	B,
}) => {
	// contradict edge=(A,B) means:
	// 1. all edges from B now starts from A
	// 2. all edges to B now goes to A
	// 3. delete node B

	// 1. all edges from B now starts from A
	if (edges[B]) {
		if (edges[A]) {
			edges[A] = combineEdges(edges[A], edges[B])
		} else {
			edges[A] = edges[B]
		}

		if (edges[A][A]) {
			// delete self-loop
			delete edges[A][A]
		}
	}

	// 2. all edges to B now goes to A
	Object.entries(edges).forEach(([edgeStartNodeLabel, edgeEndNodeLabelList]) => {
		// B
		if (edgeEndNodeLabelList[B]) {
			if (edgeStartNodeLabel === A) {
				// delete self-loop
				delete edges[A][B]
			} else {

				if (edges[edgeStartNodeLabel][A]) {
					edges[edgeStartNodeLabel][A] = combineIndexes(edges[edgeStartNodeLabel][A], edges[edgeStartNodeLabel][B])

				} else {
					edges[edgeStartNodeLabel][A] = edges[edgeStartNodeLabel][B]
				}

				delete edges[edgeStartNodeLabel][B]
			}
		}
	})

	// 3. delete node B
	delete edges[B]
	delete vertices[B]

	return {
		vertices,
		edges,
		A,
		B,
	}
}