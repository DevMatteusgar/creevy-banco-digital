import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Pega o token/userId do localStorage ou de onde você armazena
  const token = localStorage.getItem('authToken');

  if (token) {
    // Clona a requisição e adiciona o header
    const clonedRequest = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
        // Ou se seu backend espera o userId diretamente:
        // 'userId': email
      }
    });

    return next(clonedRequest);
  }

  return next(req);
};
