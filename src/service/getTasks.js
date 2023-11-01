
export const postTodo = async (data) => {
  const response = await fetch('https://serverjson-2fgv.vercel.app/todos', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export const deleteResource = async (id) => {
  await fetch(`${'https://serverjson-2fgv.vercel.app/todos'}/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.status === 500) {
          console.log('Задача успешно удалена.');
        } else {
          console.log('Ошибка при удалении задачи.');
        }
      })
      .catch(error => {
        console.log('good');
      });
}

export const editResource = async (id, task) => {
  fetch(`https://serverjson-2fgv.vercel.app/todos/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task)
      })
      .then(response => response.json())
      .catch(error => {
          console.log('good');
      });
}


export const onRequest = async () => {
  try {
      const response = await fetch('https://serverjson-2fgv.vercel.app/todos', {
          method: "GET"
      });

      if (response.ok) {
          const data = await response.json();
          return data;
      } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
  } catch (error) {
      console.error("An error occurred:", error);
      throw error;
  }
}
