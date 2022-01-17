export interface SpecificProgram {
  key: string;
  options: Option[];
  name: string;
}

interface Constraints {
  min: number;
  max: number;
  default: number;
}

interface Option {
  name: string;
  key: string;
  constraints: Constraints;
  unit: string;
  type: string;
}
