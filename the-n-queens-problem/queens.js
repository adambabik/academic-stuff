/*jslint devel: true, browser: true, undef: false, unparam: false, es5: true, vars: false, white: true, plusplus: true, maxerr: 50, indent: 4 */

(function(global) {
	'use strict';
	
	var N = 4,
			solution = [],
			solutions = [],
			$board = null;

	function isAvailable(row, col) {
		var flag = true,
				 i = 0;
  
		for(i = 0; i < row; i++) {
			if(solution[i] === col || col + (row - i) === solution[i] || col - (row - i) === solution[i]) {
				flag = false;
			}
		}
  
		return flag;
	}
  
	function solve(row) {
		var j = 0,
				k = 0,
				temp = null;
		
		for(j = 0; j < N; j++) {
			if(isAvailable(row, j)) {
				solution[row] = j;
  
				if(row === N-1) {
					temp = [];
					for(k = 0; k < N; k++) {
						temp[k] = solution[k];
					}
					solutions.push(temp);
					break;
				}
  
				solve(row+1);
			} else {
				delete solution[row];
			}
		}
	}
  
	function drawBoard(solution) {
		var $wrapper = document.createElement('div'),
				el = null,
				i = 0,
				j = 0;
  
		$wrapper.style.width = $wrapper.style.height = N*50+"px";
  
		for(i = 0; i < N; i++) {
			for(j = 0; j < N; j++) {
				el = document.createElement('span');
				if(solution[i] === j) {
					el.className = 'queen';    
				}
				$wrapper.appendChild(el);
			}
		}
  
		$board.appendChild($wrapper);
	}
  
	function perform() {
		var el = null,
				 i = 0;
		
		$board = document.getElementById('board');
  
		solve(0);
  
		el = document.createElement('h4');
		el.innerText = "For board "+N+"x"+N+" there was generated "+solutions.length+" solutions.";
		$board.appendChild(el);
		for(i = 0; i < solutions.length; i++) {
			drawBoard(solutions[i]);
		}
	}
	
	global.onload = perform;
}(window));