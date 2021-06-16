import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/validators/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorsService.nombrePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorsService.noPuedeSerOmar]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]]

  }, {
    validators: [this.validatorsService.equalFields('password', 'password2')]
  })

  constructor(private fb: FormBuilder, private validatorsService: ValidatorsService, private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.form.reset({
      nombre: 'Omar Perozo',
      email: 'test1@test.com',
      username: 'om4r',
      password: '123456',
      password2: '123456'
    })
  }

  campoNoValido(campo: string) {
    return this.form.get(campo)?.invalid && this.form.get(campo)?.touched;
  }

  emailValidationMsg(): string{
    const emailErrors = this.form.get('email')?.errors!;
    if (this.form.get('email')?.errors) {
      if (emailErrors.hasOwnProperty('required')) {
        return 'El correo es obligatorio';
      } else if (emailErrors.hasOwnProperty('pattern')) {
        return 'El valor introducido no tiene formato de correo';
      } else if (emailErrors.hasOwnProperty('takenEmail')) {
        return  'Ese correo existe, intenta con otro.'
      }
    } return '';
  }



  submit() {
    console.log(this.form.value);
    this.form.markAllAsTouched();
  }

}
