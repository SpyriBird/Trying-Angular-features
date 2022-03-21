import { Component, Input, OnInit, ViewChild, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Transaction } from '../budget.service'
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BudgetTableComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: any;
  private charData;

  public form: FormGroup;

  @Input('transactions') public transactions: Transaction[];
  @Input('categories') public categories: string[];

  @ViewChild(MatTable) table: MatTable<Transaction>;

  public dataSource;
  public selection;
  public displayedColumns: string[] = ['select','id', 'sum', 'proportion','date', 'category', 'actions'];
  private _latestDate: Date;

  public adding: boolean = false;
  public editing: boolean = false;
  public editedRow: Transaction;

  constructor() {}

  ngOnInit(): void {

    this._createFormGroup();

    this.dataSource = new MatTableDataSource<Transaction>(this.transactions);
    this.selection = new SelectionModel<Transaction>(true, this.transactions);

    this._update();
    this._setCharOptions();
    
  }

  private _createFormGroup() {
    this.form = new FormGroup({
      sum: new FormControl(100, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]),
      category: new FormControl('', [Validators.required])
    });

  }

  private _setCharOptions() {
    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Круговая диаграмма'
      },
      series: [{
        name: 'сумма',
        colorByPoint: true,
        data: this.charData
      }]
    };
  }

  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  public removeRow(id: number) {   

    let row =  this.transactions.find(i => i.id === id);
    this.transactions = this.transactions.filter(i => i.id !== id);

    this.selection.deselect(row);

    this._update();
  }

  public getTotalCost() {
    return this.transactions.map(data => data.sum).reduce((sum, current) => sum + current, 0);
  }

  public editRow(id: number) {
    
    this.editedRow= this.transactions.find((item) => item.id === id);

    this.editing = true;
    this.form.patchValue({sum: this.editedRow.sum, category: this.editedRow.category})
  }

  public checkboxLabel(row?: Transaction): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  private _setProportions() {
    let total = this.getTotalCost();

    for (let t of this.transactions) {
      t.proportion = +(t.sum / total).toFixed(4);
    }
  }

  public getNow() {
    this._latestDate = new Date();
    return this._latestDate;
  }

  public onSubmit() {
   if (this.adding) {

    let newTransaction = {
      id: this.transactions[this.transactions.length - 1].id + 1,
      sum: this.form.value.sum,
      date: this._latestDate,
      category: this.form.value.category,
    };
      this.transactions.push(newTransaction);
      this._setProportions();
      this.table.renderRows();
  
      this.form.reset();
      this.adding = false;
      this.selection.select(newTransaction);
      this._update();
      
      return;
    }

    this.editedRow.sum = this.form.value.sum;
    this.editedRow.category = this.form.value.category;

    let index = this.transactions.findIndex((item) => item.id === this.editedRow.id);
    this.transactions[index] = this.editedRow;

    this._setProportions();
    this.table.renderRows();
  
    this.form.reset();
    this.editing = false;
    this._update();
  }
  
  public hideForm() {
    this.adding = false;
    this.editing = false;
  }

  private _update() {
    this._setCharData();
    this._setProportions();
    this._setCharOptions();
  }

  public onChangeCheckbox() {
    this._update();
  }

  private _setCharData() {
    let charData = [];
    
    for (let c of this.categories) {
    
      let sum = this.selection.selected
      .filter(item => item.category === c)
      .map(c => c.sum)
      .reduce((sum, current) => sum + current, 0);

      if (!sum) continue;

      charData.push({name: c, y: sum});
    }    
    this.charData = charData;
  }
}
