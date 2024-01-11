declare global {
  type Maybe<T> = T | null;

  type ConvertClassToType<T> = Omit<T, ''>;

  interface IError {
    message: string;
  }
}
export {};
