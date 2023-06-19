import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool
} from "amazon-cognito-identity-js";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  // @ts-ignore
  @Input() username: string;
  // @ts-ignore
  @Input() oldPassword: string;

  @Input() usrAttr: any;
  // @ts-ignore
  passwordChangeForm: FormGroup;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.passwordChangeForm = new FormGroup({
      newPassword: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
    });
  }

  changeUserPassword(): void {
    console.log(this.username)
    console.log(this.oldPassword)
    let authenticationDetails = new AuthenticationDetails({
      Username: this.username,
      Password: this.oldPassword
    });
    // @ts-ignore
    let poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    };
    let userPool = new CognitoUserPool(poolData);
    let userData = { Username: this.username, Pool: userPool };
    var cognitoUser = new CognitoUser(userData);
    const newPass =  this.passwordChangeForm.get("confirmPassword")?.value
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log("authenticated")
      },
      onFailure: (err) => {
        console.log(err)
      },
      newPasswordRequired:(userAttr, reqAttr): void => {
        delete this.usrAttr['email_verified'];
        // @ts-ignore
        cognitoUser.completeNewPasswordChallenge(newPass, {}, this.navigateToLogin);
        cognitoUser.signOut();
      }
    });
  }

  navigateToLogin(error: any, data: any): void {
    console.log("error");
    console.log(error);
    console.log("data");
    console.log(data);
    if(!error) {
      this.router.navigate(["login"]);
    }
  }

}
