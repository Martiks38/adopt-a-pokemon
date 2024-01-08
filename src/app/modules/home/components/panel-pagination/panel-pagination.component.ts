import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { tap } from 'rxjs';
import { PokemonDataService } from 'src/app/services';
import type { PageLinks } from 'src/app/typings';
import { storageNavigationPageLinks } from 'src/assets/constants';

@Component({
  selector: 'app-panel-pagination',
  templateUrl: './panel-pagination.component.html',
  styleUrls: ['./panel-pagination.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelPaginationComponent implements OnInit, OnChanges {
  links: PageLinks = { previous: false, next: false, offset: 0, totalPages: 0 };

  currentPage: number = this.links.offset + 1;
  ariaPrevButton: string = this.links.previous
    ? ''
    : 'Initial list of Pokémon.';
  ariaNextButton: string = this.links.next ? '' : 'Final list of Pokémon.';
  pageOfPokemonsListForm!: FormGroup;

  errorNumberPage: boolean = false;
  errorNumberPageMesage: string = '';

  constructor(private pokemonSvc: PokemonDataService) {}

  ngOnInit(): void {
    this.pokemonSvc.navigation$
      .pipe(
        tap((links) => {
          const strNavigationPageLinks = JSON.stringify(links);

          window.localStorage.setItem(
            storageNavigationPageLinks,
            strNavigationPageLinks
          );
          this.links = links;
          this.currentPage = links.offset;
          this.errorNumberPageMesage = `The page number goes from 1 to ${links.totalPages}.`;

          this.pageOfPokemonsListForm = new FormGroup({
            currentPage: new FormControl(this.currentPage, {
              validators: [
                Validators.required,
                Validators.min(1),
                Validators.max(this.links.totalPages),
              ],
            }),
          });
        })
      )
      .subscribe();
  }

  ngOnChanges(): void {
    this.ariaPrevButton = this.links.previous ? '' : 'Initial list of Pokémon.';
    this.ariaNextButton = this.links.next ? '' : 'Final list of Pokémon.';
  }

  previousList() {
    this.pokemonSvc.setPreviousPage();
  }

  nextList() {
    this.pokemonSvc.setNextPage();
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const offsetPokemonList = this.pageOfPokemonsListForm.get('currentPage');
    const invalid = offsetPokemonList?.invalid;
    console.log(offsetPokemonList);
    if (invalid) {
      this.errorNumberPage = true;
      return;
    }

    const currentPageValue = parseInt(offsetPokemonList?.value) - 1;

    if (this.currentPage === currentPageValue) return;

    this.errorNumberPage = false;
    this.pokemonSvc.setPageNumber(currentPageValue);
  }
}
