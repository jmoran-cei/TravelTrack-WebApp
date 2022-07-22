import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  templateUrl: 'new-account.component.html',
  styleUrls: ['new-account.component.css']
})

export class NewAccountComponent {
  mouseoverSubmit?:boolean
  //firstName?:string
  //lastName?:string
  //username?:string
  //password?:string

  constructor(private router:Router) {}

  createAccount() { //funcionality will be further implemeneted in the near future
    alert('You have successfully created an account! Please sign in. \n(Custom alert will be used in the future..)')
    this.router.navigate(['/user/login'])
  }

}

