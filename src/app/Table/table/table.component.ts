import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Item } from 'src/app/interfaces/item';

import { DataServiceService } from 'src/app/services/data-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  item: any; 
  isVisible = false;
  modalTitle = 'Add Item';
  validateForm!: FormGroup;
  
  data: Item[] = [];
  currentEditId: number | undefined ;
  message: any;
  
  constructor(
    private modal: NzModalService,
    private fb: FormBuilder,
    private dataService: DataServiceService
  ) {}

  ngOnInit(): void {
    this.data = this.dataService.getData();
    this.validateForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  showModal(): void {
    this.modalTitle = 'Add New Item';
    this.currentEditId = this.currentEditId;
    this.isVisible = true;
    this.validateForm.reset();
  }

  handleOk(): void {
    console.log('handleOk');
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.validateForm.valid) {
      console.log(this.validateForm.value);
      this.isVisible = false;
      this.addData(this.validateForm.value);
      this.validateForm.reset();
    }
  }

  handleCancel(): void {
    console.log('handleCancel');
    this.isVisible = false;
    this.validateForm.reset();
  }

  addData(item: any) {
    const newId = this.data.length + 1;
    const newItem = { id: newId, ...item };
    this.dataService.addItem(newItem);
    this.data = this.dataService.getData();
  }

  editItem(item: Item): void {
    this.modalTitle = 'Edit Item';
    this.currentEditId = item.id;
    this.isVisible = true;
    this.validateForm.patchValue({
      name: item.name,
      age: item.age,
      email: item.email,
    });
  }
  submitForm(): void {
    if (this.currentEditId) {
      // Edit existing item
      const itemIndex = this.data.findIndex(item => item.id === this.currentEditId);
      if (itemIndex !== -1) {
        this.data[itemIndex] = {
          ...this.data[itemIndex],
          ...this.validateForm.value,
        };
        this.message.success('Item updated successfully');
      }
    } else {
      // Add new item
      const newItem: Item = {
        id: (this.data.length + 1).toString(),
        ...this.validateForm.value,
      };
      this.data.push(newItem);
      this.message.success('Item added successfully');
    }

    this.isVisible = false;
  }
  }