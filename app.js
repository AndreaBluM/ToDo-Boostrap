
document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const tasksContainer = document.getElementById('tasks-container');
    const alertContainer = document.getElementById('alert-container');

    // Función para mostrar alertas modernas
    function showAlert(message, type = 'success') {
        const alert = document.createElement('div');
        alert.className = `alert-modern alert-${type}-modern fade-in-up`;
        alert.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <span>${message}</span>
                <button type="button" class="btn-close btn-close-white" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
        `;

        alertContainer.appendChild(alert);

        // Eliminar la alerta después de 4 segundos
        setTimeout(() => {
            if (alert.parentNode) {
                alert.style.opacity = '0';
                alert.style.transform = 'translateY(-20px)';
                setTimeout(() => alert.remove(), 300);
            }
        }, 4000);
    }

    // Función para añadir tarea con animación
    function addTask(taskText) {
        if (!taskText.trim()) {
            showAlert('Por favor ingresa una tarea válida', 'danger');
            return;
        }

        const taskItem = document.createElement('div');
        taskItem.className = 'task-item fade-in-up';
        taskItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <span class="task-content">${taskText}</span>
                <div class="task-actions">
                    <button class="btn btn-danger-modern" onclick="deleteTask(this)" title="Eliminar tarea">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `;

        tasksContainer.appendChild(taskItem);
        taskInput.value = '';
        taskInput.focus();
        showAlert('¡Tarea agregada exitosamente!', 'success');
        
        // Scroll suave hacia la nueva tarea
        setTimeout(() => {
            taskItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    // Función para eliminar tarea con animación mejorada
    window.deleteTask = function (button) {
        const taskItem = button.closest('.task-item');
        
        // Animación de salida
        taskItem.style.transform = 'translateX(-100%)';
        taskItem.style.opacity = '0';
        taskItem.style.transition = 'all 0.3s ease-out';

        setTimeout(() => {
            taskItem.remove();
            showAlert('Tarea eliminada correctamente', 'warning');
            
            // Si no hay más tareas, mostrar mensaje motivacional
            if (tasksContainer.children.length === 0) {
                const emptyMessage = document.createElement('div');
                emptyMessage.className = 'text-center py-4 fade-in-up';
                emptyMessage.style.color = 'var(--text-secondary)';
                emptyMessage.innerHTML = `
                    <i class="bi bi-check-circle fs-1 mb-3 d-block" style="color: var(--accent-color)"></i>
                    <p class="mb-0">¡Excelente! No tienes tareas pendientes.</p>
                    <small>Agrega una nueva tarea para comenzar.</small>
                `;
                tasksContainer.appendChild(emptyMessage);
            }
        }, 300);
    }

    // Event listeners con mejoras
    addBtn.addEventListener('click', () => {
        addTask(taskInput.value);
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // Efecto de focus mejorado para el input
    taskInput.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
        this.parentElement.style.boxShadow = 'var(--shadow-md)';
    });

    taskInput.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
        this.parentElement.style.boxShadow = 'none';
    });

    // Animación de entrada para elementos existentes
    const existingTasks = document.querySelectorAll('.task-item');
    existingTasks.forEach((task, index) => {
        setTimeout(() => {
            task.style.opacity = '1';
            task.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Smooth scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mensaje de bienvenida
    setTimeout(() => {
        showAlert('¡Bienvenido a tu gestor de tareas! 🎯', 'success');
    }, 500);
});
