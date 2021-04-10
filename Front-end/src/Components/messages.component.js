import { useState, useEffect } from "react";
import MessageListing from "./message-listing.component"
import Button from '@material-ui/core/Button';
import SendMessageDialogue from "./send-message-dialogue.component";
import axios from "axios";
require('dotenv').config()
const uri = process.env.REACT_APP_BACK_END_SERVER_URI

const Messages = ({ user, manager, props}) => {
    const [messages, setMessages] = useState([]);
    const [haveMessages, setHaveMessages] = useState(true);
    const [listOfUsernames, setListOfUsernames] = useState([])
    const [sendMessage, setSendMessage] = useState(false)
    useEffect(() => {

        if (manager._id == "" && user._id == "") {
            props.history.push("/");
            return;
        }


        let id =   user._id + manager._id 
        console.log(id)
        axios.get(uri + "/user/getAllUsernames")
            .then(userResponse => {
                axios.get(uri + "/manager/getAllUsernames")
                    .then(managerResponse => {
                        console.log(userResponse.data)

                        setListOfUsernames([...userResponse.data, ...managerResponse.data])
                    })
                    .catch(err => console.log(err))

            })
            .catch(err => console.log(err))
        axios.get(uri + "/message/allMessagesForId/" + id)
            .then(messageResponse => {
                if (messageResponse != null) {

                    console.log(messageResponse.data)
                    setMessages([...messageResponse.data])


                }
                else {
                    setHaveMessages(false)
                }
            })
            .catch(err => { return "" })

    }, [user, manager])

    return (
        <div className={"login-background"}>

            <div className={"margin-50-booking"}>
                <header className={"bold-center"}>
                    Current Messages for {user._id != "" ? user.username : manager.username}
                    <Button variant="contained" color="primary" size="medium" onClick={() => setSendMessage(true) }> Send Message </Button>
                </header>
            </div>
            {haveMessages ? <div className='message-listing-container'>
                <ul style={{ listStyleType: "none" }}>
                    {messages.map((message, index) => <MessageListing key={index} listOfUsernames={listOfUsernames} message={message} />)}
                </ul>
                </div> :
                <div >
                    <p> You have no messages at the moment. </p>
                </div>}
            <SendMessageDialogue
                open={sendMessage}
                setOpen={setSendMessage}
                listOfUsernames={listOfUsernames}
                title="send a message"
                senderID={user._id + manager._id}
                sender={user.username + manager.username}>
            </SendMessageDialogue>
        </div>
    )
}

export default Messages