export interface ValidateError {
  status: "error";
  message: string;
  field: string;
}