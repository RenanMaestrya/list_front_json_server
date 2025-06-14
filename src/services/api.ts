import { User } from "../types/user";

const API_URL = "http://localhost:3001";

export const api = {
  async getUsers(): Promise<User[]> {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error("Erro ao buscar usuários");
    }
    return response.json();
  },

  async getUserById(id: number): Promise<User> {
    const response = await fetch(`${API_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar usuário");
    }
    return response.json();
  },
};
