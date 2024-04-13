import { FormControl, FormGroup } from "@angular/forms";

export interface TodoForm extends FormGroup<{
  id: FormControl<string>;
  content: FormControl<string>;
}> {}
