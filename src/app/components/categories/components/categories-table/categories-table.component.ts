import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryEvent } from '../../../../models/enums/categories/CategoryEvent';
import { DeleteCategoryAction } from '../../../../models/interfaces/categories/event/DeleteCategoryAction';
import { EditCategoryAction } from '../../../../models/interfaces/categories/event/EditCategoryAction';
import { GetCategoriesResponse } from '../../../../models/interfaces/categories/responses/GetCategoriesResponse';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  standalone: true,
  imports: [CommonModule,HttpClientModule,CardModule,TableModule,ButtonModule,ConfirmDialogModule],
  styleUrls: [],
})
export class CategoriesTableComponent {
  @Input() public categories: Array<GetCategoriesResponse> = [];
  @Output() public categoryEvent = new EventEmitter<EditCategoryAction>();
  @Output() public deleteCategoryEvent =
    new EventEmitter<DeleteCategoryAction>();
  public categorySelected!: GetCategoriesResponse;
  public addCategoryAction = CategoryEvent.ADD_CATEGORY_ACTION;
  public editCategoryAction = CategoryEvent.EDIT_CATEGORY_ACTION;

  handleDeleteCategoryEvent(category_id: string, categoryName: string): void {
    if (category_id !== '' && categoryName !== '') {
      this.deleteCategoryEvent.emit({ category_id, categoryName });
    }
  }

  handleCategoryEvent(
    action: string,
    id?: string,
    categoryName?: string
  ): void {
    if (action && action !== '') {
      this.categoryEvent.emit({ action, id, categoryName });
    }
  }
}
