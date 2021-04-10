// JavaScript source code
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const MessageDialogue = ({ subject, body, sender, open, setOpen, onReply }) => {


    const closeMessage = () => {
        setOpen(false);
    }

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="confirm-dialog"
        >
            <DialogTitle id="confirm-dialog">{subject} From : {sender}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {body}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={() => { console.log("closing messsage"); closeMessage() }}
                    color="secondary"
                >
                    close
        </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        setOpen(false);
                        onReply();
                    }}
                    color="default"
                >
                    reply
        </Button>
            </DialogActions>
        </Dialog>
    );
}

export default MessageDialogue// JavaScript source code