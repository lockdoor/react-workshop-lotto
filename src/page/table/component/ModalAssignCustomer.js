import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomer, addCustomertoNumber } from "../../../redux/reducer";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const filter = createFilterOptions();

export default function ModalAssignCustomer({
  open, onClose, customers, number, tableId
}) {
  const dispatch = useDispatch()
  const [value, setValue] = useState(null)  
  const addCustomerBtnHandle = () => {
    console.log(value) 
    if(value === null){
      alert('ห้ามว่าง')
      return
    }
    else if(value.hasOwnProperty('id')){
      // console.log(value, 'มีชื่ออยู่แล้วทำการกดเลือกจากฟิล')
      dispatch(addCustomertoNumber({number: number.num, tableId: tableId, customerName: value.name}))
    }else if(value.hasOwnProperty('inputValue')){
      // console.log(value, 'ทำการสร้างชื่อใหม่โดยกดเลือกฟิล')
      dispatch(addCustomer(value.inputValue)) 
      dispatch(addCustomertoNumber({number: number.num, tableId: tableId, customerName: value.inputValue}))
    }else{
      const isExisting = customers.some(customer => customer.name === value)
      if(isExisting){
        // console.log('มีชื่ออยู่แล้ว แต่ไม่ได้กดเลือกจากฟิล')
        dispatch(addCustomertoNumber({number: number.num, tableId: tableId, customerName: value}))
      }else{
        // console.log('สร้างลูกค้าใหม่ โดยไม่ได้กดเลือกจากฟิล')
        dispatch(addCustomer(value))
        dispatch(addCustomertoNumber({number: number.num, tableId: tableId, customerName: value.value}))
      }
    }    
    setValue('')
    onClose()
  }
  // console.log(number)

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h2"
          component="h2" align="center">
          {number.num}
        </Typography>
        {
          number.customer && 
          <Typography id="modal-modal-description" align="center" sx={{ mt: 2 }}>          
            {number.customer}
          </Typography>
        }
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
              console.log('ไม่ได้เลือกจากฟิล ซึ่งอาจจะทำให้ชื่อซ้ำกันได้')
              // setValue({
              //   name: newValue,
              // });
              setValue(newValue);              
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              console.log('สร้างลูกค้าใหม่')
              // setValue({
              //   name: newValue.inputValue,
              // });
              setValue(newValue)
            } else {
              console.log('มีลูกค้าแล้ว')
              setValue(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = options.some((option) => inputValue === option.name);
            if (inputValue !== '' && !isExisting) {
              filtered.push({
                inputValue,
                name: `Add "${inputValue}"`,
              });
            }

            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          id="free-solo-with-text-demo"
          options={customers}
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === 'string') {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue;
            }
            // Regular option
            return option.name;
          }}
          renderOption={(props, option) => <li {...props}>{option.name}</li>}
          sx={{ width: '100%' }}
          freeSolo
          renderInput={(params) => (
            <TextField {...params} label="Free solo with text demo" />
          )}
        />
        <Stack style={{ marginTop: 30 }}>
          <Button variant="contained"
            onClick={addCustomerBtnHandle}
            // sx={{ }}
            size="large"
          >เพิ่มลูกค้า</Button>
        </Stack>

      </Box>
    </Modal>
  )
}