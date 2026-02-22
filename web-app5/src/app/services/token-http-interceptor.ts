import { HttpInterceptorFn } from '@angular/common/http';

export const tokenHttpInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');

  // Attach Authorization header if token exists
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true // keep only if backend uses cookies
    });
  }

  // ❌ next.handle(req) is wrong here
  // ✅ Correct way:
  return next(req);
};
