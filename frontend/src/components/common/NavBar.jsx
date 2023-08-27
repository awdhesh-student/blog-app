import React, { useContext } from 'react'
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { UserContext } from '../../App';
import { NavLink } from 'react-router-dom';

const NavBar = ({ setSelectedComponent }) => {
   let type = null

   const user = useContext(UserContext)
   if (!user) {
      return null
   }
   else {
      type = user.userData.type
   }

   const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
   }
   const handleOptionClick = (component) => {
      setSelectedComponent(component);
   };

   return (
      <Navbar expand="lg" className="bg-body-tertiary">
         <Container fluid>
            <Navbar.Brand>
               <h3>EazyPost</h3>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
               <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                  {type === 'user' ? (
                     <>
                        <NavLink onClick={() => handleOptionClick('home')}>Home</NavLink>
                        <NavLink onClick={() => handleOptionClick('postBlog')}>Post a Blog</NavLink>
                        <NavLink onClick={() => handleOptionClick('myBlogs')}>My Blogs</NavLink>
                     </>
                  ) : (
                     <>
                        <NavLink onClick={() => handleOptionClick('allusers')}>All Users</NavLink>
                        <NavLink onClick={() => handleOptionClick('allblogs')}>All Blogs</NavLink>
                     </>
                  )}
               </Nav>
               <Nav>
                  <h5 className='mx-3'>Hi {user.userData.name}</h5>
                  <Button onClick={handleLogout} size='sm' variant='outline-danger'>Log Out</Button >
               </Nav>

            </Navbar.Collapse>
         </Container>
      </Navbar>
   )
}

export default NavBar
