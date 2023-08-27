import React, { useContext, useState } from 'react';
import NavBar from './NavBar';
import PostBlog from '../user/PostBlog';
import MyBlogs from '../user/MyBlogs';
import Home from '../user/Home';
import AllUsers from '../admin/AllUsers';
import AllBlogs from '../admin/AllBlogs';
import { UserContext } from '../../App';

const UserHome = () => {
  const user = useContext(UserContext)
  const [selectedComponent, setSelectedComponent] = useState(user.userData.type === 'admin' ? 'allusers' : 'home');

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'home':
        return <Home />;
      case 'postBlog':
        return <PostBlog />;
      case 'myBlogs':
        return <MyBlogs />;
       case 'allusers':
          return <AllUsers />;
       case 'allblogs':
          return <AllBlogs />;
      default:
        return user.userData.type === 'user' ?  <Home /> : <AllUsers />
        
    }
  };

  return (
    <>
      <NavBar setSelectedComponent={setSelectedComponent} />
      <div>
        {renderSelectedComponent()}
      </div>
    </>
  );
};

export default UserHome;

