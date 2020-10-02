class MessageInput extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            textMessage: ""
        }

        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onClickButtonSend = this.onClickButtonSend.bind(this);
    }

    onChangeMessage(event){
        this.setState({textMessage: event.target.value});
    }
    onClickButtonSend(event) {
        const data = {
            username: localStorage.getItem("username"),
            text: this.state.textMessage
        }
        socket.emit("sendMessage", data);
    }
    
    render (){
        const styles = {
            div_input: {
                position: "absolute",
                top: "calc(100vh - 40px)",
                width: "100%",
                display: "flex"
            },
            SendButton: {
                width: "100px",
                height: "100%",
                border: "2px rgb(20, 20, 20) solid"
            }
        }
        return (
            <div style={styles.div_input}>
                <div style={{width: "100%"}} >
                    <input className="form-control" type="text" placeholder="Message" onChange={this.onChangeMessage} />
                </div>
                <div>
                    <button style={styles.SendButton} onClick={this.onClickButtonSend} >Send</button>
                </div>
            </div>
        )
    }
}