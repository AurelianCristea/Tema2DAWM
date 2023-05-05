import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  data: Item[] = [
    { id: 1, name: 'Aurel', age: 25, email: 'aurel@email.com' },
    { id: 2, name: 'Drogos', age: 30, email: 'khal.drogos@email.com' },
    { id: 3, name: 'Bodi', age: 40, email: 'bodi@email.com' },
    { id: 4, name: 'Mifu', age: 35, email: 'mifone@email.com' },
    { id: 5, name: 'Mala', age: 20, email: 'mala@email.com' }
  ];

  constructor() { }
  getData(): Item[] {
    return this.data;
  }
  addItem(item: Item) {
    this.data.push(item);
  }
  addData(item: any) {
    const newId = this.data.length + 1;
    this.data = [...this.data, { id: newId, ...item }];
  }

  editData(id: number, newData: any) {
    this.data = this.data.map(item => {
      if (item.id === id) {
        return { ...item, ...newData };
      }
      return item;
    });
  }
}
