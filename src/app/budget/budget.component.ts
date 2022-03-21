import { Component } from '@angular/core';
import { Transaction, IncomeCategory, ExpenseCategory } from './budget.service';
import { CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent {

   public incomes: Transaction[] = [
    {id: 1, sum: 10, date: new Date('2021-09-08'), category: IncomeCategory.Category1},
    {id: 2, sum: 200, date: new Date('2021-12-12'), category: IncomeCategory.Category1},
    {id: 3, sum: 2, date: new Date('2021-09-05'), category: IncomeCategory.Category4},
    {id: 4, sum: 5.8, date: new Date('2021-09-05'), category: IncomeCategory.Category1},
    {id: 5, sum: 100, date: new Date('2021-09-05'), category: IncomeCategory.Category5},
    {id: 6, sum: 1560, date: new Date('2021-09-05'), category: IncomeCategory.Category1},
    {id: 7, sum: 199, date: new Date('2021-09-05'), category: IncomeCategory.Category4},
    {id: 8, sum: 666, date: new Date('2021-09-05'), category: IncomeCategory.Category3},
    {id: 9, sum: 7384, date: new Date('2021-09-05'), category: IncomeCategory.Category1},
    {id: 10, sum: 10, date: new Date('2021-09-05'), category: IncomeCategory.Category2},
  ];
 
  public expenses: Transaction[] = [
    {id: 1, sum: 10, date: new Date('2021-09-05'), category: ExpenseCategory.Category1},
    {id: 2, sum: 300, date: new Date('2022-03-10'), category: ExpenseCategory.Category6},
    {id: 3, sum: 34.56, date: new Date('2021-09-05'), category: ExpenseCategory.Category4},
    {id: 4, sum: 5.8, date: new Date('2021-09-05'), category: ExpenseCategory.Category7},
    {id: 5, sum: 100, date: new Date('2021-09-05'), category: ExpenseCategory.Category5},
    {id: 6, sum: 890, date: new Date('2021-09-05'), category: ExpenseCategory.Category8},
    {id: 7, sum: 499, date: new Date('2021-09-05'), category: ExpenseCategory.Category9},
    {id: 8, sum: 666, date: new Date('2021-09-05'), category: ExpenseCategory.Category3},
    {id: 9, sum: 7384, date: new Date('2021-09-05'), category: ExpenseCategory.Category10},
    {id: 10, sum: 10, date: new Date('2021-09-05'), category: ExpenseCategory.Category2},
  ];


  
  public incomeCategories: string[] = Object.keys(IncomeCategory).map(type =>
   IncomeCategory[type]
  );

  public expenseCategories: string[] = Object.keys(ExpenseCategory).map(type =>
   ExpenseCategory[type]
  );

  public transactions = [{data: this.incomes, title: 'Доходы', categories: this.incomeCategories}, 
  {data: this.expenses, title: 'Расходы', categories: this.expenseCategories}];

  constructor() {}

  drop(event: any) {
    moveItemInArray(this.transactions, event.previousIndex, event.currentIndex);
  }
  
}
