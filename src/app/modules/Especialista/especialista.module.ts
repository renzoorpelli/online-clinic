import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecialistaRoutingModule } from './especialista-routing.module';
import { EspecialistasEspecialidadPipe } from 'src/app/pipes/especialista/especialistas-especialidad.pipe';
import { EspecialistasNombrePipe } from 'src/app/pipes/especialista/especialistas-nombre.pipe';
import { FiltrarEspecialistasPipe } from 'src/app/pipes/especialista/filtrar-especialistas.pipe';
import { EspecialistaRepositoryService } from 'src/app/services/Especialista/especialista-repository.service';
import { ObtenerTurnosEspecialistaComponent } from 'src/app/pages/Especialista/obtener-turnos-especialista/obtener-turnos-especialista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '../Common/form.module';
import { CrearTurnosEspecialistaComponent } from 'src/app/pages/Especialista/crear-turnos-especialista/crear-turnos-especialista.component';
import { CrearAgendaEspecialistaComponent } from 'src/app/pages/Especialista/crear-agenda-especialista/crear-agenda-especialista.component';
import { EspecialistaService } from 'src/app/services/Especialista/especialista.service';
import { TurnosEspecialistaService } from 'src/app/services/Especialista/turnos-especialista.service';
import { TurnoRepositoryService } from 'src/app/services/Turno/turno-repository.service';
import { EspecialistaMainComponent } from 'src/app/pages/Especialista/especialista-main/especialista-main.component';
import { AgendaMainComponent } from 'src/app/pages/Especialista/agenda-main/agenda-main.component';
import { ObtenerAgendaComponent } from 'src/app/pages/Especialista/obtener-agenda/obtener-agenda.component';


@NgModule({
  declarations: [
    EspecialistaMainComponent,
    ObtenerTurnosEspecialistaComponent,
    CrearAgendaEspecialistaComponent,
    CrearTurnosEspecialistaComponent,
    EspecialistasEspecialidadPipe,
    EspecialistasNombrePipe,
    FiltrarEspecialistasPipe,
    ObtenerAgendaComponent,
    AgendaMainComponent

  ],
  imports: [
    CommonModule,
    EspecialistaRoutingModule,
    FormsModule,
    FormModule,
    ReactiveFormsModule
  ],
  providers: [
    EspecialistaRepositoryService,
    EspecialistaService,
    TurnosEspecialistaService,
    TurnoRepositoryService
  ],
  exports:[
    EspecialistasEspecialidadPipe,
    EspecialistasNombrePipe,
    FiltrarEspecialistasPipe
  ]
})
export class EspecialistaModule { }
