export interface ProgramToExecute {
  data: Data;
}

interface Option {
  key: string;
  value: number;
  unit: string;
}

interface Data {
  key: string;
  options: Option[];
}
