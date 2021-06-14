import React from 'react'
import './toast.scss'
import { ToastContainer, toast, Zoom } from 'react-toastify'

export default function Toast() {
    return (
            <ToastContainer
                draggable={false}
                transition={Zoom}
                autoClose={3000}
                position={toast.POSITION.BOTTOM_CENTER}
             />
    )
}