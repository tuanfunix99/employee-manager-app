interface validType {
  errors: string[];
  check: boolean;
}

export class validator {
  private errors: string[];
  private check: boolean;
  private arg: string | null;

  constructor(arg: string | null) {
    this.errors = [];
    this.check = false;
    this.arg = arg;
  }

  private funtionTemplate(logic: boolean, message: string) {
    if (logic) {
      this.check = true;
    } else {
      this.errors.push(message);
    }
  }

  isEmpty() {
    this.funtionTemplate(
      this.arg && this.arg.trim().length > 0 ? true : false,
      "Value is required"
    );
    return this;
  }

  isEmail() {
    const regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.funtionTemplate(
      this.arg && regex.test(this.arg) ? true : false,
      "Value not match email"
    );
    return this;
  }

  max(value: number) {
    this.funtionTemplate(
      this.arg && this.arg.trim().length <= value ? true : false,
      `Value max length is ${value}`
    );
    return this;
  }

  min(value: number) {
    this.funtionTemplate(
      this.arg && this.arg.trim().length >= value ? true : false,
      `Value min length is ${value}`
    );
    return this;
  }

  test() {
    if (this.errors.length <= 0) this.check = true;
    else this.check = false;
    const result: validType = {
      errors: this.errors,
      check: this.check,
    };
    return result;
  }
}
