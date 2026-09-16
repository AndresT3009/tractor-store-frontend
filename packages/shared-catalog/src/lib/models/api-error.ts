// Forma que devuelve Spring Boot para ResponseStatusException (RFC 7807 ProblemDetail).
export interface ApiProblem {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
}
