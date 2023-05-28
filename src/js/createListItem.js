import * as restService from "./restService.js";
import * as loader from './loader.js';
import * as dialog from './dialog.js';

const listNew = document.querySelector('#todoListNew');
const listCompleted = document.querySelector('#todoListCompleted');

const createListItem = (todo) => {
    const listItem = document.createElement('li');

    listItem.classList.add('todo-list__item');
    listItem.setAttribute('id', todo.id);
    listItem.innerHTML = `
        <div class="todo-list__item-container tooltip">
            <input type="checkbox" ${todo.completed ? 'checked' : ''} class="todo-list__item-checkbox js-todo-checkbox">
            <label for="input-checkbox" class="todo-list__text tooltip js-title">
                ${todo.title}
            </label>
        </div>
        <div class="todo-list__button">
            <button class="todo-list__edit-button js-edit-button">
                <span class="todo-list__symbol-edit">
                    <i class="bi bi-pencil-fill"></i>
                </span>
            </button>
            <button class="todo-list__delete-button js-delete-button">
                <span class="todo-list__symbol-delete">
                    <i style="font-size: 1.25rem" class="bi bi-x"></i>
                </span>
            </button>
        </div>
    `;

    if (todo.completed) {
        listCompleted.appendChild(listItem);
    } else {
        listNew.appendChild(listItem);
    }

    addListeners(listItem, todo);
};

const updateTodoList = (todo, list, listItem) => {
    restService.updateTodo(todo)
        .then(() => {
            listItem.remove();
            list.appendChild(listItem);
            loader.removeLoader();
        });
}

const addListeners = (listItem, todo) => {
    const checkbox = listItem.querySelector('.js-todo-checkbox');
    const deleteButton = listItem.querySelector('.js-delete-button');
    const title = listItem.querySelector('.js-title');
    const editButton = listItem.querySelector('.js-edit-button');

    checkbox.addEventListener('change', (event) => {
        loader.addLoader();
        todo.completed = event.target.checked;

        const currentList = todo.completed ? listCompleted : listNew;

        updateTodoList(todo, currentList, listItem);
    });

    editButton.addEventListener('click', () => {
        dialog.createDialog(todo, title);
    });

    deleteButton.addEventListener('click', () => {
        restService.removeTodo(todo.id).then(() => listItem.remove());
    });

    title.addEventListener('click', () => {
        title.classList.toggle('todo-list__text-extended');
    })

    title.addEventListener('blur', () => {
        // if (event.target.textContent.trim()) {
        //     todo.title = event.target.textContent;
        //
        //     restService.updateTodo(todo).then(() => {
        //         tooltipText.textContent = todo.description;
        //     });
        // } else {
        //     event.target.textContent = todo.title;
        //     tooltipText.textContent = todo.description;
        // }
    });
};

export default createListItem;