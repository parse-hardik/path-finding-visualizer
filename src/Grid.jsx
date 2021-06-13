import { Component } from "react";
import Node from "./Node";
import "./Grid.css";
import Algo, {getShortestPath} from './FindPath';
const ROWS = 25;
const COLS = 50;
const START = [10,15];
const END = [11,25];

export default class PathFinder extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
			mouseDown: false,
    };
  }

  componentDidMount() {
    const grid = [];
    for (let row = 0; row < ROWS; row++) {
      const curr = [];
      for (let col = 0; col < COLS; col++) {
        curr.push(getNode(row, col));
      }
      grid.push(curr);
    }
    // console.log(grid);
    this.setState({ grid });
  }

	animateAlgorithm(allNodes, shortestPath, last){
		for(let i=0;i<allNodes.length;i++){
			const node = allNodes[i];
			if(!((node.row===END[0] && node.col===END[1])) && !(node.row===START[0] && node.col===START[1]))
				setTimeout(()=>{
					document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
				}, 10*i);
			if(i===allNodes.length-1 && (last.row === END[0] && last.col === END[1])){
				setTimeout(()=>{
					this.animateShortestPath(shortestPath)
				}, 10*i);
			}
		}
	}

	animateShortestPath(shortestPath){
		for(let i=0;i<shortestPath.length;i++){
			setTimeout(()=>{
				const node = shortestPath[i]
				document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest';
			},50*i);
		}
	}

	visuaizeAlgorithm(){
		const {grid} = this.state;
		const start = grid[START[0]][START[1]];
		const end = grid[END[0]][END[1]];
		const allNodes = Algo(grid, start, end);
		const last = allNodes[allNodes.length-1];
		console.log(allNodes)
		const shortestPath = getShortestPath(allNodes, start);
		this.animateAlgorithm(allNodes, shortestPath, last)
	}

	onMouseEnter(row, col){
		if(this.state.mouseDown === false) return;
		const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
		this.setState({grid:newGrid, mouseDown: true})
	}

	onMouseDown(row, col){
		const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
		this.setState({grid:newGrid, mouseDown: true})
	}

	onMouseUp(){
		this.setState({mouseDown: false});
	}

  render() {
    const { grid } = this.state;
    return (
			<>
				<nav class="navbar navbar-dark bg-dark navbar-expand-sm">
					<a class="navbar-brand fsize pad" href="#">
						PathFinder
					</a>
					{/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-list-3" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>Hello
					</button> */}
					<div class="collapse navbar-collapse" id="navbar-list-3">
						<ul class="navbar-nav">
							<li class="nav-item dropdown">
								<a class="nav-link dropdown-toggle cwhite fsize" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									Algorithms
								</a>
								<div class="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
									<a class="dropdown-item cwhite" href="#">Dijkstra</a>
									<a class="dropdown-item cwhite" href="#">A Star</a>
									<a class="dropdown-item cwhite" href="#">Something else here</a>
								</div>
							</li>   
						</ul>
					</div>
				</nav>
				<button className = "container vertical-center" onClick={()=>this.visuaizeAlgorithm()}>
					Visualize!
				</button>
				<div className="grid">
					{grid.map((row, rowIdx) => {
						return (
							<div key={rowIdx} className="rowgap">
								{row.map((node, nodeIdx) => {
									const { row, col, isWall } = node;
									const isStart = ((row === START[0]) && (col === START[1]))? true : false;
									const isEnd = ((row === END[0]) && (col === END[1]))? true : false;
									return <Node 
										row={row} 
										col={col} 
										isStart = {isStart} 
										isEnd = {isEnd} 
										isWall = {isWall}
										onMouseEnter = {(row, col)=>this.onMouseEnter(row,col)}
										onMouseDown = {(row, col)=>this.onMouseDown(row, col)}
										onMouseUp = {()=>this.onMouseUp()}
										/>;
								})}
							</div>
						);
					})}
				</div>
			</>
    );
  }
}

const getNode = (row, col) => {
  return { 
		row, 
		col, 
		distance:Infinity, 
		visited: false,
		prev:null, 
		isWall: false
	};
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
