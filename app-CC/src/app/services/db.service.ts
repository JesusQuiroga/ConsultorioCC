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
   almacenarUsuario(correo, password) {
    this.sqlite.create({
      name: 'datos.db',
      location: 'default',
      
    }).then ((db: SQLiteObject) => {
      db.executeSql('JQ: INSERT INTO USUARIO VALUES(?,?)', [correo, password]).then(() => {
        console.log('JQ: USUARIO ALMACENADO OK');
      }).catch(e => {
        console.log('JQ: USUARIO NO ALMACENADO');
      })
    }).catch(e => {
      console.log('JQ: BASE DE DATOS NOK');
    })
   }

   validarCorreo(correo) {
    return this.sqlite.create({
      name: 'datos.db',
      location: 'default',
      
    }).then ((db: SQLiteObject) => { //ESPERANDO UNA RESPUESTA (PROMESA)
      return db.executeSql('JQ: SELECT COUNT(MAIL) AS CANTIDAD FROM USUARIO WHERE MAIL= ?', [correo]).then(( data ) => { 
        
        
        if (data.rows.item(0).CANTIDAD ===0) {
         return false; //CORREO NO EXISTE
      }
         return true;
      }).catch(e => {
         return true;      
      })
      }).catch(e => {
         return true;
    });
   }
  canActivate(){
    this.router.navigate(['login']);
    return false;

  }
}
