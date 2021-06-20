export default function Algo(grid, start, end, name){
	if(name === 'Dijkstra')
		return dijkstra(grid, start, end)
	if(name === 'AStar')
		return AStar(grid, start, end)
}

function AStar(grid, start, end){
	const open = [], visited = [];
	const closed = new Array(grid.length).fill(false).map(() =>new Array(grid[0].length).fill(false));
	start.f=0;
	start.g=0; 
	start.heurstic=0;
	open.push(start);
	// const dx = [-1,-1,-1,0,0,1,1,1];
	// const dy = [-1,0,1,-1,1,-1,0,1];
	const dx = [-1,0,0,1];
	const dy = [0,-1,1,0];
	let gNew, hNew, fNew;
	while(open.length){
		sortNodesByF(open);
		const curr = open.shift();
		visited.push(curr);
		closed[curr.row][curr.col] = true;
		for(let i=0;i<dx.length;i++){
			const x = dx[i] + curr.row;
			const y = dy[i] + curr.col;
			if(!isValid(grid, x, y))
				continue;
			const next = grid[x][y];
			if(next === end){
				next.prev = curr;
				visited.push(next);
				return visited;
			}
			if(closed[x][y] === false && next.isWall === false){
				gNew = curr.g + 1.0;
				hNew = calculateHValue(next, end);
				fNew = gNew + hNew;
				if(next.f === Infinity || next.f > fNew){
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

function calculateHValue(next, end){
	const dx = Math.abs(next.row - end.row);
	const dy = Math.abs(next.col - end.col);
	return (dx+dy) + (Math.sqrt(2) - 2)*Math.min(dx,dy);
}

function dijkstra(grid, start, end){
	start.distance = 0;
	const visitedNodes = [];
	const allNodes = [];
	for(const row of grid){
		for(const col of row)
			allNodes.push(col);
	}
	while(allNodes.length){
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

function isValid(grid, row, col){
	if(row<0 || row>= grid.length || col<0 || col>= grid[0].length)
		return false;
	return true;
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

function sortNodesByF(openList){
	openList.sort((nodeA, nodeB) => nodeA.f - nodeB.f)
}