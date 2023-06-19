import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  public clientId = '6bv2uba3mci73jd571i253lqfv';
  public redirectUri = 'http://localhost:80/login/oauth2/code/cognito';
  private Cookie: any;

  constructor(private _http: HttpClient) { }

  retrieveToken(code: string): void {
    let params = new URLSearchParams();
    params.append('grant_type','authorization_code');
    params.append('client_id', this.clientId);
    params.append('redirect_uri', this.redirectUri);
    params.append('code',code);

    let headers =
      new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});

    this._http.post('https://auro-demo.auth.us-east-1.amazoncognito.com/oauth2/token',
      params.toString(), { headers: headers })
      .subscribe(
        data => this.saveToken(data),
        err => alert('Invalid Credentials'));
  }

  saveToken(token: any): void {
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.Cookie.set("access_token", token.access_token, expireDate);
    console.log('Obtained Access token');
    window.location.href = 'http://localhost:4200';
  }

  getAuthHeader() : HttpHeaders {
    return new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Bearer '+this.Cookie.get('access_token')});
  }

  checkCredentials() {
    return this.Cookie.check('access_token');
  }

  logout() {
    this.Cookie.delete('access_token');
    window.location.reload();
  }
}
