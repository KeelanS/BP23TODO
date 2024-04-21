import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { TodoForm } from "../../types/todo-form.type";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <div class="flex justify-end">
      <button (click)="closeDialog.emit()" class="px-4 py-2">X</button>
    </div>
    <div class="form-wrapper">
      <form [formGroup]="form" (ngSubmit)="submitForm.emit()" class="m-5">
        <div class="mb-4 flex flex-col">
          <label class="mb-2" for="content">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            class="border"
            [formControl]="form.controls.content"
          ></textarea>
        </div>
        <div class="w-full flex justify-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  `,
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  @Input() form: TodoForm;

  @Output() closeDialog = new EventEmitter();
  @Output() submitForm = new EventEmitter();
}
