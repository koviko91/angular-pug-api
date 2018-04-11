import { Component } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from 'selenium-webdriver/http';
import { checkAndUpdateElementDynamic } from '@angular/core/src/view/element';
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

  errorHandling(res) {
    res = JSON.parse(res['_body']);
    if (res.error) {
      console.error('API error:' + res.error);
    }
    else {
      this.datas = res;
    }
  }

  getAll() {
    this.http.get('http://localhost:3000/users').subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  create() {
    this.http.post('http://localhost:3000/users/', this.adat).subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  update() {
    this.http.put(`http://localhost:3000/users/${this.modal['id']}`, this.modal)
      .subscribe(data => {
        this.errorHandling(data);
      });
  }

  deleteRow(id) {
    this.http.delete(`http://localhost:3000/users/${id}`)
      .subscribe(data => {
        this.errorHandling(data);
      });
  }

  modalChange(id) {
    let choosen = this.datas.filter(item => item.id == id)[0];
    this.modal = Object.assign({}, choosen);
  }
}
