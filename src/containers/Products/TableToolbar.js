import { alpha, Button, Dialog, DialogActions, DialogTitle, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteProducts } from '../../redux/action/product.action';

TableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

function TableToolbar({ numSelected, selected, LoadData, handleClose }) {

    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState();

    const dispatch = useDispatch();

    React.useEffect(
        () => {
            setId(selected)
        },
        [selected])

    const handleDelete = (id) => {
        dispatch(deleteProducts(id))
        // let localData = JSON.parse(localStorage.getItem("products"))

        // let filterData = localData.filter((l, i) => !id.includes(l.id))

        // localStorage.setItem("products", JSON.stringify(filterData))

        // LoadData()
        handleCloseDelete()
    }

    const handleCloseDelete = () => {
        handleClose()
        setOpen(false)
    }

    return (
        <>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                {numSelected > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Products
                    </Typography>
                )}

                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton onClick={() => setOpen(true)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this item?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => handleCloseDelete()} className="text-dark">No</Button>
                    <Button onClick={() => handleDelete(id)} className="text-dark" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default TableToolbar;