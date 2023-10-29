class GetTasks {
    getResource = async (url) => {
        let res = await fetch(url, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            }
        });

        if(!res.ok) {
            throw new Error('error');
        }

        return res;
    }

    postResource = async (method, url, arr) => {
        await fetch(url, {
            method: method,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(arr)
          })
            .then(response => response.json())
            .then(data => {
                console.log('Задача успешно создана:', data);
            })
            .catch(error => {
                console.error('Ошибка при создании задачи:', error);
            });
    }

    deleteResource = async (url, id) => {
        await fetch(`${url}/${id}`, {
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

    editResource = async (id, task) => {
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
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
}

export default GetTasks;
