import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectedWrapper = ({
    children
}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { setCaptain } = useContext(CaptainDataContext)
    const [ isLoading, setIsLoading ] = useState(true)




    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setCaptain(response.data.captain)
                setIsLoading(false)
            }
        })
            .catch(err => {

                localStorage.removeItem('token')
                navigate('/captain-login')
            })
    }, [ token ])

    

    if (isLoading) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-night">
                <div className="flex items-center gap-2.5">
                    <span className="text-3xl font-extrabold tracking-tight text-white">Uber</span>
                    <span className="rounded-lg bg-gold px-2.5 py-1 text-[10px] font-extrabold tracking-[0.18em] text-night uppercase">Captain</span>
                </div>
                <span className="spinner text-night-fog" />
            </div>
        )
    }



    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectedWrapper