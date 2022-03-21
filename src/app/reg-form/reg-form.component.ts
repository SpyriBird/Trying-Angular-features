import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegService } from './reg.service';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RegFormComponent implements OnInit {

  public error = false;
  public form: FormGroup;
  @ViewChild('pass', {static: true}) private pass: ElementRef;

  constructor(private router: Router,
    private regService: RegService) {}

  ngOnInit(): void {
           
    this.form = new FormGroup({

      name: new FormControl('', [
        Validators.required, 
        Validators.pattern(/^[А-Я][а-я]+(-[А-Я][а-я]+)?$/), 
        Validators.minLength(2), 
        Validators.maxLength(20)]),

      surname: new FormControl('', [
        Validators.required, 
        Validators.pattern(/^[А-Я][а-я]+(-[А-Я][а-я]+)?$/), 
        Validators.minLength(2), 
        Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl('', [
        Validators.required, 
        Validators.pattern(/\d/), 
        Validators.pattern(/[A-ZА-Я]/), 
        Validators.pattern(/[а-яf-z]/), 
        Validators.pattern(/[-`~@#\$%\^&\*()_+={}\[\]><?!//\\.\,\|;:]/), 
        Validators.minLength(8) 
      ]),

      passwordConfirm: new FormControl('', [Validators.required, this._validatePass.bind(this)]),

      birthday: new FormControl('', [Validators.required, this._validateAge]),
    });
  }

  private _validatePass(control: FormControl) {
    
    if (control.value === this.pass.nativeElement.value) return null;

    return {notSame: true}
  }


  private _validateAge(control: FormControl) {

    let date: Date = new Date(control.value);
    let now: Date = new Date();

    now.setFullYear( now.getFullYear() - 18 );

    let lim = now.getTime(); 

    if (date.getTime() > lim) {

      return { notAdult: true}
    }

    return null;
  }
  

  public submit() {

    this.regService.registerUser({
      
      name: this.form.value.name + ' ' + this.form.value.surname,
      email: this.form.value.email

    }).subscribe( (response) => {

      if (response.ok) {
      this.router.navigate(['/auth']);

    } else {

      this.form.reset();
      this.error = true;
    }
    });
  }
}
