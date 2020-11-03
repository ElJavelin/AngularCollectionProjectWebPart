import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AppService} from './app-service';
import {HttpClient} from '@angular/common/http';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Collection, CustomItemFields, Item, User, UserData} from './entity-classes/entity-classes.component';
import {CollectionService} from './collection-service';
import {AdminService} from './admin-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})

export class AppComponent implements OnInit {

  @ViewChild('regFormBtn', {static: false}) regFormBtn: ElementRef;
  @ViewChild('authFormBtn', {static: false}) authFormBtn: ElementRef;

  modalRef: BsModalRef;
  regForm: FormGroup;
  authForm: FormGroup;
  user: any;
  userData: any;
  errorMsg: string;

  constructor(public collectionService: CollectionService, public appService: AppService, private modalService: BsModalService, public http: HttpClient, private adminService: AdminService) {}

  ngOnInit(): void {
    this.genRegForm();
    this.genAuthForm();
    // this.user = new User(13, 'Username', 'password', 'user@gmail.com', '2020-09-15 22:06:02.474', true, 'assets/img/default_avatar.svg');
    // this.userData = new UserData(1, 'Gleb Smirnov', '2015-03-30', true, 'Belarus');
    // this.userData = new UserData();
    this.collectionService.tmpCollection = new Collection();
    // tslint:disable-next-line:max-line-length
    // this.collectionService.tmpItem = new Item('Vodka', '0.75', '12', '40', 'do not mix', 'never', 'again', '2015-03-30', '2010.11.11', '2020.11.11', 'false', 'true', 'false', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout', ' repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a di', 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.');
    // this.collectionService.tmpCustomItemFields = new CustomItemFields(1, 'Text', 'Text', 'Text', 'Text', 'Text', 'Text', 'Text', 'Text', 'Text', 'Text', 'Text', 'Text', 'Text', 'Text', 'Text');
   // this.appService.curUser = this.user;
   // this.appService.curUserData = this.userData;
   // this.appService.login();
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  genAuthForm(): void {
    this.authForm = new FormGroup({
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(1)
        ]),
      }
    );
  }

  genRegForm(): void {
    this.regForm = new FormGroup({
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.max(24)
        ]),
        email: new FormControl('', [
          Validators.email,
          Validators.required
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(1)
        ]),
      }
    );
  }

  authUser(): void {
    if (this.authForm.valid) {
      this.user = new User(null , this.authForm.get('username').value, this.authForm.get('password').value, '', null, null, null);
      this.http.post<User>('http://localhost:8080/authorization', this.user).subscribe(
        user => {
          if (user) {
            this.appService.curUser = user;
            this.appService.curUserData = user.userData;
            this.authForm.reset();
            this.modalRef.hide();
            this.appService.login();
          }
          else {
            this.errorMsg = 'User does not found';
          }
        });
    }
  }

  registrateUser(): void {
    if (this.regForm.valid) {
      this.user = new User(
        null,
        this.regForm.get('username').value,
        this.regForm.get('password').value,
        this.regForm.get('email').value,
        null, null, null);
      this.http.post<User>('http://localhost:8080/registration', this.user).subscribe(
        user => {
          this.appService.curUser = this.user = user;
          this.appService.curUserData = user.userData;
          this.regForm.reset();
        });
    }
    this.appService.login();
  }
}
