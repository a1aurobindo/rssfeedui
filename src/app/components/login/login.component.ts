import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";

import {AbstractControl, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationDetails, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading: boolean = false;
  // @ts-ignore
  loginForm: FormGroup;
  rstPwFlag: boolean = false;
  // @ts-ignore
  cognitoUser: CognitoUser;

  usrAttributes: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  get username(): FormControl {
    return <FormControl>this.loginForm.get('username');
  }

  get password(): FormControl {
    return <FormControl>this.loginForm.get('password');
  }

  onSignIn(){
    if (this.loginForm.valid) {
      this.isLoading = true;
      let authenticationDetails = new AuthenticationDetails({
        Username: this.username.value,
        Password: this.password?.value,
      });
      let poolData = {
        UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
        ClientId: environment.cognitoAppClientId // Your client id here
      };

      let userPool = new CognitoUserPool(poolData);
      let userData = { Username: this.loginForm?.get("username")?.value, Pool: userPool };
      var cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          this.router.navigate(["dashboard"])
        },
        onFailure: (err) => {

          console.log(err)
          // alert(err.message || JSON.stringify(err));
          // newPasswordRequired
          this.isLoading = false;
        },
        newPasswordRequired:(userAttr, reqAttr): void => {

          this.usrAttributes = userAttr;
          this.cognitoUser = cognitoUser;
          this.rstPwFlag = true;
          // @ts-ignore
          this.cognitoUser.getSession((error, session) => {
            this.cognitoUser.setSignInUserSession(session)
            console.log('session data')
            console.log(session)
          });
        }
      });
    }
  }








  // public isLoggedIn = false;
  //
  // constructor(private _service: LoginServiceService) { }
  //
  // ngOnInit() {
  //   this.isLoggedIn = this._service.checkCredentials();
  //   let i = window.location.href.indexOf('code');
  //   if(!this.isLoggedIn && i != -1) {
  //     this._service.retrieveToken(window.location.href.substring(i + 5));
  //   }
  // }
  //
  // login() {
  //   window.location.href =
  //     'https://auro-demo.auth.us-east-1.amazoncognito.com/oauth2/authorize?\
  //   response_type=code&scope=openid&client_id=' +
  //   this._service.clientId + '&redirect_uri='+ this._service.redirectUri;
  // }
  //
  // logout() {
  //   this._service.logout();
  // }

}
