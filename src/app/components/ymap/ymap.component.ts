import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

declare var ymaps: any;
// declare var map: any;

export interface Mark {
  coords: [number, number],
}

@Component({
  selector: 'ymap',
  templateUrl: './ymap.component.html',
  styleUrls: ['./ymap.component.scss']
})
export class YmapComponent implements OnInit, OnChanges {
  @Input() center?: [number, number];
  @Input() zoom: number = 12;
  @Input() markCoords?: [number, number];
  @Input() marksOn: boolean = false;
  @Input() movable: boolean = false;
  @Output() markCoordsChange = new EventEmitter<[number, number]>();
  private mark?: any;
  private map: any;
  
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes['markCoords'].currentValue);
    // const coords = changes['markCoords'].currentValue;
    // if (this.marksOn && ymaps && coords) {
    //   this.mark = this.createPlacemark(coords);
    //   this.getAddress(coords);
    //   console.log(this.mark);
    // }
    // if (this.map) {
    //   console.log(this.map);
    //   this.map.geoObjects.add(this.mark);
    // }
  }

  checkFlag(flag: boolean) {
    if(flag === false) {
      window.setTimeout(this.checkFlag, 100);
    }
  }

  ngOnInit(){
    this.checkFlag(!!this.markCoords);
    ymaps.ready().then(() => {
      console.log('map is ready!')
      if (!this.center) {
        this.center = [56.852677, 53.206896];
      }

      this.map = new ymaps.Map('map', {
        center: this.center,
        zoom: this.zoom,
      });
      
      if (this.marksOn) {
        
        if (this.markCoords) {
          this.mark = this.createPlacemark(this.markCoords);
          this.map.geoObjects.add(this.mark);
          this.getAddress(this.markCoords);
          console.log(this.mark);
        }

        if (this.movable) {
          // Слушаем клик на карте.
          this.map.events.add('click', (e: any) => {
            var coords = e.get('coords');
      
            // Если метка уже создана – просто передвигаем ее.
            if (this.mark) {
              this.mark.geometry.setCoordinates(coords);
              console.log('move mark')
            }
            // Если нет – создаем.
            else {
              this.mark = this.createPlacemark(coords);
              this.map.geoObjects.add(this.mark);
              // Слушаем событие окончания перетаскивания на метке.
              this.mark.events.add('dragend', () => {
                const coords = this.mark.geometry.getCoordinates();
                this.getAddress(coords);
                this.markCoordsChange.emit(coords)
              });
            }
            this.markCoordsChange.emit(coords)
            this.getAddress(coords);
          });
        }
      }
    });
  }

  // Создание метки.
  createPlacemark(coords: [number, number]) {
    return new ymaps.Placemark(coords, {
      iconCaption: 'поиск...'
    }, {
      preset: 'islands#blueLeisureIcon',
      draggable: this.movable
    });
  }

  // Определяем адрес по координатам (обратное геокодирование).
  getAddress(coords: [number, number]) {
    this.mark.properties.set('iconCaption', 'поиск...');
    ymaps.geocode(coords).then((res: any) => {
      var firstGeoObject = res.geoObjects.get(0);
      this.mark.properties.set({
        // Формируем строку с данными об объекте.
        iconCaption: [
          // Название населенного пункта или вышестоящее административно-территориальное образование.
          firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
          // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
          firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
        ].filter(Boolean).join(', '),
        // В качестве контента балуна задаем строку с адресом объекта.
        balloonContent: firstGeoObject.getAddressLine()
      });
    });
  }
}
