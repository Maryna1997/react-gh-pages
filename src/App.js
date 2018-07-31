import React, { Component } from 'react';
import update from 'immutability-helper';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
		super(props);
		 
		this.state = {
			rows: [],
			row: [],
			remColLeft: '',
			remRowTop: '',
			isMouseOverTable: 'false',
			isMouseOverButton: 'false',
			isClickButton: 'false',
			remCol: '',
			remRow: ''
		};
		
		this.addCol = this.addCol.bind(this);
		this.addRow = this.addRow.bind(this);
		this.deleteCol = this.deleteCol.bind(this);
		this.deleteRow = this.deleteRow.bind(this);
		this.displayButton = this.displayButton.bind(this);
		this.nodisplayButton = this.nodisplayButton.bind(this);
	} 

			
	displayButton(event) {
		if(event.target.tagName == 'TD') {
			var left = event.target.offsetLeft;
			var top = event.target.offsetTop;
			let colNumber = event.target.getAttribute('data-col');
			let rowNumber = event.target.getAttribute('data-row');
			this.setState({
				isMouseOverTable: 'trueTD',
				remColLeft: left,
				remCol: colNumber,
				remRowTop: top,
				remRow: rowNumber
			});								
		}
		else {
			if(event.target.tagName == 'TABLE') {
				this.setState({
					isMouseOverTable: 'trueTABLE'
				});
			}
			else {
				this.setState({
					isMouseOverButton: 'true'
				});
			}
		}
	}
		
	
	nodisplayButton() {
		this.setState({
			isMouseOverTable: 'false',
			isMouseOverButton:'false'
		});
	}
	
	
	genRow() {
		const {
			initialWidth, 
			initialHeight, 
			cellSize
		} = this.props;
		const {
			rows
		} = this.state;
		const styleTD = {width: cellSize, height: cellSize};	
		
		if(rows.length == 0) {
				let genRow = [];
				for(var j = 0; j < initialWidth; j++) {
					genRow[j] = " ";
				}
				this.setState({
					row: genRow
				});
				let genTable = [];
				for(var i = 0; i < initialHeight; i++) {
					genTable[i] = genRow;
				}
				
				this.setState({
					rows: genTable
				});
			}
			
		
		return rows.map(function(v, k) {
			var tmp = v.map(function(v2, l) {
				return (
					<td key = {'td' + k + '_' + l} data-row = {k} data-col = {l} style = {styleTD}>
						{v2}
					</td>
				);
			});

			return (
				<tr key = {'tr' + k} >
					{tmp}
				</tr>
			)
		});
	}
		
	addRow() {
		const {
			row,
			rows
		} = this.state;
		const newRows = update(rows, {$push: [row]});
		this.setState({
			rows: newRows
		});
	}

	addCol() {
		const {
			row,
			rows
		} = this.state;
		const newRow = update(row, {$push: [" "]});
		this.setState({
			row: newRow
		});
		let newRows = [];
		for(var i = 0; i < rows.length; i++) {
			if (rows[i] != null) {
				newRows[i] = newRow;
			}
		}
		this.setState({
			rows:newRows
		});
	}

	deleteRow() {
		const {
			rows,
			remRow
		} = this.state;
		const newRows = rows;
		delete newRows[remRow];
		this.setState({
			rows: newRows,
			isClickButton: 'true',
			isMouseOverButton: 'false'
		});
	}

	deleteCol() {
		const {
			row,
			rows,
			remCol
		} = this.state;
		const newRow = row;
		delete newRow[remCol];
		this.setState({
			row: newRow
		});
		let newRows = [];
		for(var i = 0; i < rows.length; i++) {
			if (rows[i] != null) {
				newRows[i] = newRow;
			}
		}
		this.setState({
			rows:newRows,
			isClickButton: 'true',
			isMouseOverButton: 'false'
		});
	}
	
	locateButton() {
		const {
			isMouseOverTable,
			isMouseOverButton,
			isClickButton,
			remColLeft, 
			remRowTop,
			row,
			rows
		} = this.state;
		const {
			cellSize
		} = this.props;
		const styleButton = {width: cellSize, height: cellSize};
		var remColStyle, remRowStyle;
		
		var countCol = 0, countRow = 0;
		for(var i = 0; i < rows.length; i++) {
			if (rows[i] != null) {
				countCol++;
			}
		}
		
		for(var j = 0; j < row.length; j++) {
			if (row[j] != null) {
				countRow++;
			}
		}
		
		if(isClickButton == 'true') {
			remColStyle = {display: 'none', width: '0px'};
			remRowStyle = {display: 'none', height: '0px'};
		}
		if(isMouseOverTable == 'false') {
			remColStyle = {display: 'none'};
			remRowStyle = {display: 'none'};
		}
		
		if(isMouseOverTable == 'trueTD') {
			if(countRow > 1) {
				remColStyle = {display: 'block', left: remColLeft, width: cellSize, paddingLeft: cellSize};
			}
			if(countCol > 1) {
				remRowStyle = {display: 'block', top: remRowTop, height: cellSize, paddingTop: cellSize};
			}
			
		}
		if(isMouseOverTable == 'trueTABLE') {
			if(countRow > 1) {
				remColStyle = {display: 'block', left: remColLeft, paddingLeft: cellSize};
			}
			if(countCol > 1) {
				remRowStyle = {display: 'block', top: remRowTop, paddingTop: cellSize};
				
			}
		}
		
		if(isMouseOverButton == 'true') {
			if(countRow > 1) {
				remColStyle = {display: 'block', left: remColLeft, width: cellSize, paddingLeft: cellSize};
			}
			if(countCol > 1) {
				remRowStyle = {display: 'block', top: remRowTop, height: cellSize, paddingTop: cellSize};
			}
		}
		
		return(
		<div>
			<div id = "remCol" style = {remColStyle} onMouseOver = {this.displayButton} onMouseOut = {this.nodisplayButton}>
				<button className = "minus" style = {styleButton} onClick = {this.deleteCol}>-</button>
			</div>
			<div id = "remRow" style = {remRowStyle} onMouseOver = {this.displayButton} onMouseOut = {this.nodisplayButton}>
				<button className = "minus" style = {styleButton} onClick = {this.deleteRow}>-</button>
			</div>
		</div>
		);
		
	}

	render() {
		const {
			cellSize
		} = this.props;
		const styleButton = {width: cellSize, height: cellSize};
		const styleWrapper = {marginTop: cellSize, marginLeft: cellSize};
	
		return (
			<div id = "wrapper" style = {styleWrapper}>
				<div id = "tbl" onMouseOver = {this.displayButton} onMouseOut = {this.nodisplayButton}>
					<table >	
						<tbody>					
							{this.genRow()}
						</tbody>	
					</table>
				</div>
				<button style = {styleButton} onClick = {this.addCol} className = "plus" id = "buttonAddCol">+</button>
				<button style = {styleButton} onClick = {this.addRow} className = "plus" id = "buttonAddRow">+</button>
				{this.locateButton()}
			</div>
		);
	}
}

export default App;
