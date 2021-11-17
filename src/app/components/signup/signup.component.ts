import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Calendar } from 'src/app/model/calendar';
import { UsersService } from 'src/app/services/users.service';
import SignupRequestModel from 'src/app/model/users/SignupRequestModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreService } from 'src/app/services/store/store.service';
import { CreateGroupService } from 'src/app/services/creategroup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public value!: Calendar
  public signup: SignupRequestModel = new SignupRequestModel
  isClose:boolean = false
  changeParentToFalse: boolean = false
  signupform!: FormGroup
  default_picture: string = 'https://pic.onlinewebfonts.com/svg/img_264570.png'
  profile: string = ''
  @Output() changeIsOpen = new EventEmitter<boolean>()

  constructor(
    private usersService: UsersService,
    private storeService: StoreService,
    private createGroupService: CreateGroupService
  ) { }

  ngOnInit(): void {
    this.signupform = new FormGroup({
      "username": new FormControl('', Validators.required),
      "password": new FormControl(null, [Validators.required, Validators.minLength(8)]),
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "birth_date": new FormControl(null, Validators.required),
      "profile_picture": new FormControl(null)
    })
  }

  onCloseTab(): void {
    this.isClose = true
    this.changeIsOpen.emit(this.changeParentToFalse)
  }

  async createAccount(): Promise<void> {
    const body: SignupRequestModel = {
      username: this.signup.username,
      password: this.signup.password,
      email: this.signup.email,
      birth_date: this.value,
      profile_picture: this.signup.profile_picture || this.default_picture
    }
    try {
      if(this.signupform.valid) {
        await this.usersService.createAccount(body).subscribe(async data => {
          this.signupform.reset()
          this.isClose = true
          await this.storeService.alertSuccess('Please login')
        })
      }
    } catch (error) {
      console.error(error); 
    }
  }

  async uploadProfile(imageInput: Event) {
    const target = imageInput.target as HTMLInputElement
    const image: File = target.files[0] as File
    let reader: FileReader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = ev => {
      this.createGroupService.uploadImage(ev.target?.result.toString().split(',')[1]).subscribe((data: any) => {
        this.profile = data.data.image.filename
        this.signup.profile_picture = data.data.display_url
      })
    }
  }
}
