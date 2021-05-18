import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = sessionStorage.getItem("jwtToken");
    if (token == null) {
      return next.handle(request);
    }
    request.headers.append('Access-Control-Allow-Origin', '*');
    const updatedRequest = request.clone({
      headers: request.headers.set("bearertoken", token)
    });
    return next.handle(updatedRequest).pipe(
      tap(
        event => {
          //logging the http response to browser's console in case of a success
          if (event instanceof HttpResponse) {
            console.log("api call success :");
          }
        },
        error => {
          //logging the http response to browser's console in case of a failuer
          if (error instanceof HttpResponse) {
            console.log("api call error :", error);
          }
        }
      )
    );
  }
}
