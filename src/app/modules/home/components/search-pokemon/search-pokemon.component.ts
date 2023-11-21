import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { PokemonDataService } from 'src/app/services';
import { CustomValidators } from 'src/app/validators/customValidators';
import { storagePokemon } from 'src/assets/constants';

type ValidatorSearchPokemon = {
  notExist?: string;
  minlength?: { requiredLength: number; actualLength: number };
  maxlength?: { requiredLength: number; actualLength: number };
  required?: boolean;
  onlyLetters?: boolean;
};

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class SearchPokemonComponent {
  pokemonForm: FormGroup;
  minLength: number = 4;
  maxLength: number = 15;
  isInvalid: boolean = false;
  errors: ValidatorSearchPokemon | null | undefined = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly pokemonService: PokemonDataService,
    private router: Router
  ) {
    this.pokemonForm = this.formBuilder.group({
      namePokemon: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(this.minLength),
          Validators.maxLength(this.maxLength),
          CustomValidators.onlyLetters,
        ],
      }),
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const namePokemonInput = this.pokemonForm.get('namePokemon');

    if (!namePokemonInput) return;

    const { invalid, value, errors } = namePokemonInput;

    if (typeof value !== 'string') return;
    const namePokemon = value.trim().toLowerCase();

    this.errors = errors;

    if (invalid) {
      this.isInvalid = invalid;
    } else {
      this.pokemonService
        .getPokemon(namePokemon)
        .pipe(
          catchError((err) => {
            return throwError(
              () => new Error(`The pokémon ${namePokemon} doesn't exist.`)
            );
          })
        )
        .subscribe({
          next: (pokemon) => {
            const strPokemon = JSON.stringify(pokemon);

            window.sessionStorage.setItem(storagePokemon, strPokemon);

            this.router.navigate(['pokemon', namePokemon]);
          },
          error: (err) => {
            this.errors = {
              ...this.errors,
              notExist: namePokemon,
            };
          },
        });
    }
  }
}
