import { Injectable } from '@angular/core';


export enum IncomeCategory {
  
  Category1 = 'Налог на прибыль',
  Category2 = 'Акцизы на ввозимые товары',
  Category3 = 'Базовые нефтегазовые доходы',
  Category4 = 'Ненефтегазовые доходы',
  Category5 = 'Прочее'
}

export enum ExpenseCategory {
  Category1 = 'Таможенные расходы',
  Category2 = 'Амортизация основных средств (ОС), задействованных в производстве',
  Category3 = 'Коммунальные расходы',
  Category4 = 'Налоги/сборы',
  Category5 = 'Оплата труда и начисления на зарплату сотрудников',
  Category6 = 'Обязательные начисления',
  Category7 = 'Доставка МПЗ',
  Category8 = 'Материальные издержки',
  Category9 = 'Оплата услуг сторонних организаций',
  Category10 = 'Иные затраты'
}

export interface Transaction {
  id: number,
  sum: number,
  date: Date,
  proportion?: number,
  category: ExpenseCategory | IncomeCategory
}

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor() { }
}
