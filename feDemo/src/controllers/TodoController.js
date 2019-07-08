import Controller from "../libs/Controller.js";
import Request from '../libs/Request.js';

class TodoController extends Controller {

  clickTodo(id) {
    this.model.update(data => ({
      ...data,
      activeTodoId: id,
      editing: false
    }))
  }

  addTodo() {
    const cntTime = new Date().getTime()
    this.model.update(data => ({
      ...data,
      maxTodoId: data.maxTodoId + 1,
      activeTodoId: data.maxTodoId + 1,
      editing: true,
      todos: [
        ...data.todos, 
        { 
          id: data.maxTodoId + 1, 
          createTime: cntTime, 
          noticeTime: cntTime, 
          title: '请输入标题', 
          content: '请输入内容' 
        }
      ]
    }))
  }

  editTodo() {
    this.model.update(data => ({
      ...data,
      editing: true
    }))
  }

  saveTodo() {
    const currentData = this.model.data
    const saveTodoIndex = currentData.todos.findIndex(v => v.id == currentData.activeTodoId)
    if (saveTodoIndex >= 0 && currentData.todos[saveTodoIndex]) {
      let response = Request.post('/todo/edit/{'+currentData.activeTodoId+'}', {
            body:JSON.stringify({
              title: document.getElementById("EditTitle").value,
              noticeTime: new Date(document.getElementById("EditNoticeTime").value).getTime(),
              creatTime: currentData.todos[saveTodoIndex].createTime,
              content: document.getElementById("EditContent").value})
          })
      if(response.code === 0){
        this.model.update(data => ({
          ...data,
          editing: false,
          todos: data.todos.map((v, i) => i != saveTodoIndex ? v : ({
            ...v,
            title: document.getElementById("EditTitle").value,
            noticeTime: new Date(document.getElementById("EditNoticeTime").value).getTime(),
            content: document.getElementById("EditContent").value
          }))
        }))
      }else {
        alert('保存失败');
      }
    }
  }

    async  fetchTodoList() {
    let userData = await Request.get('/todo/list').data;
    this.model.update(data=>({
      ...data,
      todos : [...userData.todos],
      maxTodoId : userData.todos.length()
    }))
  }
}
export default TodoController