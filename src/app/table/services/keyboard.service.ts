import {Injectable} from '@angular/core';
import {fromEvent} from 'rxjs';
import {SelectedService} from './selected.service';

@Injectable()
export class KeyboardService {

  rows = []

  constructor(private selectedService : SelectedService) {}

  keyboardHandle() {

    fromEvent(document, 'keydown')
      .subscribe((event: KeyboardEvent) => {

        const { row, cell } = this.selectedService.selectedCell
        const { edit } = this.selectedService.editCell

        const up = event.key === 'ArrowUp'
        const down = event.key === 'ArrowDown'
        const right = event.key === 'ArrowRight'
        const left = event.key === 'ArrowLeft'
        const enter = event.key === 'Enter'
        const tab = event.key === 'Tab'

        if (up && this.rows[row - 1] && !edit) {
          this.selectedService.clearSelected()
          this.selectedService.updateCell(row - 1, cell)
        }
        else if ( down && this.rows[row + 1] && !edit ) {
          this.selectedService.clearSelected()
          this.selectedService.updateCell(row + 1, cell)
        }
        else if ( right && this.rows[row][cell + 1] && !edit) {
          this.selectedService.clearSelected()
          this.selectedService.updateCell(row, cell + 1)
        }
        else if ( left && this.rows[row][cell - 1] && !edit ) {
          this.selectedService.clearSelected()
          this.selectedService.updateCell(row, cell - 1)
        }
        else if ( tab && this.rows[row][cell + 1] ) {
          event.preventDefault()
          this.selectedService.clearSelected()
          this.selectedService.updateCell(row, cell + 1)
          this.selectedService.cellOverflow()
        }
        else if ( enter && this.rows[row + 1] ) {
          this.selectedService.clearSelected()
          this.selectedService.updateCell(row + 1, cell)
          this.selectedService.cellOverflow()
        }
      })
  }
}
