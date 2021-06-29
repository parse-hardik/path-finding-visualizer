(this["webpackJsonppath-finding-visualizer"]=this["webpackJsonppath-finding-visualizer"]||[]).push([[0],{14:function(t,e,n){},15:function(t,e,n){},16:function(t,e,n){},18:function(t,e,n){},19:function(t,e,n){"use strict";n.r(e);var s=n(1),a=n.n(s),i=n(9),o=n.n(i),r=(n(14),n(15),n(8)),c=n(2),l=n(3),d=n(5),u=n(4),h=(n(16),n(0)),f=function(t){Object(d.a)(n,t);var e=Object(u.a)(n);function n(){return Object(c.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var t=this.props,e=t.row,n=t.col,s=t.isStart,a=t.isEnd,i=t.isWall,o=t.onMouseDown,r=t.onMouseEnter,c=t.onMouseUp,l=t.onMouseLeave,d=s?"node-start":a?"node-end":i?"node-wall":"";return Object(h.jsx)("div",{id:"node-".concat(e,"-").concat(n),onMouseEnter:function(){r(e,n)},onMouseDown:function(){o(e,n)},onMouseUp:function(){c(e,n)},className:"node ".concat(d),onMouseLeave:function(){l(e,n)}},"node-".concat(e,"-").concat(n))}}]),n}(s.Component),v=(n(18),n(6)),g=function(){function t(){Object(c.a)(this,t),this.items=[]}return Object(l.a)(t,[{key:"push",value:function(t){this.items.push(t)}},{key:"isEmpty",value:function(){return 0===this.items.length}},{key:"front",value:function(){return this.items[0]}},{key:"pop",value:function(){this.items.length>0&&this.items.shift()}}]),t}();function m(t,e,n,s){return"Dijkstra"===s?function(t,e,n){e.distance=0;var s,a=[],i=[],o=Object(v.a)(t);try{for(o.s();!(s=o.n()).done;){var r,c=s.value,l=Object(v.a)(c);try{for(l.s();!(r=l.n()).done;){var d=r.value;i.push(d)}}catch(h){l.e(h)}finally{l.f()}}}catch(h){o.e(h)}finally{o.f()}for(;i.length;){S(i);var u=i.shift();if(u.isWall)console.log(u.row,u.col);else{if(u.distance===1/0)return a;if(u.visited=!0,a.push(u),y(t,u),u===n)return a}}}(t,e,n):"AStar"===s?function(t,e,n){var s=[],a=[],i=new Array(t.length).fill(!1).map((function(){return new Array(t[0].length).fill(!1)}));e.f=0,e.g=0,e.heurstic=0,s.push(e);var o,r,c,l=[0,1,0,-1],d=[1,0,-1,0];for(;s.length;){O(s);var u=s.shift();a.push(u),i[u.row][u.col]=!0;for(var h=0;h<l.length;h++){var f=l[h]+u.row,v=d[h]+u.col;if(k(t,f,v)){var g=t[f][v];if(g===n)return g.prev=u,a.push(g),a;!1===i[f][v]&&!1===g.isWall&&(c=(o=u.g+1)+(r=w(g,n)),(g.f===1/0||g.f>c)&&(s.push(g),g.f=c,g.g=o,g.heurstic=r,g.prev=u))}}}return a}(t,e,n):"BFS"===s?function(t,e,n){e.distance=0;var s=[],a=new g;a.push(e);var i=[0,1,0,-1],o=[1,0,-1,0];for(;!a.isEmpty();){var r=a.front();if(a.pop(),!0!==r.visited&&!0!==r.isWall){if(r.visited=!0,s.push(r),r===n)return s;for(var c=0;c<i.length;c++){var l=r.row+i[c],d=r.col+o[c];if(k(t,l,d)){var u=t[l][d];!0!==u.visited&&(u.prev=r,a.push(u))}}}}}(t,e,n):"DFS"===s?function(t,e,n){var s=[];return j(t,e,n,s),s}(t,e,n):void 0}var p=[0,1,0,-1],b=[1,0,-1,0];function j(t,e,n,s){if(!k(t,e.row,e.col)||e.visited||e.isWall)return!1;if(e==n)return s.push(e),!0;e.visited=!0,s.push(e);for(var a=0;a<p.length;a++){var i=e.row+p[a],o=e.col+b[a];if(k(t,i,o)){var r=t[i][o];if(!0!==r.visited&&!0!==r.isWall&&(r.prev=e,j(t,r,n,s)))return!0}}return!1}function w(t,e){var n=Math.abs(t.row-e.row),s=Math.abs(t.col-e.col);return n+s+(Math.sqrt(2)-2)*Math.min(n,s)}function k(t,e,n){return!(e<0||e>=t.length||n<0||n>=t[0].length)}function y(t,e){var n,s=function(t,e){var n=[],s=e.row,a=e.col;s>0&&n.push(t[s-1][a]);s<t.length-1&&n.push(t[s+1][a]);a>0&&n.push(t[s][a-1]);a<t[0].length-1&&n.push(t[s][a+1]);return n.filter((function(t){return!t.visited}))}(t,e),a=Object(v.a)(s);try{for(a.s();!(n=a.n()).done;){var i=n.value;i.distance=e.distance+1,i.prev=e}}catch(o){a.e(o)}finally{a.f()}}function S(t){t.sort((function(t,e){return t.distance-e.distance}))}function O(t){t.sort((function(t,e){return t.f-e.f}))}var N=[7,15],M=[11,25],x=function(t){Object(d.a)(n,t);var e=Object(u.a)(n);function n(){var t;return Object(c.a)(this,n),(t=e.call(this)).state={grid:[],mouseDown:!1,start:N,end:M,startNodePressed:!1,endNodePressed:!1,changingWallAllowed:!0,algorithm:""},t}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var t=this.getInitialGrid();this.setState({grid:t})}},{key:"getInitialGrid",value:function(){for(var t=[],e=0;e<15;e++){for(var n=[],s=0;s<50;s++)n.push(D(e,s));t.push(n)}return t}},{key:"setAlgo",value:function(t){this.setState({algorithm:t})}},{key:"animateAlgorithm",value:function(t,e,n){for(var s=this,a=function(a){var i=t[a];i.row===s.state.end[0]&&i.col===s.state.end[1]||i.row===s.state.start[0]&&i.col===s.state.start[1]||setTimeout((function(){document.getElementById("node-".concat(i.row,"-").concat(i.col)).className="node node-visited"}),10*a),a===t.length-1&&n.row===s.state.end[0]&&n.col===s.state.end[1]&&setTimeout((function(){s.animateShortestPath(e)}),10*a)},i=0;i<t.length;i++)a(i)}},{key:"animateShortestPath",value:function(t){for(var e=function(e){setTimeout((function(){var n=t[e];document.getElementById("node-".concat(n.row,"-").concat(n.col)).className="node node-shortest"}),50*e)},n=0;n<t.length;n++)e(n)}},{key:"visuaizeAlgorithm",value:function(){var t=this.state.grid;console.log("start",this.state.start),console.log("end",this.state.end);var e=t[this.state.start[0]][this.state.start[1]],n=t[this.state.end[0]][this.state.end[1]];if(""!==this.state.algorithm){console.log("algorithm",this.state.algorithm);var s=m(t,e,n,this.state.algorithm),a=s[s.length-1];console.log(s);var i=function(t,e){var n=[],s=t[t.length-1];for(s=s.prev;s!==e;)n.push(s),console.log(s),s=s.prev;return n.reverse(),n}(s,e);console.log(i),this.animateAlgorithm(s,i,a)}}},{key:"clearBoard",value:function(){for(var t=this.state.grid,e=0;e<15;e++)for(var n=0;n<50;n++)t[e][n].isWall=!1,t[e][n].distance=1/0,t[e][n].visited=!1,t[e][n].prev=null,t[e][n].f=1/0,t[e][n].g=1/0,t[e][n].heuristic=1/0,document.getElementById("node-".concat(e,"-").concat(n)).className="node";document.getElementById("node-".concat(N[0],"-").concat(N[1])).className="node node-start",document.getElementById("node-".concat(M[0],"-").concat(M[1])).className="node node-end",this.setState({grid:t,start:N,end:M})}},{key:"clearPath",value:function(){for(var t=this,e=this.state.grid,n=0;n<15;n++)for(var s=0;s<50;s++)e[n][s].prev=null,e[n][s].distance=1/0,e[n][s].visited=!1,e[n][s].f=1/0,e[n][s].g=1/0,e[n][s].heuristic=1/0,n===this.state.start[0]&&s===this.state.start[1]||n===this.state.end[0]&&s===this.state.end[1]||!0===e[n][s].isWall||(document.getElementById("node-".concat(n,"-").concat(s)).className="node");this.setState({grid:e},(function(){console.log(t.state.grid)}))}},{key:"onMouseEnter",value:function(t,e){var n=this;if(!1!==this.state.mouseDown){var s=this.state.grid;if(!0===this.state.startNodePressed&&!1===s[t][e].isWall)console.log("Line 132, row: ",t," col: ",e,"grid",s[t][e]),this.setState({start:[t,e]},(function(){console.log("LINE 152 ",n.state.start)})),document.getElementById("node-".concat(t,"-").concat(e)).className="node node-start",console.log("grid",s);else if(!0===this.state.endNodePressed&&!1===s[t][e].isWall)this.setState({end:[t,e]},(function(){})),document.getElementById("node-".concat(t,"-").concat(e)).className="node node-end";else if(!1===this.state.startNodePressed&&!1===this.state.endNodePressed){var a=A(this.state.grid,t,e);this.setState({grid:a,mouseDown:!0})}}}},{key:"onMouseLeave",value:function(t,e){if(!1!==this.state.startNodePressed||!1!==this.state.endNodePressed){var n=this.state.grid;!0===n[t][e].isWall&&!1===this.state.changingWallAllowed||(document.getElementById("node-".concat(t,"-").concat(e)).className="node",n[t][e].isWall=!1,n[t][e].prev=null,n[t][e].distance=1/0,n[t][e].visited=!1,this.setState({grid:n}))}}},{key:"onMouseDown",value:function(t,e){if(t===this.state.start[0]&&e===this.state.start[1]||t===this.state.end[0]&&e===this.state.end[1])t===this.state.start[0]&&e===this.state.start[1]?(this.setState({startNodePressed:!0},(function(){console.log("startNodePressed set to true")})),this.setState({changingWallAllowed:!1})):t===this.state.end[0]&&e===this.state.end[1]&&(this.setState({endNodePressed:!0},(function(){console.log("endNodePressed set to true")})),this.setState({changingWallAllowed:!1}));else{var n=A(this.state.grid,t,e);this.setState({grid:n})}this.setState({mouseDown:!0})}},{key:"onMouseUp",value:function(t,e){t===this.state.start[0]&&e===this.state.start[1]?(this.setState({startNodePressed:!1}),this.setState({changingWallAllowed:!0})):t===this.state.end[0]&&e===this.state.end[1]&&(this.setState({endNodePressed:!1}),this.setState({changingWallAllowed:!0})),this.setState({mouseDown:!1})}},{key:"presentable",value:function(){return"Dijkstra"===this.state.algorithm?"Dijstra's!":"AStar"===this.state.algorithm?"A* Search!":"BFS"===this.state.algorithm?"BFS!":"DFS"===this.state.algorithm?"DFS!":void 0}},{key:"render",value:function(){var t=this,e=this.state.grid;return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("nav",{class:"navbar navbar-dark bg-dark navbar-expand-sm",children:[Object(h.jsx)("a",{class:"navbar-brand fsize pad",href:"#",children:"PathFinder"}),Object(h.jsx)("div",{class:"collapse navbar-collapse",id:"navbar-list-3",children:Object(h.jsx)("ul",{class:"navbar-nav",children:Object(h.jsxs)("li",{class:"nav-item dropdown",children:[Object(h.jsx)("a",{class:"nav-link dropdown-toggle cwhite fsize algo",href:"#",id:"navbarDropdownMenuLink",role:"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false",children:"Algorithms"}),Object(h.jsxs)("div",{class:"dropdown-menu bg-dark","aria-labelledby":"navbarDropdownMenuLink",children:[Object(h.jsx)("a",{class:"dropdown-item cwhite",href:"#",onClick:function(){return t.setAlgo("Dijkstra")},children:"Dijkstra"}),Object(h.jsx)("a",{class:"dropdown-item cwhite",href:"#",onClick:function(){return t.setAlgo("AStar")},children:"A* Search"}),Object(h.jsx)("a",{class:"dropdown-item cwhite",href:"#",onClick:function(){return t.setAlgo("BFS")},children:"BFS"}),Object(h.jsx)("a",{class:"dropdown-item cwhite",href:"#",onClick:function(){return t.setAlgo("DFS")},children:"DFS"})]})]})})})]}),Object(h.jsxs)("button",{className:"container vertical-center bg-dark cwhite fsize",onClick:function(){return t.visuaizeAlgorithm()},children:["Visualize ",this.presentable()]}),Object(h.jsx)("button",{className:"container clear-board bg-dark cwhite fsize",onClick:function(){return t.clearBoard()},children:"Clear Board"}),Object(h.jsx)("button",{className:"container clear-path bg-dark cwhite fsize",onClick:function(){return t.clearPath()},children:"Clear Path"}),Object(h.jsx)("div",{className:"grid",children:e.map((function(e,n){return Object(h.jsx)("div",{className:"rowgap",children:e.map((function(e,n){var s=e.row,a=e.col,i=e.isWall,o=s===t.state.start[0]&&a===t.state.start[1],r=s===t.state.end[0]&&a===t.state.end[1];return Object(h.jsx)(f,{row:s,col:a,isStart:o,isEnd:r,isWall:i,onMouseEnter:function(e,n){return t.onMouseEnter(e,n)},onMouseDown:function(e,n){return t.onMouseDown(e,n)},onMouseUp:function(e,n){return t.onMouseUp(e,n)},onMouseLeave:function(e,n){return t.onMouseLeave(e,n)}})}))},n)}))})]})}}]),n}(s.Component),D=function(t,e){return{row:t,col:e,distance:1/0,visited:!1,prev:null,isWall:!1,f:1/0,g:1/0,heuristic:1/0}},A=function(t,e,n){var s=t.slice(),a=s[e][n],i=Object(r.a)(Object(r.a)({},a),{},{isWall:!a.isWall});return s[e][n]=i,s};var W=function(){return Object(h.jsx)("div",{children:Object(h.jsx)(x,{})})},P=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,20)).then((function(e){var n=e.getCLS,s=e.getFID,a=e.getFCP,i=e.getLCP,o=e.getTTFB;n(t),s(t),a(t),i(t),o(t)}))};o.a.render(Object(h.jsx)(a.a.StrictMode,{children:Object(h.jsx)(W,{})}),document.getElementById("root")),P()}},[[19,1,2]]]);
//# sourceMappingURL=main.1d7fdec4.chunk.js.map