import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"



const useSignup = () => {
       const [loading, setLoading] = useState(false)
       const {authUser, setAuthUser} = useAuthContext()

       const signup = async ({fullName, username, password, confirmPassword, gender}) => {
            const success = handleInputErrors({fullName, username, password, confirmPassword, gender})
            if(!success) return
            setLoading(true)
            try{
                const res = await fetch('/api/auth/signup',{
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({fullName, username, password, confirmPassword, gender})
                })
                const data = await res.json();
                if(res.ok){
                    localStorage.setItem("chat-user",JSON.stringify(data))
                    setAuthUser(data)
                }
                else{
                    throw new Error(data.error)
                }
            }catch(error){
                toast(error.message)
            } finally {
                setLoading(false)
            }
       }

       return {signup, loading}
}


// i personally prefer doing it on server side and use that error to show on client side
function handleInputErrors({fullName, username, password, confirmPassword, gender}){
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast("Please fill in all fields")
        return false;
    }
    if(password !== confirmPassword){
        toast("password does not match")
        return  false
    }
    if(password.length < 6){
        toast.error('Password ust be atleast 6 characters')
        return false
    }
    return true
}

export default useSignup