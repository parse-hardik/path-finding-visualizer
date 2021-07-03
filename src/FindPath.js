import Queue from './Queue'

export default function Algo(grid, start, end, name) {
	if (name === 'Dijkstra')
		return dijkstra(grid, start, end)
	if (name === 'AStar')
		return AStar(grid, start, end)
	if (name === 'BFS')
		return BFS(grid, start, end)
	if (name === 'DFS')
		return DFS(grid, start, end)
	if (name === 'GBFS')
		return GreedyBFS(grid, start, end)
	if(name === 'BiBFS')
		return Bi_BFS(grid, start, end)
}

const dx = [0, 1, -1, 0];
const dy = [1, 0, 0, -1];

function Bi_BFS(grid, start, end){
	const sourceQueue = new Queue();
	const targetQueue = new Queue();
	sourceQueue.push(start);
	targetQueue.push(end);
	const visitedNodes = [];
	const source = new Set();
	const target = new Set();
	source.add(start);
	target.add(end);
	while(!sourceQueue.isEmpty() && !targetQueue.isEmpty()){
		const currSource = sourceQueue.front();
		sourceQueue.pop();
		// console.log('currSource ',currSource);
		if(target.has(currSource)){
			source.add(currSource)
			console.log('Source Set=> ', source)
			console.log('Target Set=> ', target)
			visitedNodes.push(currSource);
			return visitedNodes;
		}
		const currTarget = targetQueue.front();
		targetQueue.pop();
		// console.log('currTarget ',currTarget);
		if(source.has(currTarget)){
			target.add(currTarget);
			console.log('Source Set=> ', source)
			console.log('Taget Set=> ', target)
			visitedNodes.push(currTarget);
			return visitedNodes;
		}
		if(!currSource.visited && !currSource.isWall){
			currSource.visited = true;
			visitedNodes.push(currSource);
			source.add(currSource);
			if(currSource === end)
				return visitedNodes;
			for(let i=0;i<dx.length;i++){
				const x = currSource.row + dx[i];
				const y = currSource.col + dy[i];
				if(!isValid(grid, x, y))
					continue;
				const next = grid[x][y];
				if(target.has(next)){
					next.prev = currSource;
					source.add(next);
					console.log('Source Set=> ', source)
					console.log('Taget Set=> ', target)
					visitedNodes.push(next);
					return visitedNodes;
				}
				if(next.visited || next.isWall)
					continue;
				next.prev = currSource;
				sourceQueue.push(next);
			}
		}

		if(!currTarget.visited && !currTarget.isWall){
			currTarget.visited = true;
			visitedNodes.push(currTarget);
			target.add(currTarget);
			if(currTarget === start)
				return visitedNodes;
			for(let i=dx.length-1;i>=0;i--){
				const x = currTarget.row + dx[i];
				const y = currTarget.col + dy[i];
				if(!isValid(grid, x, y))
					continue;
				const next = grid[x][y];
				if(source.has(next)){
					next.prev = currTarget;
					target.add(next);
					console.log('Source Set=> ', source)
					console.log('Taget Set=> ', target)
					visitedNodes.push(next);
					return visitedNodes;
				}
				if(next.visited || next.isWall)
					continue;
				next.prev = currTarget;
				targetQueue.push(next);
			}
		}
	}
	return visitedNodes;
}

function GreedyBFS(grid, start, end) {
	start.distance = 0;
	const visitedNodes = []
	const allNodes = [];
	for (const row of grid) {
		for (const col of row)
			allNodes.push(col);
	}
	while (allNodes.length) {
		sortNodesByDistance(allNodes);
		const closest = allNodes.shift();
		if (closest.isWall)
			continue;
		if (closest.distance === Infinity)
			return visitedNodes;
		closest.visited = true;
		visitedNodes.push(closest);
		updateHeuristicNeighbors(grid, closest, end);
		if (closest === end)
			return visitedNodes;
	}
}

function DFSUtil(grid, curr, target, visitedNodes) {
	if (!isValid(grid, curr.row, curr.col) || curr.visited || curr.isWall)
		return false;
	if (curr === target) {
		visitedNodes.push(curr);
		return true;
	}
	curr.visited = true;
	visitedNodes.push(curr);
	for (let i = 0; i < dx.length; i++) {
		const x = curr.row + dx[i];
		const y = curr.col + dy[i];
		if (!isValid(grid, x, y))
			continue;
		const next = grid[x][y];
		if (next.visited === true || next.isWall === true)
			continue;
		next.prev = curr;
		if (DFSUtil(grid, next, target, visitedNodes))
			return true;
	}
	return false;
}

