import { Component } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from 'selenium-webdriver/http';
/* import { Observable } from 'rxjs/Observable'; */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /*adat: Todo;
   modal: Todo;
   datas: Array<Todo>;*/
  adat: object = {
    id: "",
    important: "",
    done: "",
    text: "",
    color: ""
  }
  modal: object = {
    id: "",
    important: "",
    done: "",
    text: "",
    color: ""
  }
  datas: any;
  constructor(public http: Http) {
    this.getAll();
  }

  getAll() {
    this.http.get('http://localhost:3000/users').subscribe(
      data => this.datas = JSON.parse(data['_body'])
    );
  }

  create() {
    this.http.post('http://localhost:3000/users/', this.adat).subscribe(
      () => this.getAll());

  }
  update() {
    this.http.put('http://localhost:3000/users/' + this.modal['id'], this.modal)
      .subscribe(() => this.getAll());
  }

  deleteRow(id) {
    this.http.delete('http://localhost:3000/users/' + id)
      .subscribe(() => this.getAll());
  }
  modalChange(id) {
    let choosen = this.datas.filter(item => item.id == id)[0];
    // this.modal = this.datas.filter(item => item.id == id)[0];
    this.modal['id'] = choosen.id;
    this.modal['important'] = choosen.important;
    this.modal['done'] = choosen.done;
    this.modal['text'] = choosen.text;
    this.modal['color'] = choosen.color;
  }
}

interface Todo {
  id?: number;
  important?: string;
  done?: string;
  text: string;
  color?: string
}
//It's Works!!!