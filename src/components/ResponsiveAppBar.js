import '../styles/ResponsiveAppBar.css'
import React, {useEffect, useState} from 'react'

import {AppBar, Tab, Tabs, Toolbar, useMediaQuery, useTheme} from '@mui/material'
import DrawerComp from './DrawerComp';

import { Link, useLocation } from 'react-router-dom';

const ResponsiveAppBar = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  const path = useLocation().pathname;

  useEffect(() => {
    switch (path) {
      case '/blogs':
        setValue(0)
        break;
      case '/projects':
        setValue(1)
        break;
    }
  })

  


  return (
    <React.Fragment>
      <AppBar className='nav'>
        <Toolbar className='navContent'>
        <Link to='/' onClick={()=> setValue()} style={{fontFamily: 'Lobster', fontSize: '30px'}}>ernestviola.com</Link>
          {
            isMatch ? (
              <>
              <DrawerComp />
              </>

            ) : (
              <>
                <Tabs sx={{marginLeft:'auto'}} textColor='inherit' value={value} indicatorColor='primary'>
                  <Tab key={0} label='Blog' component={Link} to='/blogs'/>
                  <Tab key={1} label='Projects' component={Link} to='/projects'/>
                </Tabs>
              </>
            )
          }
          
        </Toolbar>
        
      </AppBar>
    </React.Fragment>
  )
}

export default ResponsiveAppBar;