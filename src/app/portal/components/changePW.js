'use client';
import { useState } from 'react';

export default function ChangePasswordButton({ required, onDataSend, updatePwChangeRequired }) {
    const [changingPassword, setChangingPassword] = useState(false);

    const handleClick = async (e, firstReset) => {
        const pwContainer = e.target.parentElement;
        if (changingPassword) {
            let inputValue = pwContainer.querySelector('input#new-pw-1')?.value;
            let repeatValue = pwContainer.querySelector('input#new-pw-2')?.value;
            if (inputValue === repeatValue) {
                let currentPW;
                if (firstReset) {
                    currentPW = false;
                }
                else {
                    currentPW = pwContainer.querySelector('input#current-pw')?.value;
                }
                const updated = await onDataSend(inputValue, currentPW);
                if (updated) {
                    updatePwChangeRequired(false);
                    setChangingPassword(false);
                }
                else {
                    console.log('try again');
                    window.alert('Please check passwords and try again.');
                    /**
                     * insert error messaging here
                     */
                }
            }
            else {
                console.log('get ya passwords matching');
                window.alert('Please make sure your new passwords match and try again.');
                /**
                 * insert error messaging here
                 */
            }
        }
        else {
            setChangingPassword(true);
        }
    };

    const handleKeyUp = (e) => {
        const inputGroup = e.target.closest('.changing-pw');
        if (e.key === 'Enter') {
            inputGroup.querySelector('button').click();
        }
    }

    return (
        <>
            { required ?
                <div className="change-pw-modal-container changing-pw">
                    <div className="change-pw-modal">
                        <h2>Please reset your password immediately.</h2>
                        { changingPassword ?
                            <>
                                <input id="new-pw-1" required={true} type="password" placeholder="new password" onKeyUp={(e) => {handleKeyUp(e)}} />
                                <input id="new-pw-2" required={true} type="password" placeholder="repeat it" onKeyUp={(e) => {handleKeyUp(e)}} />
                            </>
                            :
                            ''
                        }
                        <button id="changePW" className="modal-btn" onClick={(e) => {handleClick(e, false)}}>Change Password</button>
                    </div>
                </div>
            :
                <div className="changing-pw pw-change-inline">
                    { changingPassword ?
                        <>
                            <div className="input-group current-pw">
                                <label>Current password</label>
                                <input id="current-pw" required={true} type="password" placeholder="current password" onKeyUp={(e) => {handleKeyUp(e)}} />
                            </div>
                            <div className="input-group new-pw-1">
                                <label>New password</label>
                                <input id="new-pw-1" required={true} type="password" placeholder="new password" onKeyUp={(e) => {handleKeyUp(e)}} />
                            </div>
                            <div className="input-group new-pw-2">
                                <label>New password again</label>
                                <input id="new-pw-2" required={true} type="password" placeholder="repeat new password" onKeyUp={(e) => {handleKeyUp(e)}} />
                            </div>
                        </>
                        :
                        ''
                    }
                    <button id="changePW" onClick={(e) => {handleClick(e)}}>Change Password</button>
                </div>
            }
        </>
    );
}