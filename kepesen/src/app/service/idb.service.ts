import { Injectable } from '@angular/core';
import idb from 'idb';

@Injectable()
export class IdbService {

  // dbPromise : any;

  constructor() {
    // this.dbPromise = idb.open('keyval-store', 1, db => {
    //   db.createObjectStore('keyval');
    // });
  }

  dbPromise(){
    return idb.open('keyval-store', 1, db => {
      db.createObjectStore('keyval');
    });
  }
 
  get(key) {
    return this.dbPromise().then(db => {
      return db.transaction('keyval')
        .objectStore('keyval').get(key);
    });
  };

  set(key, val) {
    return new Promise( resolve => {
      return this.dbPromise().then(db => {
        const tx = db.transaction('keyval', 'readwrite');
        tx.objectStore('keyval').put(val, key);
        return tx.complete.then(()=>{
          resolve(val);
        })
      })
    })
  }

  getUserId() {
    return new Promise( resolve => {
      this.get('userId').then( userId => {
        if(userId){
          console.log('Get userId from indexedDB');
          resolve(userId);
        }
        else {
          console.log('Creating new userId');
          let newUserId = (new Date()).getTime().toString() + (Math.floor(Math.random() * (9999 - 1000) + 1000)).toString();
          this.set('userId', newUserId).then(() => {
            resolve(newUserId);
          });
        }
      })
    })
  }

}
