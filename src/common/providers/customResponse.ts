// Define a type or interface reflecting the structure of CustomResponseBody
export interface CustomResponseBodyType<
  T = Record<string, any> | Array<Record<string, any>>,
> {
  message: string;
  data: T;
}

// Class definition with the specified type/interface
export class CustomResponseBody<
  T = Record<string, any> | Array<Record<string, any>>,
> {
  message: string;
  data: T;

  constructor(message = 'Operation completed successfully', body: T = {} as T) {
    this.message = message;
    this.data = body;
  }
}
