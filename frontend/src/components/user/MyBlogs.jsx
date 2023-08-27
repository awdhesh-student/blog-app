import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const MyBlogs = () => {
   const [AllBlogs, setAllBlogs] = useState([])

   const [updatedData, setUpdatedData] = useState({
      message: '',
   });

   const [imageFile, setImageFile] = useState(null);
   const [editingBlogId, setEditingBlogId] = useState(null);


   const handleChange = (e) => {
      setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
   }

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImageFile(file);
   };

   const handleClose = () => setEditingBlogId(null);
   const handleShow = (blogId) => {
      const blogToUpdate = AllBlogs.find(blog => blog._id === blogId);
      setUpdatedData({
         message: blogToUpdate.message,
      });
      setImageFile(null);
      setEditingBlogId(blogId);
   };

   const getAllBlogs = async () => {
      await axios.get('http://localhost:8001/api/user/getallblogs', {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         },
      })
         .then((res) => {
            setAllBlogs(res.data.data);
         })
         .catch((err) => {
            console.error(err);
         });
   };
   useEffect(() => {
      getAllBlogs();
   }, [])

   const updateBlog = async (blogId) => {
      handleClose();

      const formData = new FormData();
      formData.append('message', updatedData.message);
      if (imageFile) {
         formData.append('photo', imageFile);
      }
      try {
         const response = await axios.patch(`http://localhost:8001/api/user/updateblog/${blogId}`, formData, {
            headers: {
               'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
         });
         if (response.data.success) {
            getAllBlogs();
         }
      } catch (error) {
         console.log(error);
      }
   };

   const deleteBlog = async (blogId) => {
      let assure = window.confirm("are you sure to delete")
      if (assure) {
         try {
            const response = await axios.delete(`http://localhost:8001/api/user/deleteblog/${blogId}`, {
               headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
            });
            if (response.data.success) {
               alert(response.data.message);
               getAllBlogs();
            } else {
               alert(response.data.message);
            }
         } catch (error) {
            console.log(error);
         }
      }
   }
   return (
      <>
         <Container className='my-3'>
            <Row xs={1} md={2} className="g-4">
               {
                  AllBlogs && AllBlogs.length > 0 ?
                     AllBlogs.map((blog) => (
                        <Col key={blog._id}>
                           <Card>
                              <Card.Img variant="top" src={`http://localhost:8001${blog.photo.path}`} />
                              <Card.Body>
                                 <Card.Title>{blog.name}</Card.Title>
                                 <div className="body">
                                    <div className="left w-75">
                                       <Card.Text>
                                          {blog.message}
                                       </Card.Text>
                                       <Card.Text>
                                          <p className='w-100'>Likes: {blog.likes}</p>
                                       </Card.Text>
                                       <Card.Text>
                                          <p style={{ opacity: 0.5, fontSize: 12, letterSpacing: '2px', marginBottom: 2 }}>Created at: {new Date(blog.createdAt).toLocaleString()}</p>
                                          <p style={{ opacity: 0.5, fontSize: 12, letterSpacing: '2px' }}>Updated at: {new Date(blog.updatedAt).toLocaleString()}</p>
                                       </Card.Text>
                                    </div>
                                    <div className="right d-flex">
                                       <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => deleteBlog(blog._id)} />
                                       <EditIcon style={{ cursor: 'pointer' }} onClick={() => handleShow(blog._id)} />
                                       <Modal show={editingBlogId === blog._id} onHide={handleClose}>
                                          <Modal.Header closeButton>
                                             <Modal.Title>Update Blog</Modal.Title>
                                          </Modal.Header>
                                          <Modal.Body>
                                             <Form onSubmit={(e) => {
                                                updateBlog(blog._id)
                                                e.preventDefault()
                                             }}>
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
                                                   <Form.Control placeholder='messsage' name='message' value={updatedData.message} onChange={handleChange} as="textarea" rows={3} />
                                                </Form.Group>
                                                <Button variant="primary" type='submit'>
                                                   Save Changes
                                                </Button>
                                             </Form>
                                          </Modal.Body>
                                       </Modal>
                                    </div>
                                 </div>
                              </Card.Body>
                           </Card>
                        </Col>
                     )): <p>You have not posted any blog yet!!!</p>}
            </Row>
         </Container>


      </>
   )
}

export default MyBlogs
