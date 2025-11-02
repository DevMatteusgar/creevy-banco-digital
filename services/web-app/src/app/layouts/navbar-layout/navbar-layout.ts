import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar-layout.html',
  styleUrl: './navbar-layout.css',
})
export class NavbarLayout {

  isMenuOpen = false;
  isTransfersOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.isTransfersOpen = false;
    }
  }

  toggleTransfers() {
    this.isTransfersOpen = !this.isTransfersOpen;
    if (this.isTransfersOpen) {
      this.isMenuOpen = false;
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  closeTransfers() {
    this.isTransfersOpen = false;
  }

  closeAllMenus() {
    this.isMenuOpen = false;
    this.isTransfersOpen = false;
  }

  handleMenuClick(event: Event, action: string) {
    event.preventDefault();
    console.log(`Ação selecionada: ${action}`);

    switch(action) {
      case 'perfil':
        console.log('Navegando para perfil...');
        break;
      case 'configuracoes':
        console.log('Abrindo configurações...');
        break;
      case 'ajuda':
        console.log('Abrindo ajuda...');
        break;
      case 'sair':
        console.log('Realizando logout...');
        break;
    }

    this.closeMenu();
  }

  handleTransferClick(event: Event, action: string) {
    event.preventDefault();
    console.log(`Transferência selecionada: ${action}`);

    // Aqui você pode implementar a lógica para cada tipo de transferência
    switch(action) {
      case 'deposito':
        console.log('Abrindo tela de depósito...');
        break;
      case 'saque':
        console.log('Abrindo tela de saque...');
        break;
      case 'extrato':
        console.log('Abrindo extrato...');
        break;
    }

    this.closeTransfers();
  }
}
