export interface Program {
  key: string,
  name: string,
  constraints: Constraints
}

interface Constraints {
  execution: string
}
