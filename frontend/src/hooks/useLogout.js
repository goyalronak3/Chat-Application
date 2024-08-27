import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

const useLogout = () => {
    const [loading, setLoading] = useState()
    const {setAuthUser} = useAuthContext()

    const logout = async () => {
        setLoading(true)
        try{
            const resp = await fetch("/api/auth/logout", {
                method : 'POST',
                headers : {'Content-Type' : 'application/json'}
            })
            const data = await resp.json();

            if(resp.ok){
                localStorage.removeItem('chat-user')
                setAuthUser(null)
            }else{
                throw new Error(data.error)
            }

        }catch(error){
            toast.error(error)
        }finally{
            setLoading(false)
        }
    }

    return {loading, logout}

}

export default useLogout