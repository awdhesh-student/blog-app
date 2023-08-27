import React from 'react'
import { Container, Nav, Navbar,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import p1 from '../../Images/p1.jpg'

const About = () => {

   return (
      <div>
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

         <Container>
            <div className='about-content'>
               <div className="left-content">
                  <h3>Heading</h3>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate, deserunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam impedit quo adipisci, totam optio dolore! Nulla aperiam doloremque enim sit.</p>
                  <Button className='m-2' variant='outline-warning' size='lg'><Link to={'/register'}>Learn More!</Link></Button>

               </div>
               <div className="right-content swing">
                  <img src={p1} alt="flim" />
               </div>
            </div>
            <div className='about-content'>
               <div className="right-content swing">
                  <img src={p1} alt="flim" />
               </div>
               <div className="left-content">
                  <h3>Heading</h3>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate, deserunt.</p>
                  <Button className='m-2' variant='outline-warning' size='lg'><Link to={'/register'}>Learn More!</Link></Button>

               </div>

            </div>


         </Container>
      </div>
   )
}

export default About
