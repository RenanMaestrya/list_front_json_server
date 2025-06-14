"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { User } from "../types/user";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await api.getUsers();
        setUsers(data);
      } catch {
        setError("Erro ao carregar usuários");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Lista de Usuários</h1>
      <div className="grid gap-4">
        {users.map((user) => (
          <Link
            key={user.id}
            href={`/users/${user.id}`}
            className="p-4 border rounded-lg hover:bg-gray-50/50 transition-colors duration-200 ease-in-out"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  user.active
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {user.active ? "Ativo" : "Inativo"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
