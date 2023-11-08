import { Component,OnInit } from '@angular/core';
import { InventoryService } from '../shared/inventory.service';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  form :FormGroup;
  inventories:any;
  selectedItemId!: string;
  submitted:boolean = false
  isUpdate:boolean = false;
 
  //inject inventory service class
  constructor(private firestore: AngularFirestore,public serviceInventory:InventoryService,private toastr:ToastrService){
    this.form = this.serviceInventory.createForm()
  }
  ngOnInit(){
    this.serviceInventory.getInventories().subscribe((data)=>{
      this.inventories = data
    })
  }
  //create function
  onSubmit(){
    this.isUpdate = false
    this.submitted = true;
    if(this.form.valid){

      const formData = this.form.value;
      
      this.serviceInventory.addInventory(formData)
      this.toastr.success('Created successfully','Inventory ')
      this.form.reset()
      this.submitted = false;
    }
    
    
  }
  //function to select an item for updating
  updateInventory(id: string) {
    this.submitted = true;
    this.isUpdate =true
    if (this.form.valid) {
      const formData = this.form.value;
      this.serviceInventory.updateInventory(id, formData)
      this.toastr.success('Updated successfully', 'Inventory');
      this.form.reset();
      this.submitted = false;
      this.isUpdate = false
      
    }
  }

 
  //populate form with the data to be updated
  populateForm(id: string) {
    this.selectedItemId = id;
    const selectedItem = this.inventories.find((item:any) => item.id === id);
    if (selectedItem) {
      this.form.patchValue(selectedItem);
    }
  }
//delete operation
  deleteInventory(id: string) {
    if(confirm('Are you sure to delete this record ?')){}
    this.serviceInventory.deleteInventory(id)
    this.toastr.error('Deleted successfully','Inventory')
  }
}
