import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { InventoryComponent } from './inventory.component';
import { InventoryService } from '../shared/inventory.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder } from '@angular/forms';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;
  let inventoryService: InventoryService;
  let toastrService: ToastrService;
  let firestoreService: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryComponent],
      providers: [
        FormBuilder,
        { provide: AngularFirestore, useValue: {} },
        { provide: ToastrService, useValue: {} },
        InventoryService, // Provide your InventoryService here
      ],
    });
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // Initialize services and components
    inventoryService = TestBed.inject(InventoryService);
    toastrService = TestBed.inject(ToastrService);
    firestoreService = TestBed.inject(AngularFirestore);
  });

  it('should create an inventory item', () => {
    const formData = { itemName: 'Test Item', supplier: 'Test Supplier', cost: 10, description: 'Test Description' };
    spyOn(inventoryService, 'addInventory');
  
    component.form.setValue(formData);
    component.onSubmit();
    
    // Expectations for successful creation
    expect(component.form.reset).toHaveBeenCalled();
    expect(toastrService.success).toHaveBeenCalledWith('Created successfully', 'Inventory');
  });

  it('should delete an inventory item', fakeAsync(() => {
    const itemId = 'item_id_to_delete';
    spyOn(inventoryService, 'deleteInventory').and.returnValue(Promise.resolve());
  
    component.deleteInventory(itemId);
    tick();
  
    // Expectations for successful deletion
    expect(inventoryService.deleteInventory).toHaveBeenCalledWith(itemId);
    // You can also handle success or error as needed
  }));

  it('should update an inventory item', () => {
    const itemId = 'item_id_to_update';
    const formData = { itemName: 'Updated Item', supplier: 'Updated Supplier', cost: 20, description: 'Updated Description' };
  
    spyOn(inventoryService, 'updateInventory').and.returnValue(Promise.resolve());
  
    component.form.setValue(formData);
    component.updateInventory(itemId);
  
    // Expectations for successful update
    expect(component.form.reset).toHaveBeenCalled();
    expect(inventoryService.updateInventory).toHaveBeenCalledWith(itemId, formData);
  });
});
