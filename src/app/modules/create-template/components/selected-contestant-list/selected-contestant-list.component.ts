import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Contestant } from 'src/app/core/interfaces';

@Component({
  selector: 'app-selected-contestant-list',
  templateUrl: './selected-contestant-list.component.html',
  styleUrls: ['./selected-contestant-list.component.css']
})
export class SelectedContestantListComponent {

  @Input() selectedContestants!: Array<Contestant>;
  @Output() removeContestant: EventEmitter<Contestant> = new EventEmitter();
  @Output() createTemplate: EventEmitter<string> = new EventEmitter();

  public form = this.formBuilder.group({
    templateName: ['', [Validators.required]], // async validator prevent dupp names
  })

  constructor(private formBuilder: FormBuilder) { }

  public isSubmitEnabled(): boolean {
    return this.selectedContestants.length >=4 && this.form.valid
  }

  public onRemoveContestant(selectedContestant: Contestant): void {
    this.removeContestant.emit(selectedContestant);
  }

  public onSubmit(): void {
    this.createTemplate.emit(this.form.controls['templateName'].value!);
    // add confirmation layer as pop up
  }
}
