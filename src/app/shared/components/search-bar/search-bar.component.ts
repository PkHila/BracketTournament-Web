import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent {
  public searchTerm: string = '';
  @Output() search = new EventEmitter<string>;

  public onSearch () {
    this.search.emit(this.searchTerm);
  }

  /**
   * todo:
   * reactive Form para prevenir vacios
   * tal vez mostrar las busquedas recientes 
   * aunque eso no esta implementado para prevenir pegarle a la api
   */
}
