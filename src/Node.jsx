import { Component } from "react";
import './Node.css'

export default class Node extends Component {
	render() {
		const {row, col, isStart, isEnd, isWall, onMouseDown, onMouseEnter, onMouseUp} = this.props;
		const extraClassName = isStart ? 'node-start' : isEnd ? 'node-end' : isWall ? 'node-wall' : '';
    return (
			<div 
			id = {`node-${row}-${col}`} 
			key = {`node-${row}-${col}`} 
			onMouseEnter = {()=>{onMouseEnter(row, col)}}
			onMouseDown = {()=>{onMouseDown(row, col)}}
			onMouseUp = {()=>{onMouseUp()}}
			className = {`node ${extraClassName}`}>
			</div>
		);
  }
}
