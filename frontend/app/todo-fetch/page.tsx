import React from 'react';
import Image from 'next/image';

interface UserTodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

interface TodosResponse {
  todos: UserTodo[];
  total: number;
  skip: number;
  limit: number;
}

export const revalidate = 60; // ISR - revalidate cache setiap 60 detik

export default async function TodoFetchPage() {
  // Fetch data directly from DummyJSON (Server-Side)
  const res = await fetch('https://dummyjson.com/todos?limit=10');
  
  if (!res.ok) {
    throw new Error('Gagal mengambil data todo dari API');
  }
  
  const data: TodosResponse = await res.json();
  const todos = data.todos;

  return (
    <main className="min-h-screen p-6 md:p-10 bg-white">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="bg-white p-6 rounded-2xl border border-gray-100 mb-8 shadow-sm">
          <h1 className="text-2xl font-bold text-dark-70">
            Daftar Tugas Server-Side (Fetch langsung)
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Data dirender di server menggunakan Server Components dan SSR/ISR. 
            Ditampilkan 10 tugas pertama dari API DummyJSON.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {todos.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border flex flex-col gap-3 transition-colors ${item.completed ? 'bg-success-10/20 border-success-20' : 'bg-white border-gray-100'}`}
            >
              <div className="flex justify-between items-start">
                <span className={`text-xs px-2 py-1 rounded-md font-medium ${item.completed ? 'bg-success-20 text-success-70' : 'bg-warning-10 text-warning-80'}`}>
                  {item.completed ? 'Selesai' : 'Pending'}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">
                  ID: {item.id}
                </span>
              </div>
              
              <p className={`text-sm md:text-base font-medium leading-relaxed flex-1 ${item.completed ? 'line-through text-gray-40' : 'text-dark-70'}`}>
                {item.todo}
              </p>

              <div className="flex items-center gap-2 mt-2 pt-3 border-t border-gray-50">
                {/* Menggunakan ui-avatars untuk mendapatkan gambar avatar inisial secara dinamis */}
                <Image
                  src={`https://ui-avatars.com/api/?name=User+${item.userId}&background=random&size=32`}
                  alt={`User ${item.userId} Avatar`}
                  width={24}
                  height={24}
                  className="rounded-full"
                  unoptimized // Kita disable optimasi next/image untuk external URL ui-avatars agar simpel
                />
                <span className="text-xs text-gray-500">
                   Assigned to User #{item.userId}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}