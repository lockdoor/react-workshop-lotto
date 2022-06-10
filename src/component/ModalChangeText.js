import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalChangeText({
  onOpen, onClose, header, content, onSave
}) {
  const [text, setText] = React.useState('')
  React.useEffect(()=>{setText(content)},[content])
  // console.log(content)


  return (
    <div>      
      <Dialog
        open={onOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <DialogTitle>{header}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
            {content}
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            // label="Email Address"
            type="text"
            fullWidth
            variant="standard"
            multiline
            value={text}
            onChange={(e)=>setText(e.target.value)}
          />
        </DialogContent>
        
        <DialogActions>
          <Button onClick={onClose}>ยกเลิก</Button>
          <Button onClick={()=>{onSave(text);onClose()}}>บันทึก</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
