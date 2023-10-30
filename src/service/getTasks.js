
export const postTodo = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export const deleteResource = async (url, id) => {
  await fetch(`${url}/${id}`, {
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
        console.error('Ошибка при удалении задачи:', error);
      });
}

export const editResource = async (id, task) => {
  console.log(id, task);
  fetch(`https://serverjson-2fgv-git-main-andreys-projects-ede7bc3b.vercel.app/todos/${id}`, {
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