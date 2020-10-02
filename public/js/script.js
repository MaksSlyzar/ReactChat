

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            username: "MaksSlyzar",
            password: "123123"
        };
    }

    changeIsLoggedIn = (is) => {
        this.setState({ isLoggedIn: is });
    }
    changeProfile = (username, password) => {
        if (username)
            this.setState({ username: username });
        if (password)
            this.setState({ password: password })
    }

    render() {
        if (!this.state.isLoggedIn){ // !
            return (
                <div>
                    <LoginControl changeProfile={this.changeProfile} changeIsLoggedIn={this.changeIsLoggedIn} />
                </div>
            )
        }else{
            const styles = {
                wrapper: {
                    position: "relative"
                }
            }
            return (
                <div>
                    <div style={styles.wrapper}>
                        <UserPanel username={this.state.username} />
                        <ViewMessages />
                        <MessageInput />
                    </div>
                </div>
            )
        }
    }
}

ReactDOM.render(
    (
        <App />
    ),
    document.getElementById("root")
)