import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule , MatDialog ,MatDialogRef} from '@angular/material/dialog';
import { AddDesignationDialogComponent } from './add-designation-dialog/add-designation-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,        
    MatToolbarModule,   
    MatButtonModule,   
    MatIconModule ,
    MatCardModule,
    MatInputModule,
    FlexLayoutModule,
    MatTableModule,
    MatDialogModule,
    AddDesignationDialogComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Task_app';
  displayedColumns: string[] = ['name', 'department','payGrade', 'responsibilities', 'actions'];
  dataSource: any[] = [];  // Holds the table data
  originalData: any[] = [];  // Holds the full data for reset after search

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadDataFromLocalStorage();
  }

  loadDataFromLocalStorage() {
    const storedData = localStorage.getItem('designations');
    if (storedData) {
      this.originalData = JSON.parse(storedData);
      this.dataSource = [...this.originalData];  // Initialize with full data
    }
  }

  openDialog(row?: any): void {
    const dialogRef = this.dialog.open(AddDesignationDialogComponent, {
      width: '50%',
      data: row ? { ...row } : null, // Pass row data if editing
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Reload the dataSource to reflect changes
        this.loadDataFromLocalStorage();
      }
    });
  }

  addDesignationToTable(newDesignation: any): void {
    this.dataSource.push(newDesignation);
    localStorage.setItem('designations', JSON.stringify(this.dataSource));
    this.dataSource = [...this.dataSource];  // Trigger change detection
  }

  searchDesignations(event: Event) {
    const query = (event.target as HTMLInputElement).value; // Explicitly cast to HTMLInputElement
    if (query) {
      this.dataSource = this.originalData.filter((designation) =>
        Object.values(designation).some((value) =>
          value && typeof value === 'string' && value.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      // Reset to the original data if the query is empty
      this.dataSource = [...this.originalData];
    }
  }


  deleteDesignation(index: number): void {
    this.dataSource.splice(index, 1);  // Remove from dataSource
    localStorage.setItem('designations', JSON.stringify(this.dataSource));  // Update localStorage
    this.dataSource = [...this.dataSource];  // Trigger change detection
  }

  updateDesignation(index: number, updatedDesignation: any): void {
    this.dataSource[index] = updatedDesignation;  // Update the specific designation
    localStorage.setItem('designations', JSON.stringify(this.dataSource));  // Update localStorage
    this.dataSource = [...this.dataSource];  // Trigger change detection
  }
}
