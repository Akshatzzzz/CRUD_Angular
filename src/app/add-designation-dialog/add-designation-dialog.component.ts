import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Designation } from '../model/DesgnModel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-designation-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    CommonModule, 
    MatIconModule,
    FormsModule
  ],
  templateUrl: './add-designation-dialog.component.html',
  styleUrls: ['./add-designation-dialog.component.css'],
})
export class AddDesignationDialogComponent {
  designation: Designation = {
    name: '',
    department: '',
    payGrade: '',
    responsibilities: ''
  };

  constructor(public dialogRef: MatDialogRef<AddDesignationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.designation = { ...data };  // Prefill with existing data if passed for editing
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveDesignation(): void {
    if (this.designation.name && this.designation.department) {
      let existingDesignations = JSON.parse(localStorage.getItem('designations') || '[]');
      if (this.data) {
        const index = existingDesignations.findIndex(
          (item: any) => item.name === this.data.name && item.department === this.data.department
        );
        if (index !== -1) {
          existingDesignations[index] = this.designation;
        }
      } else {
        existingDesignations.push(this.designation);
      }
      localStorage.setItem('designations', JSON.stringify(existingDesignations));
      this.dialogRef.close(this.designation);
    } else {
      alert('Please fill in all fields');
    }
  }
  
}
