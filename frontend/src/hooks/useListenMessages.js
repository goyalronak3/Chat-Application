import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import { useConversationContext } from './useConversationContext'
import notification from '../assets/sounds/notification.mp3'

const useListenMessages = () => {
    const {socket} = useSocketContext()
    const {messages, setMessages} = useConversationContext()

    useEffect(() => {
        socket?.on("newMessage", (newMessage)=>{
            newMessage.shouldShake = true
            const sound = new Audio(notification)
            sound.play()
            setMessages([...messages, newMessage])
        })

        return () => socket.off("newMessage")
    },[socket, messages, setMessages])

}

export default useListenMessages