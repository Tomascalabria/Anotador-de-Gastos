import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { DefaultNavBar } from './DefaultNavBar/DefaultNavBar.js'
import { Index, SessionNavBar } from './SessionNavBar/SessionNavBar.js'

export const NavBar = () => {
const {user}=useContext(AuthContext)
    return (
user?<Index/>:<DefaultNavBar/>
  )
}
