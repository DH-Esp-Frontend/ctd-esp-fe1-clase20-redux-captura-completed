export interface Posts {
  body: string;
  json(): any;
}
export interface IState {
  data: string[];
  loading: boolean;
}