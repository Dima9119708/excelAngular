import {Injectable} from '@angular/core';
import {Cell} from '../interface/table.interface';

@Injectable()
export class SelectedService {

  rows = []
  mouseDownFlag = false
  selectedCell = { row: 0, cell: 0 }
  editCell = { row: null, cell: null, edit : false}

  constructor() {}

  range(start, end) {
    let min = start > end ? end : start
    let max = start > end ? start : end

    const arr = []

    for (let i = min; i < max + 1; i++) {
      arr.push(i)
    }

    return arr
  }

  createGroup(rows, cols) {
    return rows.reduce((acc, row) => {

      acc.push(
        cols.reduce((arrCell, cell) => {
          arrCell.push( { row, col: cell } )

          return arrCell
        }, [])
      );

      return acc
    }, [])
  }

  setCellEdit(row, col, cell: HTMLDivElement) {
    this.editCell.row = row;
    this.editCell.cell = col
    this.editCell.edit = true

    const fn = setTimeout(focusEl);

    function focusEl() {
      (<HTMLDivElement>cell.children[0]).focus();
      clearTimeout(fn);
    }
  }

  selected(event: MouseEvent, row = 0, col = 0) {

    if (!event.shiftKey) {
      this.clearSelected();
      this.updateCell(row, col);
    }
    this.cellOverflow()

    if(!this.editCell.edit) this.mouseDownFlag = true
  }

  selectedGroup(event: MouseEvent, row, col) {

      if(this.mouseDownFlag) {
        this.clearSelected();

        const rows = this.range(this.selectedCell.row, row);
        const cols = this.range(this.selectedCell.cell, col);

        const groupCell = this.createGroup(rows, cols);

        this.updateGroupCells(groupCell);
      }
  }

  updateGroupCells(groupCell) {

    groupCell.forEach( (row, rowI) => {

      row.forEach( (cell, colI) => {
        const { row, col } = cell

        const top = groupCell[rowI - 1]?.[colI]
        const bottom = groupCell[rowI + 1]?.[colI]
        const right = groupCell[rowI][colI + 1]
        const left = groupCell[rowI][colI - 1]

        this.rows[row][col].borderTop = top ? false : true
        this.rows[row][col].borderRight = right ? false : true
        this.rows[row][col].borderBottom = bottom ? false : true
        this.rows[row][col].borderLeft = left ? false : true
      })
    })
  }

  updateCell(row, col) {
    this.selectedCell.row = row
    this.selectedCell.cell = col

    this.rows[row][col].borderTop = true
    this.rows[row][col].borderRight = true
    this.rows[row][col].borderLeft = true
    this.rows[row][col].borderBottom = true
  }

  cellOverflow() {
    if ( this.selectedCell.row !== this.editCell.row
         ||
         this.selectedCell.cell !== this.editCell.cell
    ) {
      this.editCell.row = null
      this.editCell.cell = null
      this.editCell.edit = false
    }
  }

  clearSelected() {
    this.rows.forEach( row => {
      row.forEach( (cell : Cell) => {
        cell.borderTop = false
        cell.borderRight = false
        cell.borderLeft = false
        cell.borderBottom = false
      })
    })
  }

  clearMouseDownFlag() {
    this.mouseDownFlag = false
  }
}
