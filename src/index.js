import './scss/index.scss';

import initForm from "./js/initForm.js";
import todoList from "./js/todoList.js";
import * as restService from "./js/restService.js";

const init = () => {
    initForm();
    restService.getAllTodo().then((res) => todoList.renderTodoItems(res));
}

init();
