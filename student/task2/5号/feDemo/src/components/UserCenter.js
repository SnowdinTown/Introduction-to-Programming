import Component from "../libs/Component.js"

class UserCenter extends Component{
    render() {
        const { userData } = this.model
        return `
            <header>UserCenter</header>
            <div id="info">
                <div id="name">Name   : ${userData.name}</div>
                <div id="email">Email  : ${userData.email}</div>
                <div id="userId">Id     : ${userData.id}</div>
                <div id="logoUrl">LogoUrl: ${userData.logoUrl}</div>
            </div>
            <footer onclick="UserController.logoOut()">LogoOut</footer>
        `
    }
}

export default UserCenter