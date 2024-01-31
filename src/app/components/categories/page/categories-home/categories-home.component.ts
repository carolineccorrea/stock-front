import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';
import { DeleteCategoryAction } from '../../../../models/interfaces/categories/event/DeleteCategoryAction';
import { GetCategoriesResponse } from '../../../../models/interfaces/categories/responses/GetCategoriesResponse';
import { EventAction } from '../../../../models/interfaces/products/event/EventAction';
import { CategoriesService } from '../../../../services/categories/categories.service';
import { ToolbarNavigationComponent } from '../../../../shared/toolbar-navigation/toolbar-navigation.component';
import { CategoriesTableComponent } from '../../components/categories-table/categories-table.component';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-categories-home',
  templateUrl: './categories-home.component.html',
  standalone: true,
  imports: [
    CategoriesTableComponent,
    ToolbarNavigationComponent,
    HttpClientModule
  ],
  providers: [ConfirmationService],
  styleUrls: [],
})
export class CategoriesHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  public categoriesDatas: Array<GetCategoriesResponse> = [];

  constructor(
    private categoriesService: CategoriesService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.categoriesDatas = response;
          }
        },
        error: (err) => {
          console.log(err);
          console.log('Erro ao buscar categorias')
          this.router.navigate(['/dashboard']);
        },
      });
  }

  handleDeleteCategoryAction(event: DeleteCategoryAction): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão da categoria: ${event?.categoryName}`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteCategory(event?.category_id),
      });
    }
  }

  deleteCategory(category_id: string): void {
    if (category_id) {
      this.categoriesService
        .deleteCategory({ category_id })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.getAllCategories();
            console.log('categoria removida com sucesso')
          },
          error: (err) => {
            console.log(err);
            this.getAllCategories();
            console.log(' erro ao remover categorias ')
          },
        });

      this.getAllCategories();
    }
  }

  handleCategoryAction(event: EventAction): void {
    if (event) {
      this.ref = this.dialogService.open(CategoryFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event: event,
        },
      });

      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getAllCategories(),
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
