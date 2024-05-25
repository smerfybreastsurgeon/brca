import { useState } from "react";
import { NavLink as RRNavLink  } from "react-router-dom"
import { Col, Collapse, Nav, NavItem,NavLink, Navbar, NavbarBrand, NavbarToggler, Row} from "reactstrap"
import '../index.css'
import Sidebar from "./SideBar"; 


const Header = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [open,setOpen]=useState(false)

  const toggleNavbar = () => {setCollapsed(!collapsed);setOpen(!open)}

    return (
        <header className="Header">
            <Navbar expand="md">
           <NavbarBrand href="/"  style={{ marginRight: '150px'}}>
            <Row>
                <Col>
                          <img 
                          alt="logo"
                          src="/assets/BrcaLogo.png"
                          style={{
                          height: 50,
                           width: 50,            
                            }}
                          />
                </Col>
               <Col>
                        <h3 className="navbar-title" >Breast Cancer</h3></Col>
            </Row>
           </NavbarBrand>
           <div style={{order:1}}>
           <NavbarToggler onClick={toggleNavbar}  style={{marginTop:20,marginLeft:15, width:'35px',display: 'flex',
        justifyContent: 'center', height:'35px', zIndex:'2',backgroundColor: 'blue', color: 'yellow'  }}>
                    <span className="navbar-toggler-icon"></span> 
            </NavbarToggler>  </div>          
            <Collapse isvisible={!collapsed.toString()} navbar>
                <Nav navbar  tabs pills className="justify-content-end  "    style={{order:0,flexColumn:'true'}} > 
                    <NavItem><NavLink to="home"  tag={RRNavLink}  >Home</NavLink></NavItem>
                    <NavItem><NavLink to="recur"  tag={RRNavLink} >Recurrence</NavLink></NavItem>
                    <NavItem><NavLink to="neoadjuvant"  tag={RRNavLink} >Neoadjuvant</NavLink></NavItem>
                    <NavItem><NavLink to="surgery"  tag={RRNavLink} >Operation</NavLink></NavItem>
                    <NavItem><NavLink to="pstage"  tag={RRNavLink} >Pathological Stage</NavLink></NavItem>
                    <NavItem><NavLink to="subtype"  tag={RRNavLink} >Subtype</NavLink></NavItem>
                    <NavItem><NavLink to="cstage"  tag={RRNavLink} >Clinical Stage</NavLink></NavItem>
                    <NavItem><NavLink to="patient"  tag={RRNavLink} >Patients</NavLink></NavItem>
                    <NavItem><NavLink to="signin"  tag={RRNavLink} >Log In</NavLink></NavItem>
                </Nav>
            </Collapse>            
            </Navbar>
            {!collapsed && (<Sidebar open={open}
        backgroundColor="purple" 
        content={<div // pass the content prop to the Sidebar component
          style={{color: 'black',}} // add some style to the content
        >
                   
        </div>}
      >
        <div 
          style={{color: 'white',width:'10%'}} 
        >
          <h4>Sidebar Menu</h4> 
          <p><NavItem><NavLink to="/"  tag={RRNavLink}  >Home</NavLink></NavItem>
                    <NavItem><NavLink to="recur"  tag={RRNavLink} >Recurrence</NavLink></NavItem>
                    <NavItem><NavLink to="neoadjuvant"  tag={RRNavLink} >Neoadjuvant</NavLink></NavItem>
                    <NavItem><NavLink to="surgery"  tag={RRNavLink} >Operation</NavLink></NavItem>
                    <NavItem><NavLink to="pstage"  tag={RRNavLink} >Pathological Stage</NavLink></NavItem>
                    <NavItem><NavLink to="subtype"  tag={RRNavLink} >Subtype</NavLink></NavItem>
                    <NavItem><NavLink to="cstage"  tag={RRNavLink} >Clinical Stage</NavLink></NavItem>
                    <NavItem><NavLink to="patient"  tag={RRNavLink} >Patients</NavLink></NavItem></p>
        </div>
      </Sidebar>
            )}
        </header>
    )
}

export default Header
