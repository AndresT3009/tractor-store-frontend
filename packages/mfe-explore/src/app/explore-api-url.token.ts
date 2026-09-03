import { InjectionToken } from '@angular/core';

export const EXPLORE_API_URL = new InjectionToken<string>('EXPLORE_API_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:8080/api',
});
