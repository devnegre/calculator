import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
    <div class="calculator">
      <div class="display">{{ display }}</div>
      <div class="buttons">
        <button class="clear" (click)="clear()">C</button>
        <button (click)="addNumber('7')">7</button>
        <button (click)="addNumber('8')">8</button>
        <button (click)="addNumber('9')">9</button>
        <button class="operator" (click)="addOperator('/')">/</button>
        <button (click)="addNumber('4')">4</button>
        <button (click)="addNumber('5')">5</button>
        <button (click)="addNumber('6')">6</button>
        <button class="operator" (click)="addOperator('*')">×</button>
        <button (click)="addNumber('1')">1</button>
        <button (click)="addNumber('2')">2</button>
        <button (click)="addNumber('3')">3</button>
        <button class="operator" (click)="addOperator('-')">-</button>
        <button (click)="addNumber('0')">0</button>
        <button (click)="addNumber('.')">.</button>
        <button class="equals" (click)="calculate()">=</button>
        <button class="operator" (click)="addOperator('+')">+</button>
      </div>
    </div>
  `
})
export class App {
  display: string = '0';
  firstOperand: number | null = null;
  operator: string | null = null;
  waitingForSecondOperand: boolean = false;

  addNumber(number: string): void {
    if (this.waitingForSecondOperand) {
      this.display = number;
      this.waitingForSecondOperand = false;
    } else {
      this.display = this.display === '0' ? number : this.display + number;
    }
  }

  addOperator(op: string): void {
    const inputValue = parseFloat(this.display);

    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.performCalculation(this.firstOperand, inputValue, this.operator);
      this.display = String(result);
      this.firstOperand = result;
    }

    this.waitingForSecondOperand = true;
    this.operator = op;
  }

  performCalculation(first: number, second: number, operator: string): number {
    switch (operator) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        return first / second;
      default:
        return second;
    }
  }

  calculate(): void {
    const inputValue = parseFloat(this.display);
    
    if (this.firstOperand !== null && this.operator) {
      const result = this.performCalculation(this.firstOperand, inputValue, this.operator);
      this.display = String(result);
      this.firstOperand = null;
      this.operator = null;
      this.waitingForSecondOperand = false;
    }
  }

  clear(): void {
    this.display = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }
}

bootstrapApplication(App);