import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Contestant } from 'src/app/core/interfaces';
import { CustomValidators } from 'src/app/validators/custom-validators';
import { ContestantService } from '../../../../core/services/Contestant.service';
import { TemplateService } from 'src/app/core/services/Template.service';


@Component({
  selector: 'app-selected-contestant-list',
  templateUrl: './selected-contestant-list.component.html',
  styleUrls: ['./selected-contestant-list.component.scss']
})
export class SelectedContestantListComponent{

  @Input() selectedContestants!: Array<Contestant>;
  @Output() removeContestant: EventEmitter<Contestant> = new EventEmitter();
  @Output() createTemplate: EventEmitter<string> = new EventEmitter();
  public disabledForGood = false;
  public posibleFreebiesCount = -1;
  public powerOfTwo: boolean = true;

  public calculatePosibleRounds(): number{
    return this.templateService.calculateMaxRoundCount(this.selectedContestants.length);
  }

  public calculatePosibleFreebies(): number{
    return  this.posibleFreebiesCount = this.templateService.calculateFreebies(this.selectedContestants.length);
  }

  public calculatePosibleMaxContestants(): number{
    return this.templateService.calculateMaxContestants(this.selectedContestants.length);
  }

  public isContestantsPowerOfTwo(): void{
     this.powerOfTwo= this.templateService.isPowerOfTwo(this.selectedContestants.length);
  }

  public form = this.formBuilder.group({
    templateName: ['', [Validators.required], [CustomValidators.templateNameExists(this.contestantService)]],
  })

  constructor(private formBuilder: FormBuilder, private contestantService: ContestantService, private templateService: TemplateService) { }

  public isSubmitEnabled(): boolean {
    return this.selectedContestants.length >= 4 && this.form.valid
  }

  public onRemoveContestant(selectedContestant: Contestant): void {
    this.removeContestant.emit(selectedContestant);
  }

  public onSubmit(): void {
    this.disabledForGood = true;
    this.createTemplate.emit(this.form.controls['templateName'].value!);
  }
}
