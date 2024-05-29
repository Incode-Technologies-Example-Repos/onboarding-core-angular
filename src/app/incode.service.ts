import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { create, createSession, addCustomFields } from '@incodetech/welcome';

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
      apiURL: 'https://demo-api.incodesmile.com',
      lang: 'en-US',
      apiKey: '<your-api-key>'
    });
  }


  createSession(): Observable<any> {
    const getSession = (): Promise<any> => {
      return new Promise((resolve, reject) => {
        createSession("ALL", undefined, {
          configurationId: '<your-flow-id>',
        })
          .then(async (session: SessionType) => {
            await this.incode.warmup();

            resolve(session);
          }).catch((e) => {
            reject(e);
          });
      })
    }
    return from(getSession());
  }


  // For enterprise deployments please start session within your own web service

  // getSession(uuid: string): Observable<any> {
  //   const fetchSession = (): Promise<any> => {
  //     let url;
  //     if (uuid) {
  //       url = `http://localhost:3000/start?uuid=${uuid}`
  //     } else {
  //       url = `http://localhost:3000/start`
  //     }
  //     return new Promise(async (resolve) => {
  //       const response = await fetch(url);
  //       const token  = await response.json();
  //       console.log(token);
  //       resolve(token)
  //     })
  //   }
  //   return from(fetchSession());
  // }

}
