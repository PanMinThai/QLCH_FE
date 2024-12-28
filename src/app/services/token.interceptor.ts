import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let _token = localStorage.getItem('token');
  if (_token) {
      let jwttoken = req.clone({
          setHeaders: {
              Authorization: 'Bearer ' + _token
          }
      });
      return next(jwttoken);
  }
  return next(req);
};

