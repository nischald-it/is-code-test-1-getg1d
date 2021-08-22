import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { StoreService } from '../app/services/store.service';


@Injectable({
  providedIn: 'root'
})
export class StoreDataResolver implements Resolve<boolean> {
  constructor(private storeService: StoreService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.storeService.perpareStore();
    return of(true);
  }
}
