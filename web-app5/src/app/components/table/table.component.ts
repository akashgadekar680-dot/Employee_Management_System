import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-table',
  standalone: true, // Needed because we are using imports
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  @Input() data: any[] = [];
  @Input() displayedColumns: string[] = [];
  
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  // Emit edit event
  edit(rowData: any) {
    this.onEdit.emit(rowData);
  }

  // Emit delete event
  delete(rowData: any) {
    this.onDelete.emit(rowData);
  }
}
