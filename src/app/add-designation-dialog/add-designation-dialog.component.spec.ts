import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDesignationDialogComponent } from './add-designation-dialog.component';

describe('AddDesignationDialogComponent', () => {
  let component: AddDesignationDialogComponent;
  let fixture: ComponentFixture<AddDesignationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDesignationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDesignationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
