'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { socket } from './socket'

type Message = {
  id: string | number
  content: string
}

export default function Home() {
  const [msg, setMsg] = useState<string>('')
  const [msgs, setMsgs] = useState<Message[]>([])

  const handleChange = (ev: ChangeEvent): void => {
    const input = ev.target as HTMLInputElement
    setMsg(input.value)
  }
  // 1. Send to server (emit)
  const handleSubmitMessage = () => {
    const newMessage: Message = {
      id: Date.now(),
      content: msg,
    }

    socket.emit('message', { data: newMessage });
    setMsg('');
  }


  // 4. Receive from server
  useEffect(() => {
    socket.on('message', ({ data }) => {
      setMsgs([...msgs, data])
    })
    return () => {
      console.log('Something from useEffect');
    }
  }, []);

  return (
    <div>
      <div>
        <ul id='messages'>
          {msgs.map((msg: Message, index) => (
            <li key={index}>{msg.content}</li>
          ))}
        </ul>
      </div>

      {/* Writting zone */}
      <div className='border w-96 p-3 flex'>
        <input
          type="text"
          id='message'
          value={msg}
          onChange={handleChange}
          // user submits its message using Enter key
          onKeyDown={(ev) => (ev.key === 'Enter' ? handleSubmitMessage():null)}
          className='bg-slate-500'
        />
        <button onClick={handleSubmitMessage}
          className='bg-blue-500 rounded px-3' type='button'>Send</button>
      </div>
    </div>
  )
}
