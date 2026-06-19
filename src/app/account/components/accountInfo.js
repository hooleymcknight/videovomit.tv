'use client';

export default function AccountInfo({ session, onDataSend }) {

    return (
        <>
            <div id="acct-info-section"
                className="flex justify-between mb-[10px]"
                data-section="username"
            >
                <h3 className="text-[20px]">Username:</h3>
                <p>{session.user.username}</p>
            </div>
            <div className="acct-info-section" data-section="name">
                <h3 className="text-[20px]">Name:</h3>
                <p>{session.user.fname} {session.user.lname}</p>
            </div>
            <div className="acct-info-section" data-section="email">
                <h3 className="text-[20px]">Email:</h3>
                <p>{session.user.email}</p>
            </div>
            
        </>
    );
}