import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoRowComponent } from "./components/todo-row/todo-row.component";
import { AsyncPipe } from "@angular/common";
import { DialogComponent } from "./components/dialog/dialog.component";
import { TodoForm } from "./types/todo-form.type";
import { NonNullableFormBuilder } from "@angular/forms";
import { Todo } from "./types/todo.type";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoRowComponent, AsyncPipe, DialogComponent],
  template: `
    <div class="wrapper flex flex-col gap-2 items-center">
      <div>
        <button (click)="openDialog()">Create new item</button>
      </div>
      <div>
        @for (todo of todos; track todo.id; let index = $index) {
          <app-todo-row
            [todo]="todo"
            (editTodo)="editTodo(todo)"
            (removeTodo)="removeTodo(index)"
          ></app-todo-row>
        }
      </div>
      <dialog type="modal" id="dialog" #dialog>
        <app-dialog [form]="form" (closeDialog)="closeDialog()" (onSubmit)="onSubmit()"/>
      </dialog>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  todos: Todo[] = [
    {
      id: "3bbe09df-c94c-430e-92d7-def239b92731",
      content: "First item"
    },
    {
      id: "812399af-623d-45dd-bdff-a00938789149",
      content: "Second item"
    }
  ];

  form: TodoForm = this.fb.group({
    id: this.fb.control<string>(''),
    content: this.fb.control<string>('')
  })

  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

  constructor(private fb: NonNullableFormBuilder) {
  }

  onSubmit(): void {
    const todo: Todo = this.form.value;
    if (todo.id) {
      this.editTodo(todo);
    } else {
      const newTodo: Todo = {
        ...todo,
        id: uuidv4()
      }
      this.addTodo(newTodo);
    }
    console.log(this.form.value);
    this.form.reset();
    this.closeDialog();
  }

  private addTodo(todo: Todo): void {
    this.todos.push(todo);
  }

  removeTodo(index: number): void {
    this.todos.splice(index, 1);
  }

  editTodo(todo: Todo): void {
    this.form.reset(todo);
    this.openDialog();
  }

  openDialog(): void {
    this.dialog.nativeElement.showModal();
  }

  closeDialog(): void {
    this.dialog.nativeElement.close();
  }
}
