const fs = require('fs')

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

	// console.log('start ->', Object.keys(vertices).length);
	// console.log(Object.keys(edges))
	// const minCutLength = repeatRandomContradiction({
	// 	vertices,
	// 	edges
	// })
	const result = randomContradiction({
		vertices: {
			...vertices,
		},
		edges: {
			...edges
		},
		counter: 1
	})

	console.log('result', result.edges)

	const minCutLength = Object.entries(result.edges).reduce((result, [startLabel, endLabelList]) => {
		return result + Object.entries(endLabelList).reduce((r, [endLabel, indexList]) => r + indexList.length, 0)
	}, 0)

	console.log('minCutLength', minCutLength)
});

const repeatRandomContradiction = ({
	vertices,
	edges,
}) => {
	const n = Object.keys(vertices).length
	const numberOfTimes = n * (n - 1) * Math.log(n)
	console.log('numberOfTimes', numberOfTimes)

	let k = n

	for (let i = 0; i < numberOfTimes; i++) {
		const result = randomContradiction({
			vertices: {
				...vertices,
			},
			edges: {
				...edges
			},
			counter: 1
		})

		if (result === 1) {
			console.log(vertices)
			throw new Error()
		}

		// console.log('result', result);
		if (result < k) {
			k = result
		}
	}

	return k
}

const randomContradiction = ({
	vertices,
	edges,
	counter,
}) => {
	if (Object.keys(vertices).length === 2) {
		return {
			counter,
			vertices,
			edges
		}
	}

	const newCounter = counter + 1;
	// console.log('newCounter', newCounter)

	const allEdgesStartKeys = Object.keys(edges)
	const randomEdgeStartIndex = getRandomInt(0, allEdgesStartKeys.length)
	const randomNodeStartLabel = allEdgesStartKeys[randomEdgeStartIndex]
	// console.log('randomNodeStartLabel', randomNodeStartLabel)

	// console.log('edges[randomNodeStartLabel]', edges[randomNodeStartLabel])
	const edgeEndKeys = Object.keys(edges[randomNodeStartLabel])
	const randomEdgeEndIndex = getRandomInt(0, edgeEndKeys.length)
	const randomNodeEndLabel = edgeEndKeys[randomEdgeEndIndex]
	// console.log('randomNodeEndLabel', randomNodeEndLabel)


	// debug
	if (randomNodeEndLabel === undefined) {
		console.error('edgeEndKeys', edgeEndKeys)
		throw new Error()
	}

	const A = randomNodeStartLabel
	const B = randomNodeEndLabel

	const result = contradictEdge({
		vertices,
		edges,
		A,
		B,
	})

	// console.log('->', Object.keys(edges).length, Object.keys(result.edges).length);
	// console.log('->', Object.keys(vertices).length, Object.keys(result.vertices).length);
	return randomContradiction({
		vertices: result.vertices,
		edges: result.edges,
		counter: newCounter
	})
}

const contradictEdge = ({
	vertices,
	edges,
	A,
	B,
}) => {
	// contradict edge=(A,B) means:
	// 0. create new node AB
	// 1. all edges from A now starts from AB
	// 2. all edges from B now starts from AB
	// 3. all edges to A now goes to AB
	// 4. all edges to B now goes to AB
	// 5. delete node A
	// 6. delete node B

	// 0. create new node AB
	const newNodeLabel = A + '/' + B
	vertices[newNodeLabel] = true

	// 3. all edges to A now goes to AB
	// 4. all edges to B now goes to AB
	Object.entries(edges).forEach(([edgeStartNodeLabel, edgeEndNodeLabelList]) => {
		console.clear()
		console.log('A, B', A, B)
		// A
		if (edgeEndNodeLabelList[A]) {
			// delete self-loops
			if (edgeStartNodeLabel === B) {
				delete edges[edgeStartNodeLabel][A]

				if (Object.keys(edges[edgeStartNodeLabel]).length === 0) {
					delete edges[edgeStartNodeLabel]
				}
			} else {

				// replace endLabel
				edges[edgeStartNodeLabel][newNodeLabel] = [
					...edgeEndNodeLabelList[A]
				]

				// delete previous endLabel
				delete edges[edgeStartNodeLabel][A]

			}
		}

		// B
		if (edgeEndNodeLabelList[B]) {
			// delete self-loops
			if (edgeStartNodeLabel === A) {
				delete edges[edgeStartNodeLabel][B]

				if (Object.keys(edges[edgeStartNodeLabel]).length === 0) {
					delete edges[edgeStartNodeLabel]
				}
			} else {

				edges[edgeStartNodeLabel][newNodeLabel] = [
					...edgeEndNodeLabelList[B]
				]
				delete edges[edgeStartNodeLabel][B]

			}
		}

		if (edges[edgeStartNodeLabel] && Object.keys(edges[edgeStartNodeLabel]).length === 0) {
			console.log('A, B', A, B)
			throw new Error()
		}
	})

	// after inner edges job was done (3,4 above)
	// 1. all edges from A now starts from AB
	// 2. all edges from B now starts from AB
	if (edges[A] || edges[B]) {
		edges[newNodeLabel] = {
			...edges[A],
			...edges[B],
		}
	}

	delete edges[A]
	delete edges[B]

	// 5. delete node A
	// 6. delete node B
	delete vertices[A]
	delete vertices[B]

	return {
		vertices,
		edges,
		A,
		B,
	}
}