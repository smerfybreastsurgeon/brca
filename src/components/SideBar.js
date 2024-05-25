import React, { useEffect } from 'react';
import { useState } from "react";
import '../index.css'

const Sidebar = (props) => {
  const [open, setOpen] = useState(props.open); // create a state variable to store the open status of the sidebar

  useEffect(()=>{
setOpen(props.open)
  },[props.open])// create a function to toggle the open status of the sidebar

  return (
    <div className="sidebar-container"> 
      <div style={{ backgroundColor: props.backgroundColor, position: 'fixed', top: 0, right: 0, height: '100vh', width: '155px', padding: '20px' }}
        className={`sidebar ${open ? "open" : "close"}`} // add some classes to the sidebar depending on the open status
        
      >
        {props.children}
      </div>
      <div className="main-content">
        
        {props.content}
      </div>
    </div>
  );
}

export default Sidebar;
