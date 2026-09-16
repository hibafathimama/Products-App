import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
  
    const token = localStorage.getItem('token')

    return token ? <Navigate to={'/Products'}/> : children
}

export default PublicRoute