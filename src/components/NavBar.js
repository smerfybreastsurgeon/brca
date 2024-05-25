import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
const NavBar = () => {
  return (
    <Nav  tabs pills className="justify-content-end" >
  <NavItem>
    <NavLink
      className="nav-link-gdc mr-2"
      
      to="/"
      tag={RRNavLink}
    >
      Home
    </NavLink>
  </NavItem>
  <NavItem>
    <NavLink
      className="nav-link-gdc mr-2 "
      
      to="/cstage"
      tag={RRNavLink}
    >
      Clinical Stage
    </NavLink>
  </NavItem>
  <NavItem>
    <NavLink
      className="nav-link-gdc mr-2 "
      
      to="/pstage"
      tag={RRNavLink}
    >
      Pathological Stage
    </NavLink>
  </NavItem>
  <NavItem>
    <NavLink
      className="nav-link-gdc  mr-3"
      
      to="/subtype"
      tag={RRNavLink}
    >
      ImmunoHistoChemistry
    </NavLink>
  </NavItem>
</Nav>
  )
}

export default NavBar