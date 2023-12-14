import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { SigninRoutingModule } from './signup-router.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignupComponent],
  imports: [CommonModule, SigninRoutingModule, ReactiveFormsModule],
})
export class SigninModule {}