function DFS(grid, start, end) {
	const visitedNodes = []
	DFSUtil(grid, start, end, visitedNodes);
	return visitedNodes;
}

function BFS(grid, start, end) {
	start.distance = 0;
	const visitedNodes = []
	const q = new Queue();
	q.push(start);
	while (!q.isEmpty()) {
		const curr = q.front();
		q.pop();
		if (curr.visited === true || curr.isWall === true)
			continue;
		curr.visited = true;
		visitedNodes.push(curr);
		if (curr === end)
			return visitedNodes;
		for (let i = 0; i < dx.length; i++) {
			const x = curr.row + dx[i];
			const y = curr.col + dy[i];
			if (!isValid(grid, x, y))
				continue;
			const next = grid[x][y];
			if (next.visited === true)
				continue;
			next.prev = curr;
			q.push(next);
		}
	}
}

function AStar(grid, start, end) {
	const open = [], visited = [];
	const closed = new Array(grid.length).fill(false).map(() => new Array(grid[0].length).fill(false));
	start.f = 0;
	start.g = 0;
	start.heurstic = 0;
	open.push(start);
	// const dx = [-1,-1,-1,0,0,1,1,1];
	// const dy = [-1,0,1,-1,1,-1,0,1];
	const dx = [0, 1, 0, -1];
	const dy = [1, 0, -1, 0];
	let gNew, hNew, fNew;
	while (open.length) {
		sortNodesByF(open);
		const curr = open.shift();
		visited.push(curr);
		closed[curr.row][curr.col] = true;
		for (let i = 0; i < dx.length; i++) {
			const x = dx[i] + curr.row;
			const y = dy[i] + curr.col;
			if (!isValid(grid, x, y))
				continue;
			const next = grid[x][y];
			if (next === end) {
				next.prev = curr;
				visited.push(next);
				return visited;
			}
			if (closed[x][y] === false && next.isWall === false) {
				gNew = curr.g + 1.0;
				hNew = calculateHValue(next, end);
				fNew = gNew + hNew;
				if (next.f === Infinity || next.f > fNew) {
					open.push(next);
					next.f = fNew;
					next.g = gNew;
					next.heurstic = hNew;
					next.prev = curr;
				}
			}
		}
	}
	return visited;
}

function calculateHValue(next, end) {
	const dx = Math.abs(next.row - end.row);
	const dy = Math.abs(next.col - end.col);
	return (dx + dy) + (Math.sqrt(2) - 2) * Math.min(dx, dy);
}

function dijkstra(grid, start, end) {
	start.distance = 0;
	const visitedNodes = [];
	const allNodes = [];
	for (const row of grid) {
		for (const col of row)
			allNodes.push(col);
	}
	while (allNodes.length) {
		sortNodesByDistance(allNodes);
		const closest = allNodes.shift();
		if (closest.isWall) {
			console.log(closest.row, closest.col);
			continue;
		}
		if (closest.distance === Infinity)
			return visitedNodes;
		closest.visited = true;
		visitedNodes.push(closest);
		updateNeighbors(grid, closest);
		if (closest === end)
			return visitedNodes;
	}
}

function isValid(grid, row, col) {
	if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length)
		return false;
	return true;
}

function updateNeighbors(grid, curr) {
	const neighbors = getUnvisitedNeighbors(grid, curr);
	for (const node of neighbors) {
		node.distance = curr.distance + 1;
		node.prev = curr;
	}
}

function updateHeuristicNeighbors(grid, curr, end) {
	const neighbors = getUnvisitedNeighbors(grid, curr);
	for (const node of neighbors) {
		node.distance = calculateHValue(node, end);
		node.prev = curr;
	}
}

export function getShortestPath(allNodes, start) {
	const shortestPath = [];
	let curr = allNodes[allNodes.length - 1];
	// curr = curr.prev;
	while (curr !== start) {
		shortestPath.push(curr);
		console.log(curr);
		curr = curr.prev;
	}
	// shortestPath.push(start);
	shortestPath.reverse();
	return shortestPath;
}

function getUnvisitedNeighbors(grid, curr) {
	const neighbors = [];
	const { row, col } = curr;
	if (row > 0) neighbors.push(grid[row - 1][col]);
	if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
	if (col > 0) neighbors.push(grid[row][col - 1]);
	if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
	return neighbors.filter(neighbor => !neighbor.visited);
}

function sortNodesByDistance(unvisitedNodes) {
	unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function sortNodesByF(openList) {
	openList.sort((nodeA, nodeB) => nodeA.f - nodeB.f)
}