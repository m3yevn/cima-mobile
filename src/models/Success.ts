export class GlobalSuccess {
  constructor(code?: number, name?: string, message?: string,navigateUrl?: string) {
    this.code = code || 200;
    this.name = name || "";
    this.message = message || "";
    this.navigateUrl = navigateUrl || "";
  }
  code: number;
  name: string;
  message: string;
  navigateUrl: string;
}
