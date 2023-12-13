import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
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

@Component({
  selector: 'app-panel-pagination',
  templateUrl: './panel-pagination.component.html',
  styleUrls: ['./panel-pagination.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelPaginationComponent implements OnInit, OnChanges {
  @Input() links: PageLinks = { previous: false, next: false, offset: 0 };

  currentPage: number = this.links.offset;
  maxPages!: number;
  ariaPrevButton: string = this.links.previous
    ? ''
    : 'Initial list of Pokémon.';
  ariaNextButton: string = this.links.next ? '' : 'Final list of Pokémon.';
  pageOfPokemonsListForm: FormGroup = new FormGroup({
    currentPage: new FormControl(this.currentPage, {
      validators: [
        Validators.required,
        Validators.min(1),
        Validators.max(this.maxPages),
      ],
    }),
  });
  errorNumberPage: boolean = false;
  errorNumberPageMesage: string = '';

  constructor(private pokemonSvc: PokemonDataService) {}

  ngOnChanges(): void {
    this.ariaPrevButton = this.links.previous ? '' : 'Initial list of Pokémon.';
    this.ariaNextButton = this.links.next ? '' : 'Final list of Pokémon.';
  }

  ngOnInit(): void {
    this.pokemonSvc.currentPage$
      .pipe(
        tap((page) => {
          const currentPagePokemonList = (this.currentPage = page + 1);

          this.currentPage = currentPagePokemonList;
          this.pageOfPokemonsListForm.setValue({
            currentPage: this.currentPage,
          });
        })
      )
      .subscribe();

    this.pokemonSvc.totalPages$
      .pipe(
        tap((p) => {
          this.maxPages = p;
          this.errorNumberPageMesage = `The page number goes from 1 to ${p}.`;
        })
      )
      .subscribe();
  }

  previousList() {
    this.pokemonSvc.setCurrentPageSubjectPrevious();
  }

  nextList() {
    this.pokemonSvc.setCurrentPageSubjectNext();
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const currentPage = this.pageOfPokemonsListForm.get('currentPage');
    const invalid = currentPage?.invalid;

    if (invalid) {
      this.errorNumberPage = true;
      return;
    }

    const currentPageValue = parseInt(currentPage?.value);

    if (this.currentPage === currentPageValue) return;

    this.errorNumberPage = false;
    this.pokemonSvc.setCurrentPage(currentPageValue);
  }
}
