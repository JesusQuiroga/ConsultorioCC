import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  modelousuario: string = '';
  modelocontrasena: string = '';

  constructor(private dbService: DbService, private alertController: AlertController, private toastController: ToastController) { 
    console.log('Pagina Login iniciada');
  }


  ngOnInit() {
  }
  validarcredenciales() {
    console.log(this.modelousuario);
    console.log(this.modelocontrasena);
  }
  async mostrarFormulario() {
    const alert = await this.alertController.create({
      header: 'Nuevo Usuario',
      inputs: [
        {
          name: 'correo',
          type: 'text',
          placeholder: 'Correo Electronico',
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Contraseña',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Almacenar',
          handler: (data) => {
            this.almacenarUsuario(data.correo, data.password);
          },
        },
      ],
    });

    await alert.present();
  }
  almacenarUsuario(correo, password) {
    this.dbService.validarCorreo(correo).then((data) => {
      if(!data) {
        console.log('JQ: USUARIO GUARDADO!');
        this.dbService.almacenarUsuario(correo, password);
      } else {
        this.presentToast();
      }
      })
    
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'USUARIO YA EXISTENTE',
      duration: 2000
    });
    toast.present();
  }


}
