import 'react'
import { NavLink } from 'react-router'

export default function Navbar() {
  return (
    <div>
        <NavLink to="/home">
            <p>Home</p>
        </NavLink>
    </div>
  )
}
