import {Component, OnInit} from '@angular/core';
import {Cell} from './interface/table.interface';
import {SelectedService} from './services/selected.service';
import {ResizeService} from './services/resize.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [SelectedService]
})
export class TableComponent implements OnInit {

  alphabet: string[] = [];
  rows = [];
  selectedCell = {row: 0, cell: 0};
  editCell = {row: null, cell: null};

  constructor(
    private selectedService: SelectedService,
    private resizeService : ResizeService
  ) {
  }

  ngOnInit(): void {
    this.creatAlphabet();
    this.creatRow(50);
    this.resizeService.rows = this.rows
  }

  creatAlphabet() {
    const alphabet = [];
    const A_start = 'A'.charCodeAt(0);
    const Z_end = 'Z'.charCodeAt(0);

    for (let i = A_start; i < Z_end + 1; i++) {
      alphabet.push(String.fromCharCode(i));
    }

    this.alphabet = alphabet;
  }

  creatRow(countRow: number) {

    this.rows = new Array(countRow)
                .fill('')
                .map((_, rowI) =>
                  new Array(this.alphabet.length)
                    .fill('')
                    .map((_, cellI): Cell => {
                      return {
                        col: cellI,
                        row: rowI,
                        borderTop: rowI === 0 && cellI === 0,
                        borderRight: rowI === 0 && cellI === 0,
                        borderBottom: rowI === 0 && cellI === 0,
                        borderLeft: rowI === 0 && cellI === 0,
                        width : 120,
                      };
                    })
                );
  }

  selected(event: MouseEvent, row = 0, col = 0) {

    if (!event.shiftKey) {
      this.selectedService.clearSelected(this.rows);

      this.selectedService.updateOneCell(row, col, this.rows);

      this.selectedCell.row = row;
      this.selectedCell.cell = col;
    }

    this.selectedService.mouseDownFlag = true;
  }

  selectedGroup(event: MouseEvent, row, col) {
    this.selectedService.clearSelected(this.rows);

    const rows = this.selectedService.range(this.selectedCell.row, row);
    const cols = this.selectedService.range(this.selectedCell.cell, col);

    const groupCell = this.selectedService.createGroup(rows, cols);

    this.selectedService.updateGroupCells(groupCell, this.rows);
  }

  setCellEdit(row, col, cell: HTMLDivElement) {
    this.editCell.row = row;
    this.editCell.cell = col;

    const fn = setTimeout(focusEl);

    function focusEl() {
      cell.focus();
      clearTimeout(fn);
    }
  }
}
