(function () {
    // Declare variables
    let tasks_container = document.querySelector('.wrapper');
    let task_input = document.querySelector('#input-task');
    let btn_add_task = document.querySelector('.btn-add-task');

    // Get all tasks
    function getAllTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        if (!tasks) return []; else return tasks;
    }

    // Render tasks
    function renderTasks() {
        let tasks_body = document.querySelector('.tasks');
        let tasks = getAllTasks();
        let html = '';
        let index = 1;
        for (task of tasks) {
            html += `
                <div class="task ${task.isChecked == 1 ? 'task-checked' : ''}" id="task-${task.id}">
                    <p class="task-content">${task.title}</p>
                    <div class="task-actions">
                       <div class="task-action-right">
                          <div class="checkbox">
                             <input type="checkbox" ${task.isChecked == 1 ? 'checked' : ''}/>
                             <span class="checkbox-label"></span>
                          </div>
                          <button class="btn-edit">
                             <i class="icon-edit"></i>
                          </button>
                          <button class="btn-delete">
                             <i class="icon-trash"></i>
                          </button>
                       </div>
                       <div class="task-action-left">
                          <button class="btn-save">Save</button>
                          <button class="btn-cancel">Cancel</button>
                       </div>
                    </div>
                </div>
			`;
            index++;
        }
        tasks_body.innerHTML = html;
    }

    // Call render tasks
    renderTasks();

    // Add task
    function addTask(title) {
        let tasks = getAllTasks();
        let id;
        if (tasks.length == 0) id = 1
        else id = tasks[tasks.length - 1].id + 1;

        tasks.push({id, title, isChecked: 0});
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add task handler
    function addTaskHandler() {
        if (task_input.value.trim() == '') return;
        addTask(task_input.value);
        task_input.value = '';
        renderTasks();
    }

    // Add task with enter event -> Event handler
    task_input.addEventListener('keyup', (e) => {
        if (e.keyCode == 13) addTaskHandler();
    });

    // Add task with button -> Event handler
    btn_add_task.addEventListener('click', () => addTaskHandler());

    // Delete task
    function deleteTask(id) {
        let tasks = getAllTasks();
        // let length = tasks.length;
        tasks = tasks.filter((task) => task.id != id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        // return tasks.length != length;
    }

    // Delete task -> Event handler
    tasks_container.addEventListener('click', (e) => {
        let target = e.target;
        if (target.classList.contains('btn-delete')) {
            let id = target.parentElement.parentElement.parentElement.id.substr(5);

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    deleteTask(id);
                    renderTasks();
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire(
                        'Cancelled',
                        'Your file is safe :)',
                        'error'
                    )
                }
            })
        }
    });

    // Edit task
    function editTask(id, title) {
        let tasks = getAllTasks();
        tasks = tasks.map((task) => {
            if (task.id == id) {
                return {...task, title};
            }
            return task;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Edit task -> Event handler
    tasks_container.addEventListener('click', (e) => {
        let target = e.target;
        if (target.classList.contains('btn-edit')) {
            let task = target.parentElement.parentElement.parentElement;
            let id = task.id.substr(5);
            let title = task.querySelector('.task-content').innerHTML;

            Swal.fire({
                title: `Edit ${title}`,
                input: 'text',
                inputValue: title,
                didOpen: () => {
                    const input = Swal.getInput()
                    input.setSelectionRange(0, input.value.length)
                },
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Update',
                showLoaderOnConfirm: true,
            }).then((result) => {
                if (result.value === null) return false;

                if(result.isConfirmed) {
                    Swal.fire(
                        'Updated!',
                        'Your file has been updated.',
                        'success'
                    )
                    editTask(id, result.value);
                    renderTasks();
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire(
                        'Cancelled',
                        'Your file is safe :)',
                        'error'
                    )
                }
            })
        }
    });

    // Task is done
    function taskIsDone(id, isChecked) {
        let tasks = getAllTasks();
        tasks = tasks.map((task) => {
            if (task.id == id) {
                return {...task, isChecked};
            }
            return task;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Task is checked -> Event handler
    tasks_container.addEventListener('change', (e) => {
        let target = e.target;
        if (target.type == 'checkbox') {
            let task = target.parentElement.parentElement.parentElement.parentElement;
            let id = task.id.substr(5);
            if (target.checked) {
                taskIsDone(id, 1);
            } else {
                taskIsDone(id, 0);
            }
            renderTasks();
        }
    });
})();
