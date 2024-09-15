import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db'

const dbConfig: DBConfig = {
  name: 'BracketTournamentDB',
  version: 1,
  objectStoresMeta: [{
    store: 'templates',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'templateName', keypath: 'templateName', options: { unique: true, index: true } },
      { name: 'category', keypath: 'category', options: { unique: false, index: true } },
      { name: 'timesPlayed', keypath: 'timesPlayed', options: { unique: false } },
      { name: 'contestants', keypath: 'contestants', options: { unique: false } }
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    SharedModule,
    AppRoutingModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
