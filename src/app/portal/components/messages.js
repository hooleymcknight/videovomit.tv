'use client';
import { collectMessages, markAsRead, markAsReplied, deleteMessage } from "./server/updateMessages";
import { useSession } from '@/app/SessionProvider';
import { faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

const dtToDate = (dt) => {
    dt = typeof(dt) == 'string' ? new Date(dt) : dt;
    return dt.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
}
const dtToTime = (dt) => {
    dt = typeof(dt) == 'string' ? new Date(dt) : dt;
    return dt.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true, timeZoneName: 'short'});
}

export default function Messages({ session }) {
    const [messages, setMessages] = useState([]);
    const [activeMessage, setActiveMessage] = useState(null);
    const { updateSession } = useSession();

    const openMessage = (e) => {
        const messageData = JSON.parse(e.target.closest('.message-listing').dataset.message);
        markAsRead(messageData, 1);
        setActiveMessage(messageData);
    }

    const handleMarkReplied = (e) => {
        const message = JSON.parse(e.target.closest('.active-message').dataset.message);
        const checkbox = e.target.closest('button.mark-as-replied').querySelector('input[type="checkbox"]');
        const currentValue = checkbox.checked;
        checkbox.checked = !currentValue;
        markAsReplied(message, currentValue ? 0 : 1);
    }

    const handleDelete = (e) => {
        const message = JSON.parse(e.target.closest('.active-message').dataset.message);
        let deleteConfirmation = confirm("Are you sure you want to permanently delete this message?");
        if (deleteConfirmation) {
            deleteMessage(message);
            setActiveMessage(null);
        }
    }

    useEffect(() => {
        async function fetchMessages() {
            const messagesData = await collectMessages();
            updateSession({ messages: { messagesData } });
            setMessages(messagesData);
        }
        
        fetchMessages();
    }, [activeMessage]);

    return (
        <>
            <div className="messages">
                {messages.length ?
                    <>
                        <h2>Unread Messages</h2>
                        {messages.filter(x => !x.read).length ? 
                            messages.filter(x => !x.read).map(x => 
                                <button key={x.datetime} data-message={JSON.stringify(x)} className="message-listing" onClick={(e) => { openMessage(e) }}>
                                    <h3>{x.name}</h3>
                                    <p className="email">{x.email}</p>
                                    <p className="date">{`${dtToDate(x.datetime)} ${dtToTime(x.datetime)}`}</p>
                                    <p className="read">Read? {x.read ? 'Yes' : 'No'}</p>
                                    <p className="replied">Replied? {x.replied ? 'Yes' : 'No'}</p>
                                </button>
                            )
                            :
                            <p style={{ marginBottom: '24px', }}>There are no unread messages.</p>
                        }

                        {messages.filter(x => x.read).length ? 
                            <>
                                <h2 style={{ marginTop: '56px', }}>Read Messages</h2>
                                {messages.filter(x => x.read).map(x => 
                                    <button key={x.datetime} data-message={JSON.stringify(x)} className="message-listing" onClick={(e) => { openMessage(e) }}>
                                        <h3>{x.name}</h3>
                                        <p className="email">{x.email}</p>
                                        <p className="date">{`${dtToDate(x.datetime)} ${dtToTime(x.datetime)}`}</p>
                                        <p className="read">Read? {x.read ? 'Yes' : 'No'}</p>
                                        <p className="replied">Replied? {x.replied ? 'Yes' : 'No'}</p>
                                    </button>
                                )}
                            </>
                            :
                            ''
                        }
                    </>
                :
                    <p>There are currently no messages.</p>
                }
            </div>
            { activeMessage ?
                <div className="active-message" data-message={JSON.stringify(activeMessage)}>
                    <h3>From:&nbsp;&nbsp;{activeMessage.name} <span className="email">({activeMessage.email})</span></h3>
                    <p className="date">{`${dtToDate(activeMessage.datetime)} ${dtToTime(activeMessage.datetime)}`}</p>

                    <p className="message">
                        {activeMessage.message}
                    </p>

                    <button className="mark-as-unread" onClick={(e) => { markAsRead(JSON.parse(e.target.closest('.active-message').dataset.message), 0); setActiveMessage(null); }}>Mark unread?</button>
                    <button className="mark-as-replied" onClick={(e) => { handleMarkReplied(e) }}>
                        Mark replied?
                        <input type="checkbox" defaultChecked={activeMessage.replied} />
                    </button>

                    <button className="close" onClick={(e) => { setActiveMessage(null) } }>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <button className="trash" onClick={ (e) => { handleDelete(e) }}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>
            : ''
            }
        </>
    );
}