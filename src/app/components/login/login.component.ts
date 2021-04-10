
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  user:User;
  email:string;

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService,
    private router:Router,
    private userService:UserService) { }

  ngOnInit(): void {
    this.createLoginForm();
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel=Object.assign({},this.loginForm.value)
      this.email=loginModel.email;
      this.getUserByEmail(this.email);
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info(response.message,"Başarılı")
        this.localStorageService.add("email",loginModel.email)
        this.localStorageService.add("token",response.data.token)
        this.localStorageService.add("userId",this.user.id.toString())
        this.localStorageService.add("firstName",this.user.firstName)
        this.localStorageService.add("lastName",this.user.lastName)
        this.router.navigate(["cars"]);
        setTimeout(function () {
          location.reload();
        },10)
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }else{
      this.toastrService.error("Bilgilerinizi kontrol ediniz", "Hatalı Giriş")
    }
  }

  getUserByEmail(email: string) {
    this.userService.getUserByEmail(email).subscribe((response) => {
      this.user = response.data;
    });
  }
    
    
  

}
