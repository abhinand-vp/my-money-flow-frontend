import React, { useEffect } from 'react';
import { Backdrop, Box, Button, Fade, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
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
    const [inputs, setInputs] = useState([{ type: "", samount: "" }])
    const [totalExpenses, setTotalExpenses] = useState(0)

    // console.log("inputssss", inputs.map((item)=>{console.log(item.samount);}));
    console.log("totalExpenses", totalExpenses);

    useEffect(() => {
        let total = 0;
        for (const input of inputs) {
            const samount = parseFloat(input.samount) || 0;
            total += samount;
        }
        setTotalExpenses(total)
    }, [inputs])

    const handleClose = () => { }
    const handleAddInputs = () => {
        setInputs([...inputs, { type: "", samount: "" }])
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
        let expenses = {
            expenses_amount: inputs,
            expenses_date: formattedDate,
            total_expenses: 4523
        }

        console.log("expenses", expenses);
        axios.post("http://localhost:3001/add-expense", { expenses }, { withCredentials: true })
            .then((response) => {
                setOpenModal(false);
                setLoading(false)
                console.log(response);
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
                                    <Typography>Total Expenses Amount  {totalExpenses}</Typography>
                                    {inputs.map((val, index) =>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, marginTop: 3, marginBottom: 3 }}>
                                            <Select
                                                fullWidth
                                                value={val.type}
                                                onChange={(e) => handleChange(e, index)}
                                                name="type"
                                                label="Label"

                                            >
                                                <MenuItem value="">
                                                    <em>-</em>
                                                </MenuItem>
                                                <MenuItem value="rent">Rent</MenuItem>
                                                <MenuItem value="food">Food</MenuItem>
                                                <MenuItem value="grocery">Grocery</MenuItem>
                                                <MenuItem value="entertainment">Entertainment</MenuItem>
                                                <MenuItem value="travel">Travel</MenuItem>
                                                <MenuItem value="personal_needs">Personal Needs</MenuItem>
                                                <MenuItem value="others">Others</MenuItem>
                                            </Select>
                                            <TextField fullWidth type="number" label="Amount" name="samount" value={val.samount} onChange={(e) => handleChange(e, index)} />
                                            <Button onClick={() => handleDelete(index)} variant='contained'>{<DeleteIcon />}</Button>
                                            <Button sx={{ position: 'absolute', right: 10, top: 10, color: 'black' }} onClick={() => setOpenModal(false)}>X</Button>
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