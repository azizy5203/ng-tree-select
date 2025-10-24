import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TreeNode } from 'primeng/api';
import { TreeSelectField } from './components/tree-select-field/tree-select-field';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    ButtonModule, 
    CardModule, 
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    TreeSelectField
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('tree-project');
  exampleForm!: FormGroup;
  
  // Tree data for departments
  departmentOptions: TreeNode[] = [];
  
  // Tree data for teams
  teamOptions: TreeNode[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeTreeData();
    this.initializeForm();
  }

  initializeForm() {
    this.exampleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      department: [null, Validators.required],
      team: [null]
    });
  }

  initializeTreeData() {
    // Department tree structure - only third level (leaf nodes) are selectable
    this.departmentOptions = [
      {
        label: 'Engineering',
        key: 'eng',
        selectable: false, // First level not selectable
        children: [
          {
            label: 'Frontend Development',
            key: 'eng-frontend',
            selectable: false, // Second level not selectable
            children: [
              { label: 'React Team', key: 'eng-frontend-react', selectable: true },
              { label: 'Angular Team', key: 'eng-frontend-angular', selectable: true },
              { label: 'Vue Team', key: 'eng-frontend-vue', selectable: true }
            ]
          },
          {
            label: 'Backend Development',
            key: 'eng-backend',
            selectable: false, // Second level not selectable
            children: [
              { label: 'Node.js Team', key: 'eng-backend-node', selectable: true },
              { label: 'Python Team', key: 'eng-backend-python', selectable: true },
              { label: 'Java Team', key: 'eng-backend-java', selectable: true }
            ]
          },
          {
            label: 'DevOps',
            key: 'eng-devops',
            selectable: false, // Second level not selectable
            children: [
              { label: 'Infrastructure', key: 'eng-devops-infra', selectable: true },
              { label: 'CI/CD', key: 'eng-devops-cicd', selectable: true }
            ]
          }
        ]
      },
      {
        label: 'Product',
        key: 'product',
        selectable: false, // First level not selectable
        children: [
          { label: 'Product Management', key: 'product-management', selectable: true },
          { label: 'Product Design', key: 'product-design', selectable: true },
          { label: 'UX Research', key: 'product-ux', selectable: true }
        ]
      },
      {
        label: 'Operations',
        key: 'operations',
        selectable: false, // First level not selectable
        children: [
          { label: 'Customer Support', key: 'ops-support', selectable: true },
          { label: 'Sales', key: 'ops-sales', selectable: true },
          { label: 'Marketing', key: 'ops-marketing', selectable: true }
        ]
      }
    ];

    // Team tree structure - only third level (leaf nodes) are selectable
    this.teamOptions = [
      {
        label: 'Alpha Team',
        key: 'alpha',
        selectable: false, // First level not selectable
        children: [
          { label: 'Team Lead', key: 'alpha-lead', selectable: true },
          { label: 'Senior Members', key: 'alpha-senior', selectable: true },
          { label: 'Junior Members', key: 'alpha-junior', selectable: true }
        ]
      },
      {
        label: 'Beta Team',
        key: 'beta',
        selectable: false, // First level not selectable
        children: [
          { label: 'Team Lead', key: 'beta-lead', selectable: true },
          { label: 'Senior Members', key: 'beta-senior', selectable: true },
          { label: 'Junior Members', key: 'beta-junior', selectable: true }
        ]
      },
      {
        label: 'Gamma Team',
        key: 'gamma',
        selectable: false, // First level not selectable
        children: [
          { label: 'Team Lead', key: 'gamma-lead', selectable: true },
          { label: 'Senior Members', key: 'gamma-senior', selectable: true },
          { label: 'Junior Members', key: 'gamma-junior', selectable: true }
        ]
      }
    ];
  }

  onSubmit() {
    if (this.exampleForm.valid) {
      const cleanedValue = this.getCleanFormValue();
      console.log('Form Submitted:', cleanedValue);
      console.log('Raw Form Value:', this.exampleForm.value);
      alert('Form submitted successfully! Check console for details.');
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.exampleForm);
    }
  }

  resetForm() {
    this.exampleForm.reset();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Helper method to extract keys from TreeNode objects
  private extractTreeNodeKeys(value: any): any {
    if (!value) return value;
    
    // Handle single TreeNode object
    if (value.key !== undefined && value.label !== undefined) {
      return { key: value.key, label: value.label };
    }
    
    // Handle array of TreeNode objects (checkbox mode)
    if (Array.isArray(value)) {
      return value.map(item => {
        if (item && item.key !== undefined && item.label !== undefined) {
          return { key: item.key, label: item.label };
        }
        return item;
      });
    }
    
    // Handle object with TreeNode values
    if (typeof value === 'object') {
      const result: any = {};
      for (const key in value) {
        result[key] = this.extractTreeNodeKeys(value[key]);
      }
      return result;
    }
    
    return value;
  }

  getCleanFormValue() {
    return this.extractTreeNodeKeys(this.exampleForm.value);
  }

  get formValue() {
    const cleanedData = this.getCleanFormValue();
    return JSON.stringify(cleanedData, null, 2);
  }
}
