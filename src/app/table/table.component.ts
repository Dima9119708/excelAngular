import {Component, OnInit} from '@angular/core';
import {Cell} from './interface/table.interface';
import {SelectedService} from './services/selected.service';
import {ResizeService} from './services/resize.service';
import { KeyboardService } from './services/keyboard.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [SelectedService,
              ResizeService,
              KeyboardService
  ]
})
export class TableComponent implements OnInit {

  alphabet: string[] = [];
  rows = [];

  constructor(
    private selectedService: SelectedService,
    private resizeService : ResizeService,
    private keyboardService : KeyboardService
  ) {}

  ngOnInit(): void {
    this.creatAlphabet();
    this.creatRow(50);

    this.resizeService.rows = this.rows
    this.selectedService.rows = this.rows

    this.keyboardService.rows = this.rows
    this.keyboardService.keyboardHandle()
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
                        height : 30
                      };
                    })
                );
  }
}
