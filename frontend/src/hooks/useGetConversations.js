import { useEffect, useState } from "react"
import toast from "react-hot-toast"


const useGetConversations = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState([])

    useEffect(() => {
       const getConversations = async () => {
          setLoading(true)
          try{
               const resp = await fetch("/api/users")
               const data = await resp.json()
               if(resp.ok){
                 setConversations(data)
               }else{
                throw new Error(data.error)
               }
          }catch(error){
            toast.error(error.message)
          }finally{
            setLoading(false)
          }
       }

       getConversations()
    },[])

    return {loading, conversations}

}


export default useGetConversations