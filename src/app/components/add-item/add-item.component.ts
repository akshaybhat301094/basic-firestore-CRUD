import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Item } from '../../models/login';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  public item: Item = {
    username: '',
    password: ''
  }
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.item.username !== '' && this.item.password !== '') {
      this.loginService.addItem(this.item);
      this.item.username = '';
      this.item.password = '';
    }
  }

}
