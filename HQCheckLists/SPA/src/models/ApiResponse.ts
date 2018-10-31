export class ApiResponse<T> {
  Data: T = null;
  Success: boolean = false;
  Message: string = "";
}