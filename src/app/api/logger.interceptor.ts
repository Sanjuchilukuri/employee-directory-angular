import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoaderService } from '../services/loader/loader.service';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  loaderService.setLoading(true);
  const authReq = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  });
  return next(authReq).pipe(
    finalize(() => {
      loaderService.setLoading(false);
    })
  );
};
