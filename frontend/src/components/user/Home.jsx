import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import IconButton from '@mui/material/IconButton';
import { UserContext } from '../../App';
import Spinner from 'react-bootstrap/Spinner';

const Home = () => {
   const user = useContext(UserContext)
   const [AllBlogs, setAllBlogs] = useState([])
   const [likedStatus, setLikedStatus] = useState({});


   const getAllBlogs = async () => {
      await axios.get('http://localhost:8001/api/user/getblogs')
         .then((res) => {
            <Spinner animation="grow" variant="warning" />
            setAllBlogs(res.data.data);
         })
         .catch((err) => {
            console.error(err);
         });
   };
   useEffect(() => {
      getAllBlogs();
   }, [])

   const handleLikes = async (blogId, userId, likes) => {
      

      const updatedLikedStatus = { ...likedStatus };

      if (!updatedLikedStatus[userId]) {
         updatedLikedStatus[userId] = {};
      }

      if (!updatedLikedStatus[userId][blogId]) {
         updatedLikedStatus[userId][blogId] = true;
         setAllBlogs((prevBlogs) =>
            prevBlogs.map((blog) =>
               blog._id === blogId ? { ...blog, likes: blog.likes + 1 } : blog
            )
         );
      } else {
         updatedLikedStatus[userId][blogId] = false;
         setAllBlogs((prevBlogs) =>
            prevBlogs.map((blog) =>
               blog._id === blogId ? { ...blog, likes: blog.likes - 1 } : blog
            )
         );
      }

      setLikedStatus(updatedLikedStatus);

      try {
         await axios.post(`http://localhost:8001/api/user/updatelikes/${blogId}`, {
            blogId: blogId,
            likeCount: updatedLikedStatus[userId][blogId] ? likes + 1 : likes - 1, // Adjust the like count based on the action
         });
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <Container className='my-3'>
         <Row xs={1} md={2} className="g-4">
            {AllBlogs && AllBlogs.length > 0 ?
               AllBlogs.slice().reverse().map((blog) => (
                  <Col key={blog._id}>
                     <Card className='swing'>
                        <Card.Img variant="top" src={`http://localhost:8001${blog.photo.path}`} />
                        <Card.Body>
                           <Card.Title>{blog.name}</Card.Title>
                           {
                              user.userLoggedIn === true ? <Stack direction="row" spacing={1}>
                                 <IconButton>
                                    <FavoriteIcon onClick={() => handleLikes(blog._id, user.userData._id, blog.likes)} />
                                 </IconButton>
                              </Stack> : <></>
                           }

                           <Card.Text>
                              <p className='w-100'>{blog.likes} Likes</p>
                           </Card.Text>
                           <div className="body">
                              <div className="left w-100">
                                 <Card.Text>
                                    {blog.message}
                                 </Card.Text>
                                 <Card.Text>
                                    <p style={{ opacity: 0.5, fontSize: 12, letterSpacing: '2px', marginBottom: 2 }}>Created at: {new Date(blog.createdAt).toLocaleString()}</p>
                                 </Card.Text>
                              </div>
                           </div>
                        </Card.Body>
                     </Card>
                  </Col>
               )) : <><p>There are no blogs in the app</p></>}
         </Row>
      </Container>
   )
}

export default Home
