"use client"

import { useEffect, useState } from "react";
import { getBooks } from "../components/boo";


export default function RelatorioPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Lista de Livros</h1>
      <ul>
        {books.map((book, index) => (
          <li key={index}>{book[0]}</li>
        ))}
      </ul>
    </div>
  );
}