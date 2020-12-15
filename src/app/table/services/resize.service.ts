import {ElementRef, Injectable} from '@angular/core';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn : 'root'
})
export class ResizeService {

  rows = []
  delta
  resize = false
  currentColumn
  value
  excelTableHeight

  constructor() {}

  resizeColHandle(e : MouseEvent,
                  col : number,
                  $colResizeLine : HTMLDivElement) {

    this.value = null
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

              this.value = widthCalc > 40 ? widthCalc : 40
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
}
