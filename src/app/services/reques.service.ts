import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { environment } from '../../environments/environments';
//
@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private readonly API_BASE = environment.services.openlibrary.url;
  /**
   *
   * @param endpoint
   * @param params
   * @returns
   */
  get<T>(endpoint: string, params?: Params): Promise<T> {
    const url = new URL(this.API_BASE + endpoint);
    const searchParams = new URLSearchParams(params);
    return fetch(`${url}${searchParams.toString()}`, { method: 'GET' })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error loading recommended books:', error);
        return error;
      });
  }
}
