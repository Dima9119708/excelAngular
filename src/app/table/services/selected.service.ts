import {Injectable} from '@angular/core';
import {Cell} from '../interface/table.interface';

@Injectable({
  providedIn: 'root',
})
export class SelectedService {

  rows = []
  mouseDownFlag = false

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

  updateGroupCells(groupCell, rows) {

    this.rows = rows

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

  updateOneCell(row, col, rows) {
    this.rows = rows

    this.rows[row][col].borderTop = true
    this.rows[row][col].borderRight = true
    this.rows[row][col].borderLeft = true
    this.rows[row][col].borderBottom = true
  }

  clearSelected(rows) {
    this.rows = rows

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
