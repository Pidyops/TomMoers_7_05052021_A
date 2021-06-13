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


// useEffect(() => {
//     if (errorMessage){
//         toast.error(errorMessage, {className:'toast--error'} )
//         setErrorMessage('')
//     }


// }, [errorMessage])


// import { toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// import clsx from 'clsx';

// <div className={clsx(classes.paper, 'create-post' )}></div>