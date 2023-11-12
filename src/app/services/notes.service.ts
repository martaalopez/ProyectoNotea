import { Injectable } from '@angular/core';
import { INote } from '../model/INote';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private dbPath = '/notes';
  notesRef!: AngularFirestoreCollection<any>;

  public notes: INote[] = [];

  constructor(private db: AngularFirestore, private loginS: LoginService) {
    this.notesRef = db.collection(this.dbPath);

    // Cargar todas las notas del servidor al iniciar el servicio
    this.loadNotes();
  }

  private loadNotes() {
    this.notesRef.get().subscribe((d) => {
      let docs = d.docs;
      this.notes = docs.map((d) => {
        return { id: d.id, ...d.data() };
      });
    });
  }

  public async createNote(newNote: INote) {
    // Asociar la nota con el id_user del usuario actual
    newNote.id_user = this.loginS.user?.id_user || '';
    
    try {
      let { id, ...newNoteWithoutID } = newNote;
      let dRef: DocumentReference<any> = await this.notesRef.add({ ...newNoteWithoutID });
      newNote.id = dRef.id;
      this.notes.push(newNote);
    } catch (err) {
      console.error(err);
    }
  }

  public async removeNote(id: any): Promise<void> {
    let newNotes = this.notes.filter((n) => {
      return n.id != id;
    });
    this.notes = newNotes;
    return this.notesRef.doc(id).delete();
  }

  public getNotes(): INote[] {
    // Filtrar notas por el id_user del usuario actual
    return this.notes.filter((note) => note.id_user === this.loginS.user?.id_user);
  }

  public updateNote(note: INote): Promise<void> {
    let idtobeupdated: any;
    let data: any;
    this.notes.forEach((n) => {
      if (n.id == note.id) {
        n.title = note.title;
        n.description = note.description;
        let { id, ...newData } = note;
        idtobeupdated = id;
        data = newData;
      }
    });
    if (idtobeupdated) {
      return this.notesRef.doc(idtobeupdated as string).update(data);
    } else {
      return Promise.resolve();
    }
  }

  public customQuery() {
    const q = this.notesRef.ref.where("title", "==", "Hello").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      }).catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
}
