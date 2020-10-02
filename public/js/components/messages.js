class ViewMessages extends React.Component{
    constructor (props){
        super(props);
        this.state = {
            messages: []
        }

        socket.on("takeMessage", (data) => {
            this.addMessage(data.username, data.text)
        });
    }

    addMessage = (author, text) => {
        const messages = this.state.messages;

        messages.push({
            author: author,
            text: text
        });

        this.setState({ messages: messages });
    }

    render (){

        
        const styles = {
            ViewMessagesBlock: {
                position: "absolute",
                width: "100%",
                height: "calc(100vh - 83px)",
                overflow: "auto"
            }
        }
        return (
            <div style={styles.ViewMessagesBlock}>
                {this.state.messages.map( (message, index) => {
                    return <Message key={index} text={message.text} author={message.author} />
                })}
            </div>
        )
    }
}

class Message extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            author: props.author,
            text: props.text,
            index: props.index
        };
    }

    render() {
        const styles = {
            message: {
                border: "1px rgb(210, 208, 211) solid",
                background: "rgb(250, 250, 250)",
                minHeight: "30px",
                fontSize: "20px",
                marginBottom: "5px",
                borderRadius: "2%"
            },
            author: {
                fontSize: "15px",
                color: "rgb(105, 105, 104)"
            }
        };

        return (
            <div style={styles.message}>
                <div style={styles.author}>{this.state.author}</div>
                <div>{this.state.text}</div>
            </div>
        )
    }
}