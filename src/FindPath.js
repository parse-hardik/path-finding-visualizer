export default function Algo(grid, start, end){
	start.distance = 0;
	const visitedNodes = [];
	const allNodes = [];
	for(const row of grid){
		for(const col of row)
			allNodes.push(col);
	}
	while(!!allNodes.length){
		sortNodesByDistance(allNodes);
		const closest = allNodes.shift();
		if(closest.isWall){
			console.log(closest.row, closest.col);
			continue;
		}
		if(closest.distance === Infinity)
			return visitedNodes;
		closest.visited = true;
		visitedNodes.push(closest);
		updateNeighbors(grid, closest);
		if(closest === end)
			return visitedNodes;
	}
}

function updateNeighbors(grid, curr){
	const neighbors = getUnvisitedNeighbors(grid, curr);
	for(const node of neighbors){
		node.distance = curr.distance+1;
		node.prev = curr;
	}
}

export function getShortestPath(allNodes, start){
	const shortestPath = [];
	let curr = allNodes[allNodes.length-1];
	curr = curr.prev;
	while(curr!==start ){
		shortestPath.push(curr);
		curr = curr.prev;
	}
	// shortestPath.push(start);
	shortestPath.reverse();
	return shortestPath;
}

function getUnvisitedNeighbors(grid, curr){
	const neighbors = [];
	const {row, col} = curr;
	if(row>0) neighbors.push(grid[row-1][col]);
	if(row<grid.length-1) neighbors.push(grid[row+1][col]);
	if(col>0) neighbors.push(grid[row][col-1]);
	if(col<grid[0].length-1) neighbors.push(grid[row][col+1]);
	return neighbors.filter(neighbor => !neighbor.visited);
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}