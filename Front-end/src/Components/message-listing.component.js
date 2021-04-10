import { MdEmail } from 'react-icons/md'
import MessageDialogue from "./message-dialogue.component"
import SendMessageDialogue from "./send-message-dialogue.component"
import { useState, useEffect } from "react";
import axios from "axios";
require('dotenv').config()
const uri = process.env.REACT_APP_BACK_END_SERVER_URI

const MessageListing = ({ listOfUsernames, message}) => {

	const [subject, setSubject] = useState("");
	const [sender, setSender] = useState("");
	const [senderID, setSenderID] = useState("");
	const [body, setBody] = useState("");
	const [recipient, setRecipient] = useState("");
	const [recipientID, setRecipientID] = useState("");
	const [messageID, setMessageID] = useState("");
	const [viewed, setViewed] = useState(false)
	const [alreadyViewed, setAlreadyViewed] = useState(false)
	const [viewMessage, setViewMessage] = useState(false)
	const [reply, setReply] = useState(false)

	useEffect(() => {
		
		console.log(message)
		setSubject(message.subject);
		setSender(message.sender);
		setSenderID(message.sender_id);
		setBody(message.body);
		setRecipient(message.recipient);
		setRecipientID(message.recipient_id);
		setMessageID(message._id);
		if (message.viewed == true) {
			setViewed(message.viewed);
			setAlreadyViewed(true)
        }
		
		
	}, []);

	useEffect(() => {
		if (alreadyViewed == false) {
			if (viewed == true) {
				console.log("setting message to true")
				axios.post(uri + "/message/updateViewed/" + messageID)

            }
				
        }


	}, [viewed]);
	useEffect(() => {
		console.log("viewMessage is now :" + viewMessage)


	}, [viewMessage]);
	const replyToMessage = () => {
		setReply(true);
	}
	
	return (
		<div>
			<div className={"message-listing"} onClick={() => { setViewMessage(true); setViewed(true); }} >
			{viewed ? <h3 className={"non-viewed-email"}><MdEmail className={"icon"} style={{ color: 'black', }} /> {" "}
					{"From: "}{sender}{" "}
					{"Subject: "}{subject}

			</h3> : <h3 className={"viewed-email"}><MdEmail className={"icon"} style={{ color: 'grey', }} /> {" "}
						{"From: "}{sender}{"  "}
						{"Subject: "}{subject}

					</h3>}
			</div>
			<MessageDialogue
				subject={subject}
				body={body}
				sender={sender}
				open={viewMessage}
				setOpen={setViewMessage}
				onReply={replyToMessage}
			></MessageDialogue>
			<SendMessageDialogue
				open={reply}
				setOpen={setReply}
				listOfUsernames={listOfUsernames}
				title="send a message"
				recipient={sender}
				recipientID={senderID}
				senderID={recipientID}
				subject={subject}
				sender={recipient}>
			</SendMessageDialogue>

		</div>

	)
}

export default MessageListing