import {
  DefaultValueAccessor,
  FormControlDirective,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormControl,
  Validators,
  ɵNgNoValidate
} from "./chunk-GXSZMSFS.js";
import {
  CommonModule,
  NgClass,
  NgForOf
} from "./chunk-OLMF7RP5.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  EventEmitter,
  HostListener,
  Injectable,
  Input,
  InputFlags,
  NgModule,
  Output,
  ViewChildren,
  setClassMetadata,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵviewQuery
} from "./chunk-WZQAJSTH.js";
import {
  __spreadValues
} from "./chunk-WKYGNSYM.js";

// node_modules/ngx-otp-input/fesm2020/ngx-otp-input.mjs
var _c0 = ["otpInputElement"];
function NgxOtpInputComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 2)(1, "label")(2, "input", 3, 4);
    ɵɵlistener("keyup", function NgxOtpInputComponent_div_1_Template_input_keyup_2_listener($event) {
      const restoredCtx = ɵɵrestoreView(_r5);
      const i_r2 = restoredCtx.index;
      const ctx_r4 = ɵɵnextContext();
      return ɵɵresetView(ctx_r4.handleKeyUp(i_r2, $event.key));
    })("keyup.backspace", function NgxOtpInputComponent_div_1_Template_input_keyup_backspace_2_listener() {
      const restoredCtx = ɵɵrestoreView(_r5);
      const i_r2 = restoredCtx.index;
      const ctx_r6 = ɵɵnextContext();
      return ɵɵresetView(ctx_r6.handleDelete(i_r2));
    })("keyup.arrowLeft", function NgxOtpInputComponent_div_1_Template_input_keyup_arrowLeft_2_listener() {
      const restoredCtx = ɵɵrestoreView(_r5);
      const i_r2 = restoredCtx.index;
      const ctx_r7 = ɵɵnextContext();
      return ɵɵresetView(ctx_r7.stepBackward(i_r2));
    })("keyup.arrowRight", function NgxOtpInputComponent_div_1_Template_input_keyup_arrowRight_2_listener() {
      const restoredCtx = ɵɵrestoreView(_r5);
      const i_r2 = restoredCtx.index;
      const ctx_r8 = ɵɵnextContext();
      return ɵɵresetView(ctx_r8.stepForward(i_r2));
    })("focus", function NgxOtpInputComponent_div_1_Template_input_focus_2_listener() {
      const restoredCtx = ɵɵrestoreView(_r5);
      const i_r2 = restoredCtx.index;
      const ctx_r9 = ɵɵnextContext();
      return ɵɵresetView(ctx_r9.handleFocus(i_r2));
    });
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const control_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngClass", ctx_r0.otpConfig.classList == null ? null : ctx_r0.otpConfig.classList.inputBox);
    ɵɵadvance();
    ɵɵattribute("aria-label", ctx_r0.ariaLabels[i_r2]);
    ɵɵadvance();
    ɵɵproperty("id", "ngx-otp-input-" + i_r2)("formControl", control_r1)("ngxOtpPattern", ctx_r0.otpConfig.pattern)("type", ctx_r0.otpConfig.isPasswordInput ? "password" : "text")("ngClass", (ctx_r0.styles == null ? null : ctx_r0.styles.length) > 0 ? ctx_r0.styles[i_r2] : null);
  }
}
var NgxOtpBehavior;
(function(NgxOtpBehavior2) {
  NgxOtpBehavior2[NgxOtpBehavior2["DEFAULT"] = 0] = "DEFAULT";
  NgxOtpBehavior2[NgxOtpBehavior2["LEGACY"] = 1] = "LEGACY";
})(NgxOtpBehavior || (NgxOtpBehavior = {}));
var NgxOtpInputService = class {
  init2DArray(size) {
    return new Array(size).fill(new Array());
  }
  toArray(value) {
    return Array.isArray(value) ? value : [value];
  }
  addItemToAll(source, items) {
    if (source?.length > 0) {
      return source.map((entry) => entry.concat(items));
    }
  }
  removeItemFromAll(source, items) {
    if (source?.length > 0) {
      return source.map((entry) => entry.filter((item) => !items.includes(item)));
    }
  }
  addItemAtIndex(source, index, items) {
    if (source?.length > 0) {
      source[index] = source[index].concat(items);
      return source;
    }
  }
  removeItemAtIndex(source, index, items) {
    if (source?.length > 0) {
      source[index] = source[index].filter((item) => !items.includes(item));
      return source;
    }
  }
};
NgxOtpInputService.ɵfac = function NgxOtpInputService_Factory(t) {
  return new (t || NgxOtpInputService)();
};
NgxOtpInputService.ɵprov = ɵɵdefineInjectable({
  token: NgxOtpInputService,
  factory: NgxOtpInputService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxOtpInputService, [{
    type: Injectable
  }], null, null);
})();
var PatternDirective = class {
  constructor() {
    this.allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Escape", "Tab"];
  }
  onKeyDown(e) {
    if (this.allowedKeys.includes(e.key) || e.code === "KeyA" && e.ctrlKey === true || // Allow: Ctrl+A
    e.code === "KeyC" && e.ctrlKey === true || // Allow: Ctrl+C
    e.code === "KeyV" && e.ctrlKey === true || // Allow: Ctrl+V
    e.code === "KeyX" && e.ctrlKey === true || // Allow: Ctrl+X
    e.code === "KeyA" && e.metaKey === true || // Cmd+A (Mac)
    e.code === "KeyC" && e.metaKey === true || // Cmd+C (Mac)
    e.code === "KeyV" && e.metaKey === true || // Cmd+V (Mac)
    e.code === "KeyX" && e.metaKey === true) {
      return;
    } else if (!this.pattern.test(e.key)) {
      e.preventDefault();
    }
  }
};
PatternDirective.ɵfac = function PatternDirective_Factory(t) {
  return new (t || PatternDirective)();
};
PatternDirective.ɵdir = ɵɵdefineDirective({
  type: PatternDirective,
  selectors: [["", "ngxOtpPattern", ""]],
  hostBindings: function PatternDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("keydown", function PatternDirective_keydown_HostBindingHandler($event) {
        return ctx.onKeyDown($event);
      });
    }
  },
  inputs: {
    pattern: [InputFlags.None, "ngxOtpPattern", "pattern"]
  }
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatternDirective, [{
    type: Directive,
    args: [{
      selector: "[ngxOtpPattern]"
    }]
  }], null, {
    pattern: [{
      type: Input,
      args: ["ngxOtpPattern"]
    }],
    onKeyDown: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }]
  });
})();
var NgxOtpInputComponent = class {
  constructor(ngxOtpInputService, ref) {
    this.ngxOtpInputService = ngxOtpInputService;
    this.ref = ref;
    this.ngxOtpArray = new UntypedFormArray([]);
    this.ariaLabels = [];
    this.styles = [];
    this.otpConfig = {
      otpLength: 6,
      autofocus: true,
      autoblur: true,
      behavior: NgxOtpBehavior.DEFAULT
    };
    this.defaultPattern = /^\d+$/;
    this.DEFAULT_ARIA_LABEL = "One time password input";
    this.isNgxOtpArrayDisabled = false;
    this.focusedInputHasValue = false;
    this.otpChange = new EventEmitter();
    this.fill = new EventEmitter();
  }
  onPaste(event) {
    event.preventDefault();
    this.handlePaste(event.clipboardData.getData("text"));
  }
  set disable(isDisabled) {
    this.handleDisable(isDisabled);
    this.isNgxOtpArrayDisabled = isDisabled;
  }
  set config(c) {
    this.otpConfig = __spreadValues(__spreadValues({}, this.otpConfig), c);
    if (this.otpConfig.classList?.input) {
      this.setInitialStyles();
    }
    if (!c.pattern) {
      this.otpConfig.pattern = this.defaultPattern;
    }
  }
  set status(status) {
    this.handleStatusChange(status);
  }
  ngOnInit() {
    this.setUpOtpForm();
    this.setUpAriaLabels();
    this.LAST_INPUT_INDEX = this.otpConfig.otpLength - 1;
    this.otpFormChangeListener();
  }
  ngAfterViewInit() {
    this.setNativeHTMLElements();
    this.setInitialFocus();
    this.setNumericInputIfPossible();
    this.handleDisable(this.isNgxOtpArrayDisabled);
  }
  ngOnDestroy() {
    this.ngxOtpArray$.unsubscribe();
  }
  clear() {
    this.removeStyleFromAll(this.otpConfig.classList?.inputFilled);
    this.ngxOtpArray.reset();
    this.ref.detectChanges();
    if (this.otpConfig.autofocus) {
      this.setFocus(0);
    }
  }
  handleKeyUp(index, value) {
    if (this.otpConfig.pattern.test(value) && value !== "Backspace") {
      this.addStyle(index, this.otpConfig.classList?.inputFilled);
      if (!this.ngxOtpArray.valid) {
        this.getFormControlByIndex(index).setValue(value);
        this.stepForward(index);
      } else {
        this.blur();
      }
    }
  }
  handleDelete(index) {
    this.removeStyle(index, this.otpConfig.classList?.inputFilled);
    if (this.otpConfig.behavior === NgxOtpBehavior.LEGACY && !this.focusedInputHasValue || this.otpConfig.behavior !== NgxOtpBehavior.LEGACY) {
      this.stepBackward(index);
    } else {
      this.focusedInputHasValue = false;
    }
  }
  handleFocus(index) {
    this.focusedInputHasValue = !!this.ngxOtpArray.controls[index].value;
    if (this.otpConfig.behavior === NgxOtpBehavior.LEGACY && this.focusedInputHasValue) {
      this.inputs[index].select();
    }
  }
  stepBackward(index) {
    if (index > 0) {
      this.setFocus(index - 1);
    }
  }
  stepForward(index) {
    if (index < this.LAST_INPUT_INDEX) {
      this.setFocus(index + 1);
    }
  }
  otpFormChangeListener() {
    this.ngxOtpArray$ = this.ngxOtpArray.valueChanges.subscribe((values) => {
      this.otpChange.emit(values);
      if (this.ngxOtpArray.valid) {
        this.fill.emit(values.join(""));
      }
    });
  }
  setUpOtpForm() {
    for (let i = 0; i < this.otpConfig.otpLength; i++) {
      this.ngxOtpArray.push(new UntypedFormControl(null, [Validators.required]));
    }
  }
  setUpAriaLabels() {
    const labels = this.otpConfig.ariaLabels;
    this.ariaLabels = Array.isArray(labels) ? labels : new Array(this.otpConfig.otpLength).fill(labels || this.DEFAULT_ARIA_LABEL);
  }
  setNativeHTMLElements() {
    this.inputs = this.otpInputElements.map((element) => element.nativeElement);
  }
  setInitialFocus() {
    if (this.otpConfig.autofocus) {
      this.setFocus(0);
    }
  }
  setInitialStyles() {
    this.styles = this.ngxOtpInputService.init2DArray(this.otpConfig.otpLength);
    this.addStyleToAll(this.otpConfig.classList.input);
  }
  setFocus(index) {
    this.inputs[index].focus();
  }
  setNumericInputIfPossible() {
    if (this.otpConfig.numericInputMode) {
      this.otpConfig.pattern = this.defaultPattern;
      this.inputs.map((element) => {
        element.setAttribute("inputmode", "numeric");
        element.setAttribute("pattern", "[0-9]*");
      });
    }
  }
  blur() {
    if (this.otpConfig.autoblur) {
      this.inputs.map((input) => input.blur());
    }
  }
  handlePaste(value) {
    if (this.otpConfig.pattern.test(value)) {
      let lastIndex = 0;
      value.split("").slice(0, this.otpConfig.otpLength).map((character, index) => {
        this.addStyle(index, this.otpConfig.classList?.inputFilled);
        this.getFormControlByIndex(index).setValue(character);
        lastIndex = index;
      });
      if (this.ngxOtpArray.valid) {
        this.blur();
      } else {
        this.setFocus(lastIndex + 1);
      }
    }
  }
  handleDisable(isDisabled) {
    if (isDisabled) {
      this.ngxOtpArray.disable();
      this.addStyleToAll(this.otpConfig.classList?.inputDisabled);
    } else {
      this.ngxOtpArray.enable();
      this.removeStyleFromAll(this.otpConfig.classList?.inputDisabled);
    }
  }
  handleStatusChange(status) {
    this.removeStyleFromAll([...this.ngxOtpInputService.toArray(this.otpConfig.classList?.inputSuccess), ...this.ngxOtpInputService.toArray(this.otpConfig.classList?.inputError)]);
    if (status) {
      if (status === "success") {
        this.addStyleToAll(this.otpConfig.classList?.inputSuccess);
      } else if (status === "error") {
        this.addStyleToAll(this.otpConfig.classList?.inputError);
      }
    }
  }
  getFormControlByIndex(index) {
    return this.ngxOtpArray.controls[index];
  }
  addStyle(index, styles) {
    this.styles = this.ngxOtpInputService.addItemAtIndex(this.styles, index, this.ngxOtpInputService.toArray(styles));
  }
  addStyleToAll(styles) {
    this.styles = this.ngxOtpInputService.addItemToAll(this.styles, this.ngxOtpInputService.toArray(styles));
  }
  removeStyle(index, styles) {
    this.styles = this.ngxOtpInputService.removeItemAtIndex(this.styles, index, this.ngxOtpInputService.toArray(styles));
  }
  removeStyleFromAll(styles) {
    this.styles = this.ngxOtpInputService.removeItemFromAll(this.styles, this.ngxOtpInputService.toArray(styles));
  }
};
NgxOtpInputComponent.ɵfac = function NgxOtpInputComponent_Factory(t) {
  return new (t || NgxOtpInputComponent)(ɵɵdirectiveInject(NgxOtpInputService), ɵɵdirectiveInject(ChangeDetectorRef));
};
NgxOtpInputComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxOtpInputComponent,
  selectors: [["ngx-otp-input"]],
  viewQuery: function NgxOtpInputComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.otpInputElements = _t);
    }
  },
  hostBindings: function NgxOtpInputComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("paste", function NgxOtpInputComponent_paste_HostBindingHandler($event) {
        return ctx.onPaste($event);
      });
    }
  },
  inputs: {
    disable: "disable",
    config: "config",
    status: "status"
  },
  outputs: {
    otpChange: "otpChange",
    fill: "fill"
  },
  decls: 2,
  vars: 2,
  consts: [[1, "ngx-otp-input-container", 3, "ngClass"], ["class", "ngx-otp-input-box", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "ngx-otp-input-box", 3, "ngClass"], ["maxlength", "1", "autocapitalize", "off", "spellcheck", "false", 1, "ngx-otp-input", 3, "id", "formControl", "ngxOtpPattern", "type", "ngClass", "keyup", "keyup.backspace", "keyup.arrowLeft", "keyup.arrowRight", "focus"], ["otpInputElement", ""]],
  template: function NgxOtpInputComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "form", 0);
      ɵɵtemplate(1, NgxOtpInputComponent_div_1_Template, 4, 7, "div", 1);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵproperty("ngClass", ctx.otpConfig.classList == null ? null : ctx.otpConfig.classList.container);
      ɵɵadvance();
      ɵɵproperty("ngForOf", ctx.ngxOtpArray.controls);
    }
  },
  dependencies: [ɵNgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, FormControlDirective, NgForm, NgClass, NgForOf, PatternDirective],
  styles: [".ngx-otp-input-container[_ngcontent-%COMP%]{display:flex}.ngx-otp-input-box[_ngcontent-%COMP%]{margin:0 5px}.ngx-otp-input-box[_ngcontent-%COMP%]:first-child{margin-left:0}.ngx-otp-input-box[_ngcontent-%COMP%]:last-child{margin-right:0}.ngx-otp-input[_ngcontent-%COMP%]{width:35px;height:35px;text-align:center;font-size:1.25rem;border:1px solid #212121;border-radius:4px;outline:0}.ngx-otp-input-disabled[_ngcontent-%COMP%]{opacity:.3}"],
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxOtpInputComponent, [{
    type: Component,
    args: [{
      selector: "ngx-otp-input",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<form
  [ngClass]="otpConfig.classList?.container"
  class="ngx-otp-input-container"
>
  <div
    *ngFor="let control of ngxOtpArray.controls; let i = index"
    [ngClass]="otpConfig.classList?.inputBox"
    class="ngx-otp-input-box"
  >
    <label [attr.aria-label]="ariaLabels[i]">
      <input
        #otpInputElement
        [id]="'ngx-otp-input-' + i"
        [formControl]="control"
        [ngxOtpPattern]="otpConfig.pattern"
        [type]="otpConfig.isPasswordInput ? 'password' : 'text'"
          [ngClass]="styles?.length > 0 ? styles[i] : null"
        (keyup)="handleKeyUp(i, $event.key)"
        (keyup.backspace)="handleDelete(i)"
        (keyup.arrowLeft)="stepBackward(i)"
        (keyup.arrowRight)="stepForward(i)"
        (focus)="handleFocus(i)"
        class="ngx-otp-input"
        maxlength="1"
        autocapitalize="off"
        spellcheck="false"
      />
    </label>
  </div>
</form>
`,
      styles: [".ngx-otp-input-container{display:flex}.ngx-otp-input-box{margin:0 5px}.ngx-otp-input-box:first-child{margin-left:0}.ngx-otp-input-box:last-child{margin-right:0}.ngx-otp-input{width:35px;height:35px;text-align:center;font-size:1.25rem;border:1px solid #212121;border-radius:4px;outline:0}.ngx-otp-input-disabled{opacity:.3}\n"]
    }]
  }], function() {
    return [{
      type: NgxOtpInputService
    }, {
      type: ChangeDetectorRef
    }];
  }, {
    otpInputElements: [{
      type: ViewChildren,
      args: ["otpInputElement"]
    }],
    otpChange: [{
      type: Output
    }],
    fill: [{
      type: Output
    }],
    onPaste: [{
      type: HostListener,
      args: ["paste", ["$event"]]
    }],
    disable: [{
      type: Input
    }],
    config: [{
      type: Input
    }],
    status: [{
      type: Input
    }]
  });
})();
var NgxOtpInputModule = class {
};
NgxOtpInputModule.ɵfac = function NgxOtpInputModule_Factory(t) {
  return new (t || NgxOtpInputModule)();
};
NgxOtpInputModule.ɵmod = ɵɵdefineNgModule({
  type: NgxOtpInputModule,
  declarations: [NgxOtpInputComponent, PatternDirective],
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  exports: [NgxOtpInputComponent]
});
NgxOtpInputModule.ɵinj = ɵɵdefineInjector({
  providers: [NgxOtpInputService],
  imports: [ReactiveFormsModule, FormsModule, CommonModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxOtpInputModule, [{
    type: NgModule,
    args: [{
      declarations: [NgxOtpInputComponent, PatternDirective],
      imports: [ReactiveFormsModule, FormsModule, CommonModule],
      exports: [NgxOtpInputComponent],
      providers: [NgxOtpInputService]
    }]
  }], null, null);
})();
export {
  NgxOtpBehavior,
  NgxOtpInputComponent,
  NgxOtpInputModule
};
//# sourceMappingURL=ngx-otp-input.js.map
