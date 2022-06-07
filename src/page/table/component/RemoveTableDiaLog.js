import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { toast, Slide as slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RemoveTableDialog({
  showRemoveTableDialog, setShowRemoveTableDialog, action,
  title, content
}) {
  
  const agreeBtnClick = () => {
    action()
    toast.error('ลบตารางเรียบร้อยแล้ว', {
      position: "top-center",
      transition: slide,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored'
      });
    setShowRemoveTableDialog(false)
  }

  return (    
      <Dialog
        open={showRemoveTableDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>setShowRemoveTableDialog(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setShowRemoveTableDialog(false)}
            >ยกเลิก</Button>
          <Button onClick={agreeBtnClick}
            style={{color: 'red'}}
            >ยืนยัน</Button>
        </DialogActions>
      </Dialog>
  );
}
