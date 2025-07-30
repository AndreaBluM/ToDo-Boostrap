
document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const tasksContainer = document.getElementById('tasks-container');
    const alertContainer = document.getElementById('alert-container');

    //  mostrar alerta
    function showAlert(message, type = 'success') {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show`;
        alert.role = 'alert';
        alert.innerHTML = `
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                `;

        alertContainer.appendChild(alert);

        // Eliminar la alerta después de 3 segundos
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }

    // añadir tarea
    function addTask(taskText) {
        if (!taskText.trim()) {
            showAlert('Por favor ingresa una tarea válida', 'danger');
            return;
        }

        const taskItem = document.createElement('div');
        taskItem.className = 'list-group-item py-3 task-item';
        taskItem.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center">
                        <span>${taskText}</span>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteTask(this)">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                `;

        tasksContainer.appendChild(taskItem);
        taskInput.value = '';
        showAlert('Tarea agregada correctamente');
    }

    // eliminar tarea
    window.deleteTask = function (button) {
        const taskItem = button.closest('.task-item');
        taskItem.classList.add('animate__animated', 'animate__fadeOut');

        setTimeout(() => {
            taskItem.remove();
            showAlert('Tarea eliminada', 'warning');
        }, 500);
    }

    // Event
    addBtn.addEventListener('click', () => addTask(taskInput.value));

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(taskInput.value);
        }
    });
});



