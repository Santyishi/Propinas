import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PropinasComponent } from './propinas/propinas.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { PropinasService } from './propinas.service';

@NgModule({
  declarations: [
    AppComponent,
    PropinasComponent,
    ResultadosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [PropinasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
