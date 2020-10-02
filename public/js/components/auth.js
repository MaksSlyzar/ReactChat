class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', confirm_password: '', messages: [

        ]};
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event){
        const errors = [];
        if (this.state.password != this.state.confirm_password){
            errors.push("Пароли не совпадают.");
        }
        if (this.state.username.length < 6){
            errors.push("Длина логина должна состаять из не менее 6 символов.");
        }
        if (this.state.password.length < 6){
            errors.push("Слишком маленький пароль, пароль должен состаять из не менее 6 символов");
        }

        if (errors.length == 0){
            const data = {
                username: this.state.username,
                password: this.state.password
            };
            socket.emit("registerUser", data);
            socket.on("registerMessage", (data) => {
                console.log(data);
                let messages = [data];
                
                this.setState({ messages: messages});
            });
        }else{
            let messages = [{ message: [errors[0]], type: "danger" }];

            this.setState({ messages: messages });
            console.log(errors);
        }
        
        
        event.preventDefault();
    }
    
    onChangePassword(event){
        this.setState({password: event.target.value});
    }
    onChangeConfirmPassword(event){
        this.setState({confirm_password: event.target.value});
    }
    onChangeUsername(event) {
        this.setState({username: event.target.value});
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <label>Username</label>
                    <input value={this.state.username} onChange={this.onChangeUsername} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input value={this.state.password} onChange={this.onChangePassword} type="password" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Confirm password</label>
                    <input value={this.state.confirm_password} onChange={this.onChangeConfirmPassword} type="password" className="form-control" />
                </div>
                <button onClick={this.onSubmit} type="button" className="btn btn-primary">Submit</button>

                <br></br>
                <div id="messages">
                    { this.state.messages.map((element, index) => {
                        let messageClass = "alert alert-" + element.type;
                        return (
                            <div key={index} className={messageClass} role="alert">
                                {element.message}
                            </div>
                        )
                    }) }
                    
                </div>
                
            </form>
        )
    }
}


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', confirm_password: ''};
  
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event){
        const data = {
            username: this.state.username, 
            password: this.state.password
        }
        socket.emit("login", data);
        socket.on("successLogin", () => {
            this.props.changeIsLoggedIn(true);
            localStorage.setItem("username", data.username);
            localStorage.setItem("password", data.password);
            this.props.changeProfile(data.username, data.password);
        })
        
        event.preventDefault();
    }
    
    onChangePassword(event){
        this.setState({password: event.target.value});
    }
  
    onChangeUsername(event) {
        this.setState({username: event.target.value});
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <label>Username</label>
                    <input value={this.state.username} onChange={this.onChangeUsername} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input value={this.state.password} onChange={this.onChangePassword} type="password" className="form-control" />
                </div>
                <button type="button" onClick={this.onSubmit} className="btn btn-primary">Submit</button>
            </form>
        )
    }
}

function ViewRegistrationAndLogin(props) {
    if (props.isLogginActive){
        return <Login changeProfile={props.changeProfile} changeIsLoggedIn={props.changeIsLoggedIn} />;
    }else{
        return <Registration />;
    }
}

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogginActive: false
        };

        this.SetIsLoggin = this.SetIsLoggin.bind(this);
        this.SetIsRegistation = this.SetIsRegistation.bind(this);
    }

    

    SetIsLoggin(event) {
        this.setState({isLogginActive: true});
    }
    SetIsRegistation(event) {
        this.setState({isLogginActive: false});
    }
    

    render() {
        let button;
        if (!this.state.isLogginActive){
            button = <button onClick={this.SetIsLoggin} className="btn">Login</button>;
        }else{
            button = <button onClick={this.SetIsRegistation} className="btn">Registration</button>;
        }
        
        return (
            <div>
                <ViewRegistrationAndLogin changeProfile={this.props.changeProfile} changeIsLoggedIn={this.props.changeIsLoggedIn} isLogginActive={this.state.isLogginActive} />
                <br/>
                {button}
            </div>
        )
    }
}