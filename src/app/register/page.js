/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { useSession } from "../SessionProvider";
import { useRouter } from "next/navigation";
import { registerUser } from "./components/server/registerUser";

import pageRoutes from "@/pageRoutes";
import '../styles/register.css';
import { useEffect } from "react";

export default function register() {
    const session = useSession().sessionData;
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = document.querySelector('#register-form');
        let responses = {
            username: form.querySelector('#username').value,
            password: form.querySelector('#password').value,
            email: form.querySelector('#email').value,
            fname: form.querySelector('#fname').value,
            lname: form.querySelector('#lname').value,
        }

        let res = await registerUser(responses)
        .then((response) => {
            if (response) {
                window.alert(response);
            }
            else {
                window.alert('Success! You will now be redirected to sign in.')
                router.push(pageRoutes.account);
            }
        })
        .catch((e) => {
            console.error(e);
            return 'There has been an unknown error. Please refresh and try again.'
        });
    }

    useEffect(() => {
        if (session?.user) {
            router.push(pageRoutes.account);
        }
    }, []);

    return (
        <>
            <div className="register main-container grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
                <main className="register flex flex-col gap-[32px] row-start-2 sm:items-start">
                    <h1>Register<span className="desktop-only"></span></h1>
                    <form id="register-form" onSubmit={(e) => {handleRegister(e)}}>
                        <label className="input-group username">Username
                            <input id="username" type="text" placeholder="username" autoComplete="username" ></input>
                        </label>

                        <label className="input-group email">Email
                            <input id="email" type="email" placeholder="email@domain.com" autoComplete="email"></input>
                        </label>

                        <label className="input-group fname">First Name
                            <input id="fname" type="text" placeholder="First Name" autoComplete="given-name"></input>
                        </label>

                        <label className="input-group lname">Last Name
                            <input id="lname" type="text" placeholder="Last Name" autoComplete="family-name"></input>
                        </label>

                        <label className="input-group password">Password
                            <input id="password" type="password" placeholder="password" autoComplete="new-password"></input>
                        </label>

                        <button id="register" alt="Register for new account">Register</button>
                    </form>

                </main>
            </div>
        </>
    );
}