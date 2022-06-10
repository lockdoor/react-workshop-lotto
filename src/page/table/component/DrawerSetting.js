import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import Stack from '@mui/material/Stack'
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import Switch from '@mui/material/Switch'
import { ToastContainer, toast, Slide } from 'react-toastify'
import { setTableStatus, setTableEmoji, setTablePrice, 
  setTableName, setTableDate, setTableDesc } from '../../../redux/reducer';
import { useDispatch } from 'react-redux';
import Picker from 'emoji-picker-react'
import '../Table.css'
import ModalChangeText from '../../../component/ModalChangeText'

const toastProp = {
  position: "top-center",
  transition: Slide,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored'
}

export default function DrowerSetting({ open, close, table }) {
  const [tableStatusSwitch, setTableStatusSwitch] = React.useState(false)
  // const [chosenEmoji, setChosenEmoji] = React.useState(null)
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false)
  const [price, setPrice] = React.useState(0)
  const [name, setName] = React.useState('')
  const [date, setDate] = React.useState('')
  const [desc, setDesc] = React.useState('')
  const [showModalChangeText, setShowModalChangeText] = React.useState(false)
  const dispatch = useDispatch()
  
  
  
  const switchTableStatus = (e) => {
    // ต้องทำการจ่ายแล้วทุกคนถึงจะปิดตารางได้
    const checkAllPaid = () => {
      return !table.numbers.some((num) => num.reserve !== false && num.paid === false)
    }
    if (checkAllPaid()) {
      setTableStatusSwitch(e.target.checked)
      dispatch(setTableStatus({ tableId: table.id, status: e.target.checked }))
    } else {
      toast.error(`ไม่สามารถปิดตารางได้ ยังมีลูกค้าจ่ายเงินไม่ครบ`, {
        ...toastProp
      })
      return
    }
    // console.log(checkAllPaid())
    // console.log(e.target.checked)   
  }

  const onEmojiClick = (event, emojiObject) => {
    // setChosenEmoji(emojiObject)    
    dispatch(setTableEmoji({tableId: table.id, emoji: emojiObject.emoji}))
    setShowEmojiPicker(false)
    toast.success(`เปลี่ยนอิโมจิสำเร็จแล้ว`, {
      ...toastProp
    })
    // console.log(emojiObject)
  }

  const inputTableNameChangeHandle = (e) => {
    setName(e.target.value)
  }
  const inputTableNameBlurHandle = (e) => {
    // setPrice(e.target.value)    
    if(table.name === name.trim()){
      console.log('ไม่อัพเดต')      
    }else{
      console.log('อัพเดต')
      dispatch(setTableName({tableId: table.id, tableName: name.trim()}))
      toast.success(`ตั้งค่าชื่อตารางสำเร็จแล้ว`, {
        ...toastProp
      })
    }
  }

  const inputTablePriceChangeHandle = (e) => {
    setPrice(e.target.value)
  }
  const inputTablePriceBlurHandle = (e) => {
    // setPrice(e.target.value)    
    if(table.price === price){
      console.log('ไม่อัพเดต')      
    }else{
      console.log('อัพเดต')
      dispatch(setTablePrice({tableId: table.id, price: price}))
      toast.success(`ตั้งค่าราคาสำเร็จแล้ว`, {
        ...toastProp
      })
    }
  }

  const inputTableDateChangeHandle = (e) => {
    setDate(e.target.value)
  }
  const inputTableDateBlurHandle = (e) => {
    // setPrice(e.target.value)    
    if(table.date === date){
      console.log('ไม่อัพเดต')      
    }else{
      console.log('อัพเดต')
      dispatch(setTableDate({tableId: table.id, tableDate: date}))
      toast.success(`ตั้งค่าวันที่สำเร็จแล้ว`, {
        ...toastProp
      })
    }
  }

  

  React.useEffect(() => {
    setTableStatusSwitch(table.settings.tableOn)
    setPrice(table.price)
    setName(table.name)
    setDate(table.date)
    setDesc(table.desc)
  }, [table])

  const list = () => (
    <Box
      sx={{ width: 350 }}
      role="presentation"
    // onClick={toggleDrawer(anchor, false)}
    // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem >
          <ListItemText>ชื่อตาราง</ListItemText>
          <input type="text" 
            value={name} 
            onBlur={inputTableNameBlurHandle}
            onChange={inputTableNameChangeHandle}
            className="table-drawer-input-price"
            style={{
              border: 'none',
              textAlign: 'end'
            }}
          />
        </ListItem>
        
        <ListItem>
          <ListItemText>เปิดใช้งาน</ListItemText>
          <Switch checked={tableStatusSwitch} onChange={switchTableStatus} />
        </ListItem>
        <ListItem style={{cursor: 'pointer'}}
          onClick={()=>setShowEmojiPicker(!showEmojiPicker)}
        >
          <ListItemText>เลือกอิโมจิ</ListItemText>
          <ListItemText
            style={{ textAlign: 'end', paddingRight: 15 }}
          >
            {table.settings.emoji}</ListItemText>
        </ListItem>
        {showEmojiPicker && <ListItem><Picker onEmojiClick={onEmojiClick} /></ListItem>}
        <ListItem >
          <ListItemText>ตั้งค่าราคา</ListItemText>
          <input type="number" 
            value={price} 
            onBlur={inputTablePriceBlurHandle}
            onChange={inputTablePriceChangeHandle}
            className="table-drawer-input-price"
            style={{
              border: 'none',
              textAlign: 'end'
            }}
          />
        </ListItem>
        <ListItem >
          <ListItemText>ตั้งค่าวันที่</ListItemText>
          <input type="date" 
            value={date} 
            onBlur={inputTableDateBlurHandle}
            onChange={inputTableDateChangeHandle}
            className="table-drawer-input-price"
            style={{
              border: 'none',
              textAlign: 'end'
            }}
          />
        </ListItem>
          
        <ListItem>
          <ListItemText>รายละเอียด</ListItemText>
          <Button onClick={()=>{setShowModalChangeText(true)}}>ตั้งค่า</Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>

      {/* <Button onClick={()=>setState(!state)}>LEFT</Button> */}
      <Drawer

        open={open}
        onClose={close}
      >
        {list()}
      </Drawer>
      <ToastContainer />
      <ModalChangeText 
        onOpen={showModalChangeText} 
        onClose={()=>{setShowModalChangeText(false)}}
        header={"ตั้งค่ารายละเอียด"}
        content={desc}
        onSave={(text)=>dispatch(setTableDesc({tableId: table.id, tableDesc: text}))}
      />

    </div>
  );
}
