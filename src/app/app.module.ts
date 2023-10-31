import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateContestantPoolFrameComponent } from './components/createContestantPoolFrame/create-contestant-pool-frame/create-contestant-pool-frame.component';
import { SelectedContestantsListComponent } from './components/createContestantPoolFrame/selected-contestants-list/selected-contestants-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateContestantPoolFrameComponent,
    SelectedContestantsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
