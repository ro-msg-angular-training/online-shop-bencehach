import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {UserService} from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  showModal = false;
  showModalFullName = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      emailAddress: ['', Validators.required],
      fullName: ['', Validators.required]
    });
  }

  get values() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    this.userService.register(this.values.username.value, this.values.password.value, this.values.fullName.value, this.values.emailAddress.value
      , {roleName: 'Client'}, [])
      .pipe(first()).subscribe(
      data => {
        this.router.navigate(['/login']).then();
        // localStorage.setItem('emailAddress', this.values.emailAddress.value);
      },
      error => {
        if (error === '1') {
          this.modalFullName();
        } else {
          this.modalFunction();
        }
      }
    );
  }

  modalFunction() {
    this.showModal = !this.showModal;
  }

  modalFullName() {
    this.showModalFullName = !this.showModalFullName;
  }

  closeModal() {
    debugger
    location.reload(true);
  }
}
