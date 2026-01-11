'use client';
import './contact.css';
import { useForm } from 'react-hook-form';
import { insertNewMessage } from '../account/components/server/updateMessages';

export default function Contact() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        let res = insertNewMessage(data);
        if (res) {
            // act like your loading pls
            setTimeout(() => {
                window.alert('Message successfully sent!');
                document.querySelector('#contact-form').reset();
            }, 500);
        }
    }

    const handleKeyUp = (e) => {
        const inputGroup = e.target.closest('.changing-pw');
        if (e.key === 'Enter') {
            inputGroup.querySelector('button').click();
        }
    }

    return (
        <>
            <div className="contact main-container grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
                <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                    <h1>Contact videovomit</h1>

                    <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-group">
                            <label>Full Name
                                <input autoComplete='name' type="text" placeholder="Full Name" {...register('name', {required: true})} onKeyUp={(e) => {handleKeyUp(e)}} />
                            </label>
                        </div>
                        <div className="input-group">
                            <label>Email
                                <input autoComplete='email' type="email" placeholder="email@domain.com" {...register('email', {required: true})} onKeyUp={(e) => {handleKeyUp(e)}} />
                            </label>
                        </div>
                        <div className="input-group">
                            <label>Your Message
                                <textarea autoComplete='false' rows={4} placeholder="Your message here..." {...register('message', {required: true})} onKeyUp={(e) => {handleKeyUp(e)}} />
                            </label>
                        </div>
                        <button id="submitMessage">Submit</button>
                    </form>
                </main>
            </div>
        </>
        
    );
}