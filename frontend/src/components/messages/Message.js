import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { useConversationContext } from '../../hooks/useConversationContext'
import { extractTime } from '../../utils/extractTime'

const Message = ({message}) => {
  const {authUser} = useAuthContext()
  const {currConversation} = useConversationContext()
  const fromattedTime = extractTime(message.createdAt)
  const fromMe = message.senderId === authUser._id
  const chatClassName = fromMe ? 'chat-end' : 'chat-start'
  const profilePic = fromMe ? authUser.profilePic : currConversation?.profilePic
  const bubbleBgColor = fromMe ? 'bg-blue-500' : ""
  const shakeClass = message.shouldShake ? "shake" :""

  return (
    <>
    <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
            <img
                alt="Tailwind CSS chat bubble component"
                src={profilePic} />
            </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass}`}>{message.message}</div>
        <div className="chat-footer opacity-50">{fromattedTime}</div>
    </div>
   </>
  )
}

export default Message