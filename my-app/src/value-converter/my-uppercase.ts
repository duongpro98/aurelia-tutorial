export class MyUppercaseValueConverter {
  toView(value: string): string {
    if (value === undefined || value === null) {
      return value;
    }
    return value.toUpperCase() + 2;
  }
}
