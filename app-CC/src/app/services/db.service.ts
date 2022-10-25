import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
  
})
export class DbService {

  constructor(private router: Router, private sqlite: SQLite) {
    this.sqlite.create({
      name: 'datos.db',
      location: 'default',
      
    }).then ((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS USUARIOS(MAIL VARCHAR(75), CONTRASENA VARCHAR(30))', []).then(() => {
        console.log('TABLA CREADA OK');
      }).catch(e => {
        console.log('BASE DE DATOS NOK');
      })
    })
    
   }

  canActivate(){
    this.router.navigate(['login']);
    return false;

  }
}
