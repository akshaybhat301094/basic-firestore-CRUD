import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Item } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public credentials: Item[];
  editState: boolean = false;
  itemToEdit: Item;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getItems().subscribe( items => {
      this.credentials = items;
    })
  }

  deleteItem(e, item) {
    this.closeItem();
    this.loginService.deleteItem(item);
  }

  editItem(e,item) {
    this.editState = true;
    this.itemToEdit = item;
  }

  closeItem() {
    this.editState = false;
    this.itemToEdit = null;
  }

  updateItem(item) {
    this.loginService.updateItem(item);
    this.closeItem();
  }
}
