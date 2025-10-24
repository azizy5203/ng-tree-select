import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-tree-select-field',
  imports: [CommonModule, FormsModule, TreeSelectModule],
  templateUrl: './tree-select-field.html',
  styleUrl: './tree-select-field.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TreeSelectField),
      multi: true
    }
  ]
})
export class TreeSelectField implements ControlValueAccessor {
  @Input() label: string = 'Select';
  @Input() placeholder: string = 'Choose...';
  @Input() options: TreeNode[] = [];
  @Input() selectionMode: 'single' | 'multiple' | 'checkbox' = 'checkbox';
  @Input() disabled: boolean = false;
  @Input() filter: boolean = true;
  @Input() showClear: boolean = true;

  value: any = null;
  
  // ControlValueAccessor callbacks
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onValueChange(value: any): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
