import { getDataFromApi, addTaskToApi, deleteTaskFromApi } from './utils/api';
import { changeButtonDisable } from './utils/button';
class PomodoroApp {
  constructor(options) {
    let { tableTbodySelector, taskFormSelector, addTaskButton } = options;
    this.$tableTbody = document.querySelector(tableTbodySelector);
    this.$taskForm = document.querySelector(taskFormSelector);
    this.$taskFormInput = this.$taskForm.querySelector('input');
    this.$addTaskButton = document.getElementById(addTaskButton);
  }

  addTask(task) {
    changeButtonDisable(this.$addTaskButton);
    addTaskToApi(task)
      .then((data) => data.json())
      .then((newTask) => {
        this.addTaskToTable(newTask);
        changeButtonDisable(this.$addTaskButton);
      });
  }

  deleteTaskAction(id) {
    const $btn = document.getElementById(`${id}-del`);
    $btn.addEventListener('click', () => {
      deleteTaskFromApi(id).then((res) => {
        if (res.status === 200) {
          document.querySelector(`tr[id="${id}"]`).remove();
        } else {
          alert('Process failed');
        }
      });
    });
  }

  addTaskToTable(task, index) {
    const $newTaskEl = document.createElement('tr');
    $newTaskEl.setAttribute('id', task.id);
    $newTaskEl.innerHTML = `<th scope="row">${task.id}</th>
      <td>${task.title}</td>
      <td><button class="btn btn-danger mb-3" id="${task.id}-del"><i class="bi bi-trash"></i></button></td>`;
    this.$tableTbody.appendChild($newTaskEl);
    this.deleteTaskAction(task.id);
    this.$taskFormInput.value = '';
  }

  handleAddTask() {
    this.$taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const task = { title: this.$taskFormInput.value };
      // bos task ekleme durumu fix
      if (task.title) {
        this.addTask(task);
      } else {
        alert('Task title cannot be empty');
      }
    });
  }

  fillTasksTable() {
    getDataFromApi().then((currentTasks) => {
      currentTasks.forEach((task, index) => {
        this.addTaskToTable(task, index + 1);
      });
    });
  }

  init() {
    this.fillTasksTable();
    this.handleAddTask();
  }
}

export default PomodoroApp;
