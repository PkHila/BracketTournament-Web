import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Contestant } from 'src/app/core/interfaces';
import { CustomValidators } from 'src/app/validators/custom-validators';
import { ContestantService } from '../../../../core/services/Contestant.service';

@Component({
  selector: 'app-selected-contestant-list',
  templateUrl: './selected-contestant-list.component.html',
  styleUrls: ['./selected-contestant-list.component.scss']
})
export class SelectedContestantListComponent {

  @Input() selectedContestants!: Array<Contestant>;
  @Output() removeContestant: EventEmitter<Contestant> = new EventEmitter();
  @Output() createTemplate: EventEmitter<string> = new EventEmitter();

  public form = this.formBuilder.group({
    templateName: ['', [Validators.required], CustomValidators.templateNameExists(this.contestantService)],
  })

  constructor(private formBuilder: FormBuilder, private contestantService: ContestantService) { }

  public isSubmitEnabled(): boolean {
    return this.selectedContestants.length >= 4 && this.form.valid
  }

  public onRemoveContestant(selectedContestant: Contestant): void {
    this.removeContestant.emit(selectedContestant);
  }

  public onSubmit(): void {
    this.createTemplate.emit(this.form.controls['templateName'].value!);
    // add confirmation layer as pop up
  }
}
