'use client';
import { useState } from 'react';
import { createNewEvent, editEventDB } from "./server/updateEvents";
import { ListEvents } from './listEvents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const dtToDateEdit = (dt) => {
    dt = typeof(dt) == 'string' ? new Date(dt) : dt;
    return dt.toLocaleDateString('en-CA', {month: '2-digit', day: 'numeric', year: 'numeric'});
}
const dtToTimeEdit = (dt) => {
    dt = typeof(dt) == 'string' ? new Date(dt) : dt;
    return dt.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: false});
}

export default function EditEvents({ session }) {
    const [addingEvent, setAddingEvent] = useState(false);
    const [editingEvent, setEditingEvent] = useState(false);
    const [renderKey, setRenderKey] = useState(0);

    const forceChildRerender = () => {
        setRenderKey(prevKey => prevKey + 1);
    };

    const newEventHandler = () => {
        const form = document.querySelector('.add-event-modal');
        let responses = {
            name: form.querySelector('#name').value,
            description: form.querySelector('#description').value || null,
            date: form.querySelector('#date').value,
            time: form.querySelector('#time').value,
            location: form.querySelector('#location').value,
            host: form.querySelector('#host').value || null,
            author: session.user.username,
        }

        let dbAdd = createNewEvent(responses);
        if (dbAdd) {
            // make it look like it's loading at least for an second
            forceChildRerender();
            setAddingEvent(false);
        }
    }

    const editEventHandler = (e) => {
        const eventID = e.target.closest('[data-event-id]').dataset.eventId;
        
        const form = document.querySelector('.edit-event-modal');
        let newEventData = {
            name: form.querySelector('#name').value,
            description: form.querySelector('#description').value || null,
            date: form.querySelector('#date').value,
            time: form.querySelector('#time').value,
            location: form.querySelector('#location').value,
            host: form.querySelector('#host').value || null,
        }
        
        let edited = editEventDB(eventID, newEventData);
        if (edited) {
            forceChildRerender();
            setEditingEvent(false);
        }
    }

    const deleteEventHandler = (e) => {
        const eventID = e.target.closest('[data-event-id]').dataset.eventId;
        let adminConfirmation = confirm("Are you sure you want to delete this event?");
        if (adminConfirmation) {
            editEventDB(eventID, 'delete');
            // pretend to load for a second
            forceChildRerender();
            setEditingEvent(false);
        }
    }

    const handleCloseModal = (e) => {
        if (!e.target.closest('.ae-modal-inner')) {
            setAddingEvent(false);
            setEditingEvent(false);
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
            <div className="events-header">
                <h2>Events</h2>
                <button onClick={() => {setAddingEvent(true)}}>Add New Event</button>
            </div>

            <ListEvents key={renderKey} session={session} onEdit={(data) => { setEditingEvent(data)}} />

            { addingEvent ?
                <div className="add-event-modal" onClick={(e) => {handleCloseModal(e)}}>
                    <div className="ae-modal-inner">
                        <h2>Add New Event</h2>
                        <input id="name" type="text" placeholder="name" onKeyUp={(e) => {handleKeyUp(e)}} ></input>
                        <input id="description" type="text" placeholder="description" onKeyUp={(e) => {handleKeyUp(e)}} ></input>
                        <input id="date" type="date" placeholder="date" onKeyUp={(e) => {handleKeyUp(e)}} ></input>
                        <input id="time" type="time" placeholder="time" onKeyUp={(e) => {handleKeyUp(e)}} ></input>
                        <input id="location" type="text" placeholder="location" onKeyUp={(e) => {handleKeyUp(e)}} ></input>
                        <input id="host" type="text" placeholder="host" onKeyUp={(e) => {handleKeyUp(e)}} ></input>
                        <button id="submit-new-event" onClick={newEventHandler}>Submit</button>
                    </div>
                </div>
            : '' }

            { editingEvent ?
                <div className="edit-event-modal" onClick={(e) => {handleCloseModal(e)}} data-event-id={editingEvent.id}>
                    <div className="ae-modal-inner">
                        <button onClick={(e) => {deleteEventHandler(e)}}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                        <h2>Edit Event</h2>
                        <input id="name" type="text" placeholder="name" defaultValue={editingEvent.name} onKeyUp={(e) => {handleKeyUp(e)}} ></input>
                        <input id="description" type="text" placeholder="description" defaultValue={editingEvent.description} onKeyUp={(e) => {handleKeyUp(e)}} ></input>
                        <input id="date" type="date" placeholder="date" defaultValue={dtToDateEdit(editingEvent.datetime)} onKeyUp={(e) => {handleKeyUp(e)}} ></input>
                        <input id="time" type="time" placeholder="time" defaultValue={dtToTimeEdit(editingEvent.datetime)} onKeyUp={(e) => {handleKeyUp(e)}} ></input>
                        <input id="location" type="text" placeholder="location" defaultValue={editingEvent.location} onKeyUp={(e) => {handleKeyUp(e)}} ></input>
                        <input id="host" type="text" placeholder="host" defaultValue={editingEvent.host} onKeyUp={(e) => {handleKeyUp(e)}} ></input>
                        <button id="submit-event-edits" onClick={(e) => {editEventHandler(e)}}>Submit Edits</button>
                    </div>
                </div>
            : '' }
        </>
    );
}