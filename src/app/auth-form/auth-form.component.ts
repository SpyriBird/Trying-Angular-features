import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  public form: FormGroup;

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.form = new FormGroup({

      email: new FormControl('', [Validators.required, Validators.email]),

      pass: new FormControl('', [Validators.required]),

    });

  }

  public onSubmit() {

    this.router.navigate(['/posts', '1']);
  }

}
