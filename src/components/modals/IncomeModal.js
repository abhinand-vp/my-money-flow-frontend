import React, { useEffect } from 'react';
import { Backdrop, Box, Button, Fade, Modal, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

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

const IncomeModal = ({ openMOdal, setOpenModal }) => {

    useEffect(() => {
        if (isOpen == 'false') {
            setIsOpen(true)
        }
    }, [])

    const [incomeDate, setIncomeDate] = useState(null)
    const [isOpen, setIsOpen] = useState(true);
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleClose = () => { }

    const onSubmit = data => {
        setLoading(true)
        const inputDate = new Date(incomeDate)
        const formattedDate = inputDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
        let params = {
            income_amount: data.amount,
            income_desc: data.desc,
            income_date: formattedDate
        }
        axios.post("http://localhost:3001/add-income", { params }, { withCredentials: true })
            .then((response) => {
                toast.success(response.data.msg);
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
                                        Add Your Income 💯
                                    </Typography>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <TextField
                                            {...register('amount', { required: true })}
                                            label="Amount"
                                            fullWidth
                                            variant="outlined"
                                            type='number'
                                            sx={{ marginBottom: 3 }}
                                            error={!!errors.amount}
                                            helperText={errors.amount && 'Amount is required.'}
                                        />
                                        <TextField
                                            {...register('desc')}
                                            label="Description"
                                            fullWidth
                                            sx={{ marginBottom: 3 }}
                                            variant="outlined"
                                        />
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                fullWidth
                                                sx={{ marginBottom: 3 }}
                                                label="Select Date"
                                                value={incomeDate}
                                                onChange={(newValue) => setIncomeDate(newValue)}
                                                renderInput={(props) => <TextField {...props} />}
                                            />
                                        </LocalizationProvider>
                                        <Button
                                            type='submit'
                                            variant={loading ? 'outlined' : 'contained'}
                                            disabled={loading}
                                        >
                                            {loading ? 'Submit' : 'Add Income'}
                                        </Button>
                                    </form>
                                </>
                            </Box>
                        </Fade>
                    </Modal>
                </>
            )}

        </div>
    )
}

export default IncomeModal