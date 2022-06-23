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
import { useDispatch, useSelector } from 'react-redux';
import { addProductImage, addProducts, updateProducts } from '../../redux/action/product.action';

function Products({ LoadData, handleClose, open, update }) {
  const [updateData, setUpdateData] = useState();
  const [imageUrl, setimageUrl] = useState();

  const dispatch = useDispatch()

  useEffect(
    () => {
      setUpdateData(update)
    },
    [update])

  const handleEdit = (values) => {
    let data = {
      "id": updateData ? updateData.id : '',
      "title": values.title,
      "sub_title": values.sub_title,
      "description": values.description,
      "image_url": imageUrl,
      "quantity": values.quantity,
      "category": values.category,
      "price": parseInt(values.price),
      "rating": parseInt(values.rating)
    }
    dispatch(updateProducts(data))
    // let localData = JSON.parse(localStorage.getItem("products"));

    // const uData = localData.map((l) => {
    //   if (l.id === updateData.id) {
    //     return data
    //   } else {
    //     return l
    //   }
    // })

    // localStorage.setItem("products", JSON.stringify(uData))

    handleClose();
    // LoadData();
    setUpdateData();
  }

  const handleAdd = (values) => {
    let data = {
      title: values.title,
      sub_title: values.sub_title,
      description: values.description,
      image_url: imageUrl,
      quantity: values.quantity,
      category: values.category,
      price: values.price,
      rating: values.rating
    }
    dispatch(addProducts(data))
    // let localData = JSON.parse(localStorage.getItem("products"))

    // let data = { "id": Math.floor((Math.random() * 1000) + 1), ...values }
    // if (localData === null) {
    //   localStorage.setItem("products", JSON.stringify([data]))
    // } else {
    //   localData.push(data)
    //   localStorage.setItem("products", JSON.stringify(localData))
    // }

    // LoadData()
    handleClose()
  }

  const handleAddImage = (e) => {
    let imageUrl = URL.createObjectURL(e.target.files[0])
    setimageUrl(imageUrl)
    // dispatch(addProductImage(e.target.files[0]))
  }

  const productSchema = {
    title: yup.string()
      .required("Title is must required"),
    sub_title: yup.string()
      .required("Subtitle is must required"),
    description: yup.string()
      .required("Description is must required"),
    quantity: yup.string()
      .required("Quantity is must required"),
    category: yup.string()
      .required("Category is must required"),
    price: yup.number()
      .required("Price is must required"),
    rating: yup.number()
      .required("Rating is must required")
      .min(0, 'Invalid Rate')
      .max(5, "Invalid Rate")
  }

  let schema = yup.object().shape(productSchema)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: updateData ? updateData.title : '',
      sub_title: updateData ? updateData.sub_title : '',
      description: updateData ? updateData.description : '',
      quantity: updateData ? updateData.quantity : '',
      category: updateData ? updateData.category : '',
      price: parseInt(updateData ? updateData.price : ''),
      rating: parseInt(updateData ? updateData.rating : '')
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

  const { getFieldProps, errors, touched, handleSubmit, handleBlur, handleChange } = formik;

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
                id="sub_title"
                label="SUBTITLE"
                type="text"
                name='sub_title'
                fullWidth
                variant="standard"
                // {...getFieldProps("sub_title")}
                defaultValue={updateData ? updateData.sub_title : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.sub_title && touched.sub_title)}
                helperText={(errors.sub_title && touched.sub_title) && errors.sub_title}
              />
              <TextField
                margin="dense"
                id="description"
                label="DESCRIPTION"
                type="text"
                name='description'
                fullWidth
                variant="standard"
                // {...getFieldProps("description")}
                defaultValue={updateData ? updateData.description : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.description && touched.description)}
                helperText={(errors.description && touched.description) && errors.description}
              />
              <TextField
                margin="dense"
                id="quantity"
                label="QUANTITY"
                type="text"
                name='quantity'
                fullWidth
                variant="standard"
                // {...getFieldProps("quantity")}
                defaultValue={updateData ? updateData.quantity : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.quantity && touched.quantity)}
                helperText={(errors.quantity && touched.quantity) && errors.quantity}
              />
              <div className='my-3'>
                <select
                  id='category'
                  className='form-select py-2'
                  defaultValue={updateData ? updateData.category : ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.category && touched.category)}
                  helperText={(errors.category && touched.category) && errors.category}
                >
                  <option values="">Select Category</option>
                  <option values="berrires">Berries</option>
                  <option values="melons">Melons</option>
                  <option values="citrus">Citrus Fruits</option>
                  <option values="drupes">Drupes</option>
                  <option values="pomes">Pomes</option>
                  <option values="tropical">Tropical Fruits</option>
                </select>
              </div>
              <div className='d-flex'>
                <div className='input-group w-75'>
                  <input
                    id="image"
                    type="file"
                    name='image'
                    className="form-control input-custom-class cust-line-height"
                    // defaultValue={updateData ? updateData.image : ''}
                    onChange={(e) => handleAddImage(e)}
                    error={Boolean(errors.image && touched.image)}
                    helperText={(errors.image && touched.image) && errors.image}
                  />
                </div>
                <div className='ms-3 border'>
                  <img src={imageUrl} alt='123' className='img-fluid' width="100px" />
                </div>
              </div>
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
                id="rating"
                label="RATING"
                type="number"
                name='rating'
                fullWidth
                variant="standard"
                // {...getFieldProps("rating")}
                defaultValue={updateData ? updateData.rating : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.rating && touched.rating)}
                helperText={(errors.rating && touched.rating) && errors.rating}
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