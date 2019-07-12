import Controller from "../libs/Controller.js";
import Request from '../libs/Request.js';
import { todoController } from "../index.js";

class UserController extends Controller {
  switchMode() {
    this.model.update(data => ({
      ...data,
      isRegister: !data.isRegister
    }))
  }
  async register() {
    console.log(todoController.fetchTodoList);
    const form = document.getElementById('loginForm');
    const formInputs = [...form.getElementsByTagName('input')];
    let formData = {};
    formInputs.forEach((input) => {
      const name = input.getAttribute('name');
      formData[name] = input.value
    });
    if(!this.isEmail(formData.email)){
      alert('无效邮箱。');
      return
    }
    if (formData['password'] !== formData['repassword']) {
      alert('两次输入密码不一致！');
      return
    }
    const response = await Request.post('/user/account', {
      body: JSON.stringify({
        email: formData.email,
        logoUrl:'/user/account',
        name:formData.email,
        password: formData.password
      }),
    });
    // 注册成功的判定由前后端商议
    if (response.code === 0) {
       console.log('register success');
       alert('注册成功');
       // 提示注册成功并且跳转到登录，也可以做成注册后自动登录
       this.switchMode();
      }else {
        alert('注册失败')
      }
  }
  async login() {
    // 获取界面表达数据，请求接口，如果登录成功则关闭弹窗并进入系统
    // 进入系统后，需要向后端获取todolist并修改model
    // 需要调用todoController.fetchTodoList
    const form = document.getElementById('loginForm');
    const formInputs = [...form.getElementsByTagName('input')];
    let formData = {};
    formInputs.forEach((input) => {
      const name = input.getAttribute('name');
      formData[name] = input.value
    });
    if(!this.isEmail(formData.email)){
      alert('无效邮箱。');
      return
    }
    let response = await Request.post('/session/create', {
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      }),
    });

    if(response.code===0){
      console.log('logoin success');
      let name = response.data.name;
      alert('登录成功，欢迎'+name+'!');
      document.getElementById("LoginModal").style.display = "none";
      todoController.fetchTodoList();
      this.getUserinfo();
    }else {
      alert('登录失败')
    }
  }

  logoOut(){
    let response = Request.post('/session/destroy');
    if(response.code===0){
      this.model.setUserInfo({});
      this.model.update(data=>{});
      alert('Goodbye.')
    }
  }
  getUserinfo(){
    let response = Request.get('/session/info');
    this.model.setUserInfo({...response})
  }

  isEmail(email) {
    let n = /^[a-z0-9]+@[a-z0-9]+(\.[a-z0-9]+)*[a-z]+$/i;
    return n.test(email);
  }
}


export default UserController