import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import {AuthService} from '../../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifica se o usuário está autenticado
  if (authService.isAuthenticated()) {
    return true;
  }

  // Se não estiver autenticado, redireciona para login
  // Salva a URL que o usuário tentou acessar para redirecionar depois
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url }
  });

  return false;
};
