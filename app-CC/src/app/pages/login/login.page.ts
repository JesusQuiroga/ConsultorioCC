import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  modelousuario: string = '';
  modelocontrasena: string = '';

  constructor(private dbService: DbService ) { 
    console.log('Pagina Login iniciada');
  }


  ngOnInit() {
  }
  validarcredenciales() {
    console.log(this.modelousuario);
    console.log(this.modelocontrasena);
  }

}
