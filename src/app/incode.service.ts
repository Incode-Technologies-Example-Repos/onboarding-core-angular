import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { create } from '@incodetech/welcome';

type SessionType = {
  token: string,
  interviewId: string,
  uuid?: string
};

@Injectable({
  providedIn: 'root'
})
export class IncodeService {
  incode;

  constructor() {
    this.incode = create({
      apiURL: 'https://demo-api.incodesmile.com/0',
      lang: 'en-US'
    });
  }

  // For enterprise deployments please start session within your own web service
  getSession(uuid?: string): Observable<any> {
    const baseUrl: string = this.getBaseURL();

    const fetchSession = (): Promise<any> => {
      let url;
      if (uuid) {
        url = `https://${baseUrl}:443/start?uuid=${uuid}`
      } else {
        url = `https://${baseUrl}:443/start`
      }
      console.log(url);
      return new Promise(async (resolve) => {
        const response = await fetch(url);
        const token  = await response.json();
        resolve(token)
      })
    }
    return from(fetchSession());
  }

  getBaseURL(): string {
    const url = window.location.hostname;
    return url || 'localhost';
    
  }

}
