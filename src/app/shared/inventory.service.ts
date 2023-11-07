import { Injectable } from '@angular/core';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { AngularFirestore ,AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  
   // inside the firestore db create a collection with the name inventories
  private firestoreCollection = this.firestore.collection('inventories', (ref) =>
    ref.orderBy('itemName')
  );
  
  constructor(private fb:FormBuilder, private firestore:AngularFirestore) { 
    
  }
  //defining form controls
  createForm():FormGroup{
    return this.fb.group({
        itemName:["",Validators.required],
        supplier:["",Validators.required],
        cost:["",Validators.required],
        description:["",Validators.required],
      })
  }
  //add inventory
  addInventory(data:any){
    return this.firestoreCollection.add(data)
  }
  //get inventories 
  getInventories(){
    return this.firestoreCollection.valueChanges({ idField: 'id' })
  }
  //update inventory
  updateInventory(id:string,data:any){
    
    return this.firestoreCollection.doc(id).update(data)
    
  }
  //delete inventory
  deleteInventory(id:string){
    
    return this.firestoreCollection.doc(id).delete()
   }
}
