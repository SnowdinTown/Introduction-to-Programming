import Model from './libs/Model.js'

import TodoList from './components/TodoList.js';
import TodoDetail from './components/TodoDetail.js';
import LoginModal from './components/LoginModal.js';
import UserCenter from './components/UserCenter.js';

import TodoController from './controllers/TodoController.js';
import UserController from './controllers/UserController.js';

const model = new Model()

const todoController = new TodoController('TodoController', model)
const userController = new UserController('UserController', model)

const todoList = new TodoList(document.querySelector('#TodoList'), model)
const todoDetail = new TodoDetail(document.querySelector('#TodoDetail'), model)
const loginModal = new LoginModal(document.querySelector('#LoginModal'), model)
const usserCenter = new UserCenter(document.querySelector('#UserCenter'),model)

export {
  todoController,
  userController
}