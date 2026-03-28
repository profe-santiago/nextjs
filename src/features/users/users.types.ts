// Interfaces TypeScript del dominio User.
// Reflejan la forma de los datos que devuelve la API.

export interface User {
  id:        number;
  name:      string;
  email:     string;
  isActive:  boolean;
  createdAt: string;
}

export interface CreateUserPayload {
  name:  string;
  email: string;
}