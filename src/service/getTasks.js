
export const postTodo = async (data) => {
  const response = await fetch('http://localhost:3000/tasks', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export const deleteResource = async (id) => {
  await fetch(`${'http://localhost:3000/tasks'}/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.status === 200) {
          console.log('Задача успешно удалена.');
        } else {
          console.log('Ошибка при удалении задачи.');
        }
      })
      .catch(error => {
        console.error('Ошибка при удалении задачи:', error);
      });
}

export const editResource = async (id, task) => {
  fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(task)
      })
      .then(response => response.json())
      .then(data => {
          console.log('Задача успешно обновлена:', data);
      })
      .catch(error => {
          console.error('Ошибка при обновлении задачи:', error);
      });
}


export const onRequest = async () => {
  try {
      const response = await fetch('http://localhost:3000/tasks', {
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
      // Можно выбросить ошибку или вернуть другое значение в зависимости от вашей логики
      throw error;
  }
}
