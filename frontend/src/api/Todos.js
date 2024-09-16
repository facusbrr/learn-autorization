export async function createTodo(title, completed) {
  try {
    const response = await fetch("http://localhost:4000/todos", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        completed: completed,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error`);
    }

    const data = await response.json();
    console.log("Tarea creada:", data);
  } catch (error) {
    console.error(`Error al crear la tarea: ${error}`);
  }
}
export async function deleteTodo(id) {
  try {
    const response = await fetch(`http://localhost:4000/todos/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Tarea eliminada:", data);
    return data;
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
  }
}
