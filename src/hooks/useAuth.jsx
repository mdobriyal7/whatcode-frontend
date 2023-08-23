import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
   
    let status = "User"

    if (token) {
        const decoded = jwtDecode(token)
        const {name, roles } = decoded.UserInfo
        return {name, roles}
    }

    return {name: '', roles: [] }
}
export default useAuth