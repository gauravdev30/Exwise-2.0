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
    { id: 1, name: 'Amazon' },
    { id: 2, name: 'Flipkart' }
  ];

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CreateCouponComponent>) {
    this.couponForm = this.fb.group({
      companyId: [this.companies[0].id, Validators.required],
      poster: [null],
      title: ['', Validators.required],
      code: ['', Validators.required],
      couponType: ['Discount', Validators.required],
      discountType: ['Percentage', Validators.required],
      discountValue: [null, [Validators.required, Validators.min(0)]],
      minPurchase: [null, [Validators.min(0)]],
      maxDiscount: [null, [Validators.min(0)]],
      startDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      // recipient fields removed per spec
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
    // kept for backward compatibility; prefer onPosterChange
    const file = event.target.files && event.target.files[0];
    if (file) {
      this.couponForm.patchValue({ poster: file });
    }
  }

  onPosterChange(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      this.couponForm.patchValue({ poster: file });
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
