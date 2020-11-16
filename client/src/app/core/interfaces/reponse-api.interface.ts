export interface ResponseApi<T> {
  data: T;
  message: string;
  success: boolean;
}
