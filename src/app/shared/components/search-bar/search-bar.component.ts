import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent {

  @Output() search = new EventEmitter<string>;
  @Input() placeholderText = "Pruebe buscar algo que conozca...";
  public form = this.formBuilder.group({
    searchTerm: ['', [Validators.required]] // otros validadores?
  })

  constructor(private formBuilder: FormBuilder) { }

  public onSearch() {
    this.search.emit(this.form.controls['searchTerm'].value!);
  }
}
