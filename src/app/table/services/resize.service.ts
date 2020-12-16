import {Injectable} from '@angular/core';
import { fromEvent } from 'rxjs';

@Injectable()
export class ResizeService {

  rows = []
  delta
  value
  resize = false
  currentColumn
  currentRow
  excelTableHeight
  excelTableWidth
  minHeight = 30
  minWidth = 40

  constructor() {}

  resizeCol(e : MouseEvent,
            col : number,
            $colResizeLine : HTMLDivElement) {

    this.value = null
    this.currentRow = null
    this.currentColumn = col

    $colResizeLine.style.height = this.excelTableHeight + 'px'

    let widthCalc = null

    const handleMouseMove =
      fromEvent(document, 'mousemove')
      .subscribe(( event : MouseEvent ) => {
          const documentX = event.pageX
          const targetX = e.x

          this.delta = (documentX - targetX) + 5
          widthCalc = this.rows[col][col].width + this.delta

          this.resize = true
      });

    const handleMouseUp =
          fromEvent(document, 'mouseup')
          .subscribe(_ => {

            if(widthCalc) {

              this.value = widthCalc > this.minWidth ? widthCalc : this.minWidth
              this.delta = 5

              this.rows.forEach(row => {
                row[col].width = this.value
              })

              this.resize = false
            }

            $colResizeLine.style.height = null

            handleMouseMove.unsubscribe()
            handleMouseUp.unsubscribe()
          })
  }


  resizeRow(e : MouseEvent,
            row : number,
            $rowResizeLine : HTMLDivElement) {

    this.value = null
    this.currentColumn = null
    this.currentRow = row

    $rowResizeLine.style.width = this.excelTableWidth + 'px'

    let heightCalc = null

    const handleMouseMove =
      fromEvent(document, 'mousemove')
        .subscribe(( event : MouseEvent ) => {
          const documentY = event.y
          const targetY = e.y

          this.delta = (documentY - targetY) + 6
          heightCalc = this.rows[row][0].height + this.delta

          this.resize = true
        });

    const handleMouseUp =
      fromEvent(document, 'mouseup')
        .subscribe(_ => {

          if( heightCalc ) {

            this.value = heightCalc > this.minHeight ? heightCalc : this.minHeight
            this.delta = 5

            this.rows[row].forEach(cell => {
              cell.height = this.value
            })

            this.resize = false
          }

          $rowResizeLine.style.width = null

          handleMouseMove.unsubscribe()
          handleMouseUp.unsubscribe()
        })
  }
}
