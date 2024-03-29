import { Injectable } from '@angular/core';
import { Repository } from 'src/app/Data/common-repository.interface';
import { Observable } from 'rxjs';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  arrayUnion,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Usuario } from 'src/app/interfaces/Usuario';
import { Paciente } from 'src/app/interfaces/Paciente';
import { Turno } from 'src/app/interfaces/Turno';

@Injectable({
  providedIn: 'root',
})
export class PacienteRepositoryService implements Repository<Paciente> {
  listadoPacientes!: CollectionReference<DocumentData>;

  listadoPacientes$!: Observable<Paciente[]>;

  constructor(private _firestore: Firestore) {
    this.listadoPacientes = collection(this._firestore, 'pacientes');
    this.listadoPacientes$ = collectionData(
      this.listadoPacientes
    ) as Observable<Paciente[]>;
  }
  getAll(): Observable<Paciente[]> {
    return this.listadoPacientes$;
  }

  create(entity: Paciente, uid: string): string {
    if (this.listadoPacientes) {
      // obtengo referencia al id del doucmento para asignarlo a un campo del actor.
      let docRef: DocumentReference<DocumentData> = doc(this.listadoPacientes);
      const newItem: any = {
        ...entity,
        docRefPaciente: docRef.id,
        idUsuarioUid: uid,
      };

      setDoc(docRef, newItem);
      return docRef.id;
    }
    return '';
  }

  update(docRef: string, ...args: unknown[]): boolean {
    throw new Error('Method not implemented.');
  }
  delete(docRef: string): boolean {
    // el guid que genera el doc
    const documentReference = doc(this.listadoPacientes, 'pacientes', docRef);

    if (!documentReference) {
      deleteDoc(documentReference);
      return true;
    }
    return false;
  }

  async getPacienteByDocRef(pacientDocRef: string): Promise<DocumentSnapshot> {
    const documentReference = doc(this.listadoPacientes, pacientDocRef);
    return await getDoc(documentReference);
  }

  updateShiftAttriubte(turno:Turno, docRefPaciente:string ){
    try {
      const documentReference = doc(this.listadoPacientes, docRefPaciente);
      updateDoc(documentReference, {
        turnos: arrayUnion(turno)
      });
    } catch (e) {
      console.log(e);
    }
    return false;
  }

  updateShiftStatusPacient(shiftModified:Turno, docRefPacient:string){

    const pacient = this.getPacienteByDocRef(docRefPacient);

    pacient.then(data => {
      let especialistFromFirebase = data.data() as Paciente;

      const index = especialistFromFirebase.turnos!.findIndex(t => t.idTurnoDocRef === shiftModified.idTurnoDocRef);

      if (index !== -1) {
        especialistFromFirebase.turnos![index] = shiftModified;

        const pacientRef = doc(this.listadoPacientes, docRefPacient);
        updateDoc(pacientRef, {turnos: especialistFromFirebase.turnos});
      } else {
        console.log("No se encontró el turno");
      }
    });
  }


  addClinicHistoryToPatient(pacient:Paciente, clinicHistory:any){
    try {
      const pacientRef = doc(this.listadoPacientes, pacient.docRefPaciente!);

      updateDoc(pacientRef, {
        historiaClinica: clinicHistory
      })

    } catch (error) {
      console.log(error)
    }
  }
}
