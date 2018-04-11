/* use PUG
  ng new todo-frontend
  ng eject
  npm i pug pug-html-loader -D
  webpack.config js rules kiegészítése:
  {
        "test": /\.pug$/,
        "loader": ["raw-loader", 'pug-html-loader']
      },
app.component.html átnevezése .pug -ra , app.component.ts -ben is átírnia  tempalte url-t
npm start
*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
