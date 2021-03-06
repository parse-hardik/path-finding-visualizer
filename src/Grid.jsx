import { Component } from "react";
import Node from "./Node";
import "./Grid.css";
import Algo, { getShortestPath } from "./FindPath";
const ROWS = 15;
const COLS = 50;
const START = [7, 15];
const END = [11, 25];

export default class PathFinder extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseDown: false,
      start: START,
      end: END,
      startNodePressed: false,
      endNodePressed: false,
      changingWallAllowed: true,
      algorithm: "",
    };
  }

  componentDidMount() {
    const grid = this.getInitialGrid();
    // console.log(grid);
    this.setState({ grid: grid });
  }

  getInitialGrid() {
    const grid = [];
    for (let row = 0; row < ROWS; row++) {
      const curr = [];
      for (let col = 0; col < COLS; col++) {
        curr.push(getNode(row, col));
      }
      grid.push(curr);
    }
    return grid;
  }

  setAlgo(name) {
    this.setState({ algorithm: name });
  }

  animateAlgorithm(allNodes, shortestPath, last) {
    for (let i = 0; i < allNodes.length; i++) {
      const node = allNodes[i];
      if (
        !(node.row === this.state.end[0] && node.col === this.state.end[1]) &&
        !(node.row === this.state.start[0] && node.col === this.state.start[1])
      )
        setTimeout(() => {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }, 10 * i);
      if (
        i === allNodes.length - 1 &&
        last.row === this.state.end[0] &&
        last.col === this.state.end[1]
      ) {
        setTimeout(() => {
          this.animateShortestPath(shortestPath);
        }, 10 * i);
      }
    }
  }

  animateShortestPath(shortestPath) {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest";
      }, 50 * i);
    }
  }

  visuaizeAlgorithm() {
    const { grid } = this.state;
    // console.log('grid', grid)
    console.log("start", this.state.start);
    console.log("end", this.state.end);
    const start = grid[this.state.start[0]][this.state.start[1]];
    const end = grid[this.state.end[0]][this.state.end[1]];
    if (this.state.algorithm === "") return;
    console.log("algorithm", this.state.algorithm);
    const allNodes = Algo(grid, start, end, this.state.algorithm);
    const last = allNodes[allNodes.length - 1];
    console.log(allNodes);
    if(this.state.algorithm === 'BiBFS'){
      console.log('Last ', last)
      this.clearPath();
      const al1 = Algo(grid, start, last, 'BFS');
      const sp1 = getShortestPath(al1, start);
      this.clearPath();
      const al2 = Algo(grid, last, end, 'BFS');
      const sp2 = getShortestPath(al2, last);
      const shortestPath = sp1.concat(sp2);
      this.animateAlgorithm(allNodes, shortestPath, end);
    }
    else{
      const shortestPath = getShortestPath(allNodes, start);
      console.log(shortestPath);
      // const shortestPath = [];
      this.animateAlgorithm(allNodes, shortestPath, last);
    }
  }

  clearBoard() {
    const { grid } = this.state;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        grid[row][col].isWall = false;
        grid[row][col].distance = Infinity;
        grid[row][col].visited = false;
        grid[row][col].prev = null;
        grid[row][col].f = Infinity;
        grid[row][col].g = Infinity;
        grid[row][col].heuristic = Infinity;
        document.getElementById(`node-${row}-${col}`).className = "node";
      }
    }
    document.getElementById(`node-${START[0]}-${START[1]}`).className =
      "node node-start";
    document.getElementById(`node-${END[0]}-${END[1]}`).className =
      "node node-end";
    this.setState({ grid: grid, start: START, end: END });
  }

  clearPath() {
    const { grid } = this.state;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        // grid[row][col].isWall = false;
        grid[row][col].prev = null;
        grid[row][col].distance = Infinity;
        grid[row][col].visited = false;
        grid[row][col].f = Infinity;
        grid[row][col].g = Infinity;
        grid[row][col].heuristic = Infinity;
        if (grid[row][col].isWall === true) continue;
        if (row === this.state.start[0] && col === this.state.start[1])
          document.getElementById(`node-${row}-${col}`).className =
            "node node-start";
        else if (row === this.state.end[0] && col === this.state.end[1])
          document.getElementById(`node-${row}-${col}`).className =
            "node node-end";
        else document.getElementById(`node-${row}-${col}`).className = "node";
      }
    }
    this.setState({ grid: grid }, () => {
      console.log(this.state.grid);
    });
  }

  onMouseEnter(row, col) {
    if (this.state.mouseDown === false) return;
    const { grid } = this.state;
    if (
      this.state.startNodePressed === true &&
      grid[row][col].isWall === false
    ) {
      console.log(
        "Line 132, row: ",
        row,
        " col: ",
        col,
        "grid",
        grid[row][col]
      );
      this.setState({ start: [row, col] }, () => {
        console.log("LINE 152 ", this.state.start);
      });
      document.getElementById(`node-${row}-${col}`).className =
        "node node-start";
      console.log("grid", grid);
    } else if (
      this.state.endNodePressed === true &&
      grid[row][col].isWall === false
    ) {
      this.setState({ end: [row, col] }, () => {
        // console.log('LINE 152 ', this.state.start)
      });
      document.getElementById(`node-${row}-${col}`).className = "node node-end";
    } else if (
      this.state.startNodePressed === false &&
      this.state.endNodePressed === false
    ) {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseDown: true });
    }
  }

  onMouseLeave(row, col) {
    if (
      this.state.startNodePressed === false &&
      this.state.endNodePressed === false
    )
      return;
    // if(
    // 	(row === this.state.start[0] && col === this.state.start[1]) ||
    // 	(row === this.state.end[0] && col === this.state.end[1])
    // )
    const { grid } = this.state;
    if (
      grid[row][col].isWall === true &&
      this.state.changingWallAllowed === false
    )
      return;
    document.getElementById(`node-${row}-${col}`).className = "node";
    // console.log('here')
    grid[row][col].isWall = false;
    grid[row][col].prev = null;
    grid[row][col].distance = Infinity;
    grid[row][col].visited = false;
    this.setState({ grid: grid });
  }

  onMouseDown(row, col) {
    if (
      !(
        (row === this.state.start[0] && col === this.state.start[1]) ||
        (row === this.state.end[0] && col === this.state.end[1])
      )
    ) {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid });
    } else if (row === this.state.start[0] && col === this.state.start[1]) {
      this.setState({ startNodePressed: true }, () => {
        console.log("startNodePressed set to true");
      });
      this.setState({ changingWallAllowed: false });
    } else if (row === this.state.end[0] && col === this.state.end[1]) {
      this.setState({ endNodePressed: true }, () => {
        console.log("endNodePressed set to true");
      });
      this.setState({ changingWallAllowed: false });
    }
    this.setState({ mouseDown: true });
  }

  onMouseUp(row, col) {
    if (row === this.state.start[0] && col === this.state.start[1]) {
      this.setState({ startNodePressed: false });
      this.setState({ changingWallAllowed: true });
    } else if (row === this.state.end[0] && col === this.state.end[1]) {
      this.setState({ endNodePressed: false });
      this.setState({ changingWallAllowed: true });
    }
    this.setState({ mouseDown: false });
  }

  presentable() {
    if (this.state.algorithm === "Dijkstra") return "Dijstra's!";
    if (this.state.algorithm === "AStar") return "A* Search!";
    if (this.state.algorithm === "BFS") return "BFS!";
    if (this.state.algorithm === "DFS") return "DFS!";
    if (this.state.algorithm === "GBFS") return "Greedy BFS!";
    if (this.state.algorithm === "BiBFS") return "Bidirectional BFS!";
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
                <a
                  class="nav-link dropdown-toggle cwhite fsize algo"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Algorithms
                </a>
                <div
                  class="dropdown-menu bg-dark"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a
                    class="dropdown-item cwhite"
                    href="#"
                    onClick={() => this.setAlgo("Dijkstra")}
                  >
                    Dijkstra
                  </a>
                  <a
                    class="dropdown-item cwhite"
                    href="#"
                    onClick={() => this.setAlgo("AStar")}
                  >
                    A* Search
                  </a>
                  <a
                    class="dropdown-item cwhite"
                    href="#"
                    onClick={() => this.setAlgo("BFS")}
                  >
                    BFS
                  </a>
                  <a
                    class="dropdown-item cwhite"
                    href="#"
                    onClick={() => this.setAlgo("DFS")}
                  >
                    DFS
                  </a>
                  <a
                    class="dropdown-item cwhite"
                    href="#"
                    onClick={() => this.setAlgo("GBFS")}
                  >
                    Greedy Best First
                  </a>
                  <a
                    class="dropdown-item cwhite"
                    href="#"
                    onClick={() => this.setAlgo("BiBFS")}
                  >
                    Bidirectional BFS
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <button
          className="container vertical-center bg-dark cwhite fsize"
          onClick={() => this.visuaizeAlgorithm()}
        >
          Visualize {this.presentable()}
        </button>
        <button
          className="container clear-board bg-dark cwhite fsize"
          onClick={() => this.clearBoard()}
        >
          Clear Board
        </button>
        <button
          className="container clear-path bg-dark cwhite fsize"
          onClick={() => this.clearPath()}
        >
          Clear Path
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="rowgap">
                {row.map((node, nodeIdx) => {
                  const { row, col, isWall } = node;
                  const isStart =
                    row === this.state.start[0] && col === this.state.start[1]
                      ? true
                      : false;
                  const isEnd =
                    row === this.state.end[0] && col === this.state.end[1]
                      ? true
                      : false;
                  return (
                    <Node
                      row={row}
                      col={col}
                      isStart={isStart}
                      isEnd={isEnd}
                      isWall={isWall}
                      onMouseEnter={(row, col) => this.onMouseEnter(row, col)}
                      onMouseDown={(row, col) => this.onMouseDown(row, col)}
                      onMouseUp={(row, col) => this.onMouseUp(row, col)}
                      onMouseLeave={(row, col) => this.onMouseLeave(row, col)}
                    />
                  );
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
    distance: Infinity,
    visited: false,
    prev: null,
    isWall: false,
    f: Infinity,
    g: Infinity,
    heuristic: Infinity,
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
