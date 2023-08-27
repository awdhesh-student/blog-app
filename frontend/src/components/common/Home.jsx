import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Nav, Button, Navbar } from 'react-bootstrap';
import Home2 from '../user/Home'
const Home = () => {
   return (
      <>
         <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
               <Navbar.Brand><h2>EasyPost</h2></Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav
                     className="me-auto my-2 my-lg-0"
                     style={{ maxHeight: '100px' }}
                     navbarScroll
                  >
                  </Nav>
                  <Nav>
                     <Link to={'/'}>Home</Link>
                     <Link to={'/about'}>About</Link>
                     <Link to={'/login'}>Login</Link>
                     <Link to={'/register'}>Register</Link>
                  </Nav>

               </Navbar.Collapse>
            </Container>
         </Navbar>

         <div id='home-container' className='first-container front'>
            <div className="content-home">
               <p>Craft, Connect, Communicate: <br />Your Words, Your Blog, Our App!!</p>
               <Button className='m-2' variant='outline-warning' size='lg'><Link to={'/register'}>Post Blog Now!</Link></Button>
            </div>
         </div>

         <Container className="">
            <h2 className="text-center my-4">Blogs to Show</h2>
            <div>
               <Home2 />
            </div>
         </Container>
      </>
   )
}

export default Home