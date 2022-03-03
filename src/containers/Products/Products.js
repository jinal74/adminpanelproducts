import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import * as yup from "yup";
import { Form, FormikProvider, useFormik } from 'formik';
import DataTable from './Table'

function Products({LoadData, handleClose, open, update}) {
  const [updateData, setUpdateData] = useState();

  useEffect(
    () => {
      setUpdateData(update)
    },
  [update])

  const handleEdit = (values) => {
    let data = {
      "id": updateData ? updateData.id : '',
      "title": values.title,
      "subtitle": values.subtitle,
      "price": parseInt(values.price),
      "rate": parseInt(values.rate)
    }
    let localData = JSON.parse(localStorage.getItem("products"));

    const uData = localData.map((l) => {
      if(l.id === updateData.id) {
        return data
      } else {
        return l
      }
    })

    localStorage.setItem("products", JSON.stringify(uData))

    handleClose();
    LoadData();
    setUpdateData();
  }

    const handleAdd = (values) => {
      let localData = JSON.parse(localStorage.getItem("products"))

      let data = {"id":Math.floor((Math.random() * 1000) + 1), ...values}
      if (localData === null) {
        localStorage.setItem("products", JSON.stringify([data]))
      } else {
        localData.push(data)
        localStorage.setItem("products", JSON.stringify(localData))
      }

      LoadData()
      handleClose()
    }

    const productSchema = {
      title: yup.string()
        .required("Title is must required"),
      subtitle: yup.string()
        .required("Subtitle is musat required"),
      price: yup.number() 
        .required("Price is must required"),
      rate: yup.number()
        .required("Rating is must required")
        .min(0, 'Invalid Rate')
        .max(5, "Invalid Rate")
    }

    let schema = yup.object().shape(productSchema)

    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        title: updateData ? updateData.title : '',
        subtitle: updateData ? updateData.subtitle : '',
        price: parseInt(updateData ? updateData.price : ''),
        rate: parseInt(updateData ? updateData.rate : '')
      },
      validationSchema: schema,
      onSubmit: values => {
        if (updateData) {
          handleEdit(values)
        } else {
          handleAdd(values)
        }
      },
    });

    const { getFieldProps, errors, touched, handleSubmit, handleBlur, handleChange} = formik;

    return (
      <div>
        <Dialog open={open} onClose={() => handleClose()}>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
          <DialogTitle>
           {updateData ? 'Update Products' : 'Add Products'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add products to this website, please enter your detailes here. We
              will send updates occasionally.
            </DialogContentText>
            <TextField
              margin="dense"
              id="title"
              label="PRODUCT TITLE"
              type="text"
              fullWidth
              name='title'
              variant="standard"
              // {...getFieldProps("title")}
              defaultValue={updateData ? updateData.title : ''}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.title && touched.title)}
              helperText={(errors.title && touched.title) && errors.title}
            />
            <TextField
              margin="dense"
              id="subtitle"
              label="SUBTITLE"
              type="text"
              name='subtitle'
              fullWidth
              variant="standard"
              // {...getFieldProps("subtitle")}
              defaultValue={updateData ? updateData.subtitle : ''}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.subtitle && touched.subtitle)}
              helperText={(errors.subtitle && touched.subtitle) && errors.subtitle}
            />
            <TextField
              margin="dense"
              id="price"
              label="PRICE ($)"
              type="number"
              name='price'
              fullWidth
              variant="standard"
              // {...getFieldProps("price")}
              defaultValue={updateData ? updateData.price : ''}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.price && touched.price)}
              helperText={(errors.price && touched.price) && errors.price}
            />
            <TextField
              margin="dense"
              id="rate"
              label="RATING"
              type="number"
              name='rate'
              fullWidth
              variant="standard"
              // {...getFieldProps("rate")}
              defaultValue={updateData ? updateData.rate : ''}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.rate && touched.rate)}
              helperText={(errors.rate && touched.rate) && errors.rate}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose()}>Cancel</Button>
            <Button type='submit'>
             {updateData ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
          </Form>
          </FormikProvider>
        </Dialog>
      </div>
    );
}

export default Products;