import { MdEmail } from 'react-icons/md'
import MessageDialogue from "./message-dialogue.component"
import SendMessageDialogue from "./send-message-dialogue.component"
import DeleteDialogue from "./deleteDialogue.component"
import { BsX} from "react-icons/bs"
import { useState, useEffect } from "react";
import axios from "axios";
import Button from '@material-ui/core/Button';

require('dotenv').config()
const uri = process.env.REACT_APP_BACK_END_SERVER_URI

const MessageListing = ({ listOfUsernames, message, onDeleteMessage}) => {

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
	const [safty, setSafty] = useState(false)
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
	useEffect(() => {
		if (safty == true) {
			if (viewMessage == true) {
				setViewMessage(false)
            }
        }
	}, [viewMessage])

	const deleteMessage = () => {
		onDeleteMessage(message);
    }

	return (
		<div>
			<div className={"message-listing"}>
				{viewed ? <h2 className={"viewed-email"} onClick={() => { setViewMessage(true) }}><BsX className={"icon"} style={{ color: 'red', }} onClick={() => { setSafty(true); }} /><MdEmail className={"icon"} style={{ color: 'grey', }} /> {" "}
						{"From: "}{sender}{"  "}
						{"Subject: "}{subject}
					
					</h2>

					: <h2 className={"non-viewed-email"} onClick={() => { setViewMessage(true); setViewed(true); }}><MdEmail className={"icon"} style={{ color: 'black', }} /> {" "}
				{"From: "}{sender}{" "}
						{"Subject: "}{subject}</h2> }
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
			<DeleteDialogue
				title="Delete Message?"
				open={safty}
				setOpen={setSafty}
				onConfirm={deleteMessage}
			> Are you sure you want to delete this message?</DeleteDialogue>
		</div>

	)
}

export default MessageListing