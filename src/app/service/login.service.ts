import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
// import { AngularFireDatabase} from 'angularfire2/database';
import { Item } from '../models/login';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(public afs: AngularFirestore) { 
    this.itemsCollection = this.afs.collection('login', ref => ref.orderBy('username','asc'));
    this.items = this.itemsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  getItems() {
    return this.items;
  }

  addItem(item: Item) {
    this.itemsCollection.add(item);
  }

  deleteItem(item: Item) {
    this.itemDoc = this.afs.doc(`login/${item.id}`);
    this.itemDoc.delete();
  }

  updateItem(item: Item) {
    this.itemDoc = this.afs.doc(`login/${item.id}`);
    this.itemDoc.update(item);
  }

}
