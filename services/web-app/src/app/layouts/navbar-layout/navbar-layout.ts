import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {UserService} from '../../services/user-service/user-service';

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
export class NavbarLayout implements OnInit {

  isMenuOpen = false;
  isTransfersOpen = false;
  isInvestOpen = false;
  userName: string = '';
  isLoadingUser: boolean = true;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.userService.getMyInfo().subscribe({
      next: (response) => {
        this.userName = this.parseUserName(response.accountName);
        this.isLoadingUser = false;
      },
      error: (error) => {
        console.error('Erro ao carregar informações do usuário:', error);
        this.userName = 'Usuário';
        this.isLoadingUser = false;
      }
    });
  }

  parseUserName(fullName: string): string {
    if (!fullName || fullName.trim() === '') {
      return 'Usuário';
    }

    const nameParts = fullName.trim().split(/\s+/);

    if (nameParts.length === 1) {
      return nameParts[0];
    }

    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];

    return `${firstName} ${lastName}`;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.isTransfersOpen = false;
      this.isInvestOpen = false;
    }
  }

  toggleTransfers() {
    this.isTransfersOpen = !this.isTransfersOpen;
    if (this.isTransfersOpen) {
      this.isMenuOpen = false;
      this.isInvestOpen = false;
    }
  }

  toggleInvest() {
    this.isInvestOpen = !this.isInvestOpen;
    if (this.isInvestOpen) {
      this.isTransfersOpen = false;
      this.isMenuOpen = false;
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  closeTransfers() {
    this.isTransfersOpen = false;
  }

  closeInvest() {
    this.isInvestOpen = false;
  }

  closeAllMenus() {
    this.isMenuOpen = false;
    this.isTransfersOpen = false;
    //this.isInvestOpen = false;
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

  handleInvestClick(event: Event, action: string) {
    event.preventDefault();
    console.log(`Investimentos selecionado: ${action}`);

    // Aqui você pode implementar a lógica para cada tipo de transferência
    switch(action) {
      case 'carteira':
        console.log('Abrindo tela de carteira...');
        break;
      case 'bolsa de valores':
        console.log('Abrindo tela de bolsa de valores...');
        break;
      case 'gráficos':
        console.log('Abrindo gráficos...');
        break;
      case 'transferências':
        console.log("Abrindo transferências...");
        break;
    }

    this.closeInvest();
  }
}
