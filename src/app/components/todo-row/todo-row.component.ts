import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from "../../types/todo.type";
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPencil, heroTrash } from "@ng-icons/heroicons/outline";

@Component({
  selector: 'app-todo-row',
  standalone: true,
  imports: [
    NgIconComponent
  ],
  providers: [provideIcons({ heroPencil, heroTrash })],
  template: `
    <div class="flex justify-between border border-gray-100 items-center w-fit">
      <div class="font-bold">{{todo.content}}</div>
      <div class="flex gap-3 mx-3">
        <button>
          <ng-icon name="heroPencil"></ng-icon>
        </button>
        <button>
          <ng-icon name="heroTrash"></ng-icon>
        </button>
      </div>
    </div>
  `,
  styleUrl: './todo-row.component.scss'
})
export class TodoRowComponent {
  @Input() todo: Todo;
  @Output() removeTodo = new EventEmitter();
  @Output() editTodo = new EventEmitter();
}
