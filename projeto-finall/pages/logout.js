import React, { useEffect } from "react";
import AuthService from "../services/AuthService";
import { useRouter } from 'next/router'



export default function Logout() {
    const router = useRouter()
    useEffect(() => {
        AuthService.logout()
        console.log("logout")
        router.push("/")
    }, [])

    return (
        <>
            <div>
                logout efetuado com sucesso
            </div>
        </>
    )
}