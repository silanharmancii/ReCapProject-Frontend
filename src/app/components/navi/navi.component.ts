import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  Authenticated=false;
  user:User
  userId:any;
  userName:any;
  userLastName:any;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.Authenticated = this.authService.isAuthenticated();
    if (this.Authenticated) {
      this.getUserName();
      this.getUserLastName();
      this.getUserId();
    }
  }

  getUserId() {
    this.userId = Number(this.localStorageService.get('userId'));
  }
  getUserName(){
    this.userName=this.localStorageService.get("firstName");
  }
  getUserLastName(){
    this.userLastName=this.localStorageService.get("lastName");
  }

  isAuthenticated() {
    if (this.authService.isAuthenticated()) {
      this.Authenticated = true;
    } else {
      this.Authenticated = false;
    }
  }

  logout() {
    this.localStorageService.delete("token");
    this.localStorageService.delete("email");
    this.localStorageService.delete("userId");
    this.localStorageService.delete("fistName");
    this.localStorageService.delete("lastName");
    this.Authenticated=false;
    this.toastrService.info("Çıkış Yapıldı","Bilgi")
    
  }


}
