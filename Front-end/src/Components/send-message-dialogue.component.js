// JavaScript source code
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import { useState, useEffect } from "react";
import axios from "axios";
require('dotenv').config()
const uri = process.env.REACT_APP_BACK_END_SERVER_URI

const SendMessageDialogue = ({ title, subject, listOfUsernames, sender, recipient, recipientID, senderID, open, setOpen }) => {

    const [messageSubject, setMessageSubject] = useState("")
    const [messageBody, setMessageBody] = useState("")
    const [messageRecipient, setMessageRecipient] = useState("");
    
    useEffect(() => {
        if (subject != undefined) {
            console.log(subject)
            setMessageSubject("Re: "+ subject);
        }
        if (recipient != "" && recipientID != "") {
            setMessageRecipient(recipient);
        }
    }, [recipient]);

    const handleUserNameChange = (event) => {
        setMessageRecipient(event.target.value);
    };

    const handleBodyChange = (event) => {
        setMessageBody(event.target.value);
    }
    
    const handleSubjectChange = (event) => {
        setMessageSubject(event.target.value);
    }

    const sendMessage = () => {
        if (messageBody == "") {
            alert("Please put something in the body!");
            return;
        }
        if (messageSubject == "") {
            alert("Please set a subject title!");
            return;
        }
        if (messageRecipient == "") {
            alert("Please specify a recipient!");
            return;
        }
        if (sender == "" || senderID =="") {
            alert("You must be logged in to send messages!")
            return;
        }
        axios.get(uri + "/user/getIdByUsername/" + messageRecipient)
            .then(response => {
                if (response.data != null) {
                    const message = { subject: messageSubject, body: messageBody, recipient: messageRecipient, recipient_id: response.data, sender: sender, sender_id: senderID, viewed: false };
                    axios.post(uri + "/message/add", message)
                    alert("Message sent!")
                    setOpen(false)

                }
                else {
                    alert("id don't exist!");
                }
            })
            .catch(err =>
            {
                console.log(err);
                axios.get(uri + "/manager/getIdByUsername/" + messageRecipient)
                    .then(response => {
                        if (response.data != null) {
                            const message = { subject: messageSubject, body: messageBody, recipient: messageRecipient, recipient_id: response.data, sender: sender, sender_id: senderID, viewed: false };
                            axios.post(uri + "/message/add", message)
                            alert("Message sent!")
                            setOpen(false)
                        }
                        else {
                            alert("id don't exist!")
                        }
                    })
                    .catch()
            })
        
        
    }
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="confirm-dialog"
        >
            <DialogTitle id="confirm-dialog">{title}</DialogTitle>
            <DialogContent>
                <Select
                    labelId="usernames-label"
                    id="multiple-usernames"
                    value={messageRecipient}
                    onChange={handleUserNameChange}
                    input={<Input />}
                    
                >
                    {listOfUsernames.map((username) => (
                        <MenuItem key={username} value={username} >
                            {username}
                        </MenuItem>
                    ))}
                </Select>
                <TextField
                    autoFocus
                    margin="dense"
                    id="standard-helperText"
                    label="Subject"
                    defaultValue=""
                    value={messageSubject}
                    onChange={handleSubjectChange}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="standard-helperText"
                    label="Body"
                    defaultValue=""
                    value={messageBody}
                    onChange={handleBodyChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={() => setOpen(false)}
                    color="secondary"
                >
                    cancel
        </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        sendMessage();
                    }}
                    color="default"
                >
                    send
        </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SendMessageDialogue// JavaScript source code