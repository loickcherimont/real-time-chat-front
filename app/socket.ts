'use client'

import { io } from 'socket.io-client'

export const socket = io('http://localhost:3000', {
    withCredentials: true,
    extraHeaders: {
        'my-custom-header': '1234',
    }
});