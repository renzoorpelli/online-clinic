import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/Usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class EspecialistaAuthGuardService implements CanActivate {

  constructor(private _usuarioService: UsuarioService, private router: Router) {}

  canActivate(): boolean {
    if (this._usuarioService.isLoggedAndEspecialista()) {
      return true;
    }else{
      this.router.navigate(['usuario/login']);
      return false;
    }
  }
}
