import React, { useEffect } from 'react';
import { Backdrop, Box, Button, Fade, Modal, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import DeleteIcon from '@mui/icons-material/Delete';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    '@media (max-width: 600px)': {
        width: '80vw'
    }
};

const ExpenseModal = ({ openMOdal, setOpenModal }) => {

    useEffect(() => {
        if (isOpen == 'false') {
            setIsOpen(true)
        }
    }, [])

    const [expensesDate, setExpensesDate] = useState(null)
    const [isOpen, setIsOpen] = useState(true);
    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState([{ desc: "", samount: "" }])



    const handleClose = () => { }
    const handleAddInputs = () => {
        setInputs([...inputs, { desc: "", samount: "" }])
    }


    const handleChange = (e, i) => {
        const { name, value } = e.target;
        const onChangevalue = [...inputs]
        onChangevalue[i][name] = value
        setInputs(onChangevalue);
    }

    const handleDelete = (i) => {
        const deleteSelectedInput = [...inputs]
        deleteSelectedInput.splice(i, 1)
        setInputs(deleteSelectedInput)
    }


    const addExpenses = () => {
        console.log("inputs", inputs);
        console.log("expensesDate", expensesDate);
        const inputDate = new Date(expensesDate)
        const formattedDate = inputDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
        let params = {
            income_amount: inputs.samount,
            income_desc: inputs.desc,
            income_date: formattedDate
        }

        console.log("params", params);
        axios.post("http://localhost:3001/add-expense", { params }, { withCredentials: true })
            .then((response) => {
                setOpenModal(false);
                setLoading(false)
            })
            .catch(error => {
                console.log("Error response", error);
            });
    }

    return (
        <div>
            <Toaster />
            {isOpen && (
                <>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openMOdal}
                        onClose={handleClose}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                        }}
                    >
                        <Fade in={openMOdal}>
                            <Box sx={style}>
                                <>
                                    <Typography sx={{ marginBottom: 3 }} variant="h5" component="h2">
                                        Add Your Expense 💯
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 10 }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                fullWidth
                                                sx={{ marginBottom: 3 }}
                                                label="Select Date"
                                                value={expensesDate}
                                                onChange={(newValue) => setExpensesDate(newValue)}
                                                renderInput={(props) => <TextField {...props} />}
                                            />
                                        </LocalizationProvider>

                                        <Button onClick={handleAddInputs} variant='contained' sx={{ width: 50, height: 50 }} >Add</Button>
                                    </Box>

                                    {inputs.map((val, index) =>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, marginTop: 3, marginBottom: 3 }}>
                                            <TextField fullWidth name="desc" label="desc" value={val.desc} onChange={(e) => handleChange(e, index)} />
                                            <TextField type="number" label="Amount" name="samount" value={val.samount} onChange={(e) => handleChange(e, index)} />
                                            <Button onClick={() => handleDelete(index)} variant='contained'>{<DeleteIcon />}</Button>
                                        </Box>
                                    )}

                                    <Button
                                        type='submit'
                                        variant={loading ? 'outlined' : 'contained'}
                                        disabled={loading}
                                        onClick={addExpenses}
                                    >
                                        {loading ? 'Submit' : 'Add Expenses'}
                                    </Button>
                                </>
                            </Box>
                        </Fade>
                    </Modal>
                </>
            )}

        </div>
    )
}

export default ExpenseModal