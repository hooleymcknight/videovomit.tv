/* eslint-disable react-hooks/rules-of-hooks */
'use client';
// import Navbar from "../components/navbar";
import { useSession } from "../SessionProvider";
import { useRouter } from "next/navigation";
import { registerUser } from "./components/server/registerUser";

import '../styles/register.css';

export default function register() {
    const session = useSession().sessionData;
    const router = useRouter();

    if (session?.user) {
        router.push('/portal');
    }

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
                router.push('/portal');
            }
        })
        .catch((e) => {
            console.error(e);
            return 'There has been an unknown error. Please refresh and try again.'
        });
    }

    return (
        <>
            {/* <Navbar /> */}
            <div className="register main-container grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
                <main className="register flex flex-col gap-[32px] row-start-2 sm:items-start">
                    <h1>Register<span class="desktop-only"> for GoGCommunity.com</span></h1>
                    <form id="register-form" onSubmit={(e) => {handleRegister(e)}}>
                        <div className="input-group username">
                            <label>Username</label>
                            <input id="username" type="text" placeholder="username"></input>
                        </div>

                        <div className="input-group email">
                            <label>Email</label>
                            <input id="email" type="email" placeholder="email@domain.com"></input>
                        </div>

                        <div className="input-group fname">
                            <label>First Name</label>
                            <input id="fname" type="text" placeholder="First Name"></input>
                        </div>

                        <div className="input-group lname">
                            <label>Last Name</label>
                            <input id="lname" type="text" placeholder="Last Name"></input>
                        </div>

                        <div className="input-group password">
                            <label>Password</label>
                            <input id="password" type="password" placeholder="password"></input>
                        </div>

                        <button id="register">Register</button>
                    </form>

                </main>
            </div>
        </>
    );
}