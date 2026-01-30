import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.css']
})
export class CreateCouponComponent implements OnInit {
  couponForm: FormGroup;
  manualCode = false;

  companies = [
    { id: 1, name: 'Infosys' },
    { id: 2, name: 'TCS' },
    { id: 3, name: 'Wipro' },
    { id: 4, name: 'Tech Mahindra' }
  ];

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CreateCouponComponent>) {
    this.couponForm = this.fb.group({
      companyId: [{ value: this.companies[0].id, disabled: true }, Validators.required],
      companyLogo: [null],
      title: ['', Validators.required],
      code: ['', Validators.required],
      discountType: ['Percentage', Validators.required],
      discountValue: [null, [Validators.required, Validators.min(0)]],
      minPurchase: [null, [Validators.min(0)]],
      maxDiscount: [null, [Validators.min(0)]],
      startDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      recipientName: ['', Validators.required],
      recipientContact: ['', Validators.required],
      message: ['']
    });
  }

  ngOnInit(): void {
    this.generateCode();
  }

  toggleManual() {
    this.manualCode = !this.manualCode;
    if (!this.manualCode) this.generateCode();
  }

  generateCode() {
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
    const prefix = 'CPN';
    this.couponForm.patchValue({ code: `${prefix}-${rand}` });
  }

  onLogoChange(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      this.couponForm.patchValue({ companyLogo: file });
    }
  }

  submit() {
    if (this.couponForm.invalid) return;
    const payload = { ...this.couponForm.getRawValue() };
    // TODO: send payload to API. For now close dialog with payload
    this.dialogRef.close(payload);
  }

  cancel() {
    this.dialogRef.close();
  }
}
