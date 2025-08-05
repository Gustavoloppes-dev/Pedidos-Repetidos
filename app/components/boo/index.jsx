
const planilha =
  "https://docs.google.com/spreadsheets/d/1ZhswkqiHrTxJ9RBQbNj5LXvvnyj4bZ9hYKPlGMq7PG4/edit";
const pagina = "Livros";
const celulas = "A1:F";
const url =
  "https://script.google.com/macros/s/AKfycby2TotDu2AZYy-y-YtYWzSzvI9JriDF-y1kzimQw_13Wpz7tHx7P_wZ__XGGwMcI7yyZg/exec";

export async function getBooks() {
  try {
    const response = await fetch(
      `${url}?link=${encodeURIComponent(planilha)}&pagina=${pagina}&celulas=${celulas}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    throw error;
  }
}