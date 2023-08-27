import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form, Container } from 'react-bootstrap';

const PostBlog = () => {
   const [blogDetails, setBlogDetails] = useState({
      name: '',
      photo: null,
      message: ''
   })

   const handleChange = (e) => {
      setBlogDetails({ ...blogDetails, [e.target.name]: e.target.value });
   }

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      setBlogDetails({ ...blogDetails, photo: file });
   };


   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const formData = new FormData();
         formData.append('name', blogDetails.name);
         formData.append('photo', blogDetails.photo);
         formData.append('message', blogDetails.message);
         console.log(formData)
         const response = await axios.post('http://localhost:8001/api/user/postblog', formData, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         });
         if (response.data.success) {
            alert(response.data.message);
         } else {
            alert(response.data.message);
         }
      } catch (error) {
         console.error('Error adding blog:', error);
      }
   };
   return (
      <Container className='w-50 my-5 border rounded'>
         <Form onSubmit={handleSubmit} className='p-3'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
               <Form.Label>User Name</Form.Label>
               <Form.Control name='name' value={blogDetails.name} onChange={handleChange} type="text" placeholder="Enter Your username" />
            </Form.Group>

            <Form.Group className="mb-3">
               <Form.Label>Image</Form.Label>
               <Form.Control
                  type="file"
                  name="photo"
                  onChange={handleImageChange}
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
               <Form.Label>Message</Form.Label>
               <Form.Control placeholder='messsage' name='message' value={blogDetails.message} onChange={handleChange} as="textarea" rows={3} />
            </Form.Group>
            <Button type='submit' variant='outline-primary'>Post</Button>
         </Form>
      </Container>
   )
}

export default PostBlog
