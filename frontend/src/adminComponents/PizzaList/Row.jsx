import { TableRow, TableCell, Box, Typography, Table, TableHead, TableBody, Collapse } from '@mui/material';
import React, { useState } from 'react';
import { FaAngleDown } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import DeletePopup from './deletePopup';
import EditPizza from './editPizza';
const Row = ({ pizza }) => {
    const [open, setOpen] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const [editTrig, setEditTrig] = useState(false);
    const handleDelete = async (id) => {

        const response = await Axios.delete(`http://localhost:3000/api/admin/pizza/${id}`)
        if (response.status === 200) {
            toast('Pizza Deleted SuccessFully')
            setTrigger(false);
            window.location.reload(true);
        }
    }
    const resetTrigger = () => {
        setTrigger(false);
    }
    const resetEditTrig = () => {
        setEditTrig(false);
    }
    return (
        <>
            <TableRow>
                <TableCell>
                    <FaAngleDown onClick={() => setOpen(!open)} className='cursor-pointer size-8 text-yellow-400' />
                </TableCell>
                <TableCell component="th" scope="row">{pizza.name}</TableCell>
                <TableCell>
                    <MdOutlineEdit onClick={() => setEditTrig(true)} className='cursor-pointer size-8' />
                    <EditPizza editTrig={editTrig} setEditTrig={setEditTrig} Pizza={pizza} />
                </TableCell>
                <TableCell>
                    <GoTrash onClick={() => setTrigger(true)} className='cursor-pointer size-8' />
                    <DeletePopup trig={trigger} resetTrig={resetTrigger} deleteHandler={handleDelete} id={pizza._id} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Prices
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Varient</TableCell>
                                        <TableCell>Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pizza.size.map((size, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell component="th" scope="row">
                                                {size}
                                            </TableCell>
                                            <TableCell >{pizza.price[idx]}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

export default Row