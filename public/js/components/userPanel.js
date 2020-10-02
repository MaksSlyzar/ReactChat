class UserPanel extends React.Component {
    render() {
        const styles = {
            userPanel: {
                width: "100%",
                height: "45px",
                background: "rgb(220, 220, 220)"
            },
            username: {
                fontSize: "17px",
                float: "right"
            },
            name: {
                float: "left"
            }
        }
        return (
            <div style={styles.userPanel}>
                <h3 style={styles.name}>Chat</h3>
                <div style={styles.username}>{this.props.username}</div>
            </div>
        )
    }
}