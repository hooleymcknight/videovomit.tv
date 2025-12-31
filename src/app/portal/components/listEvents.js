import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from '@/app/SessionProvider';
import { collectEvents } from '../components/server/updateEvents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

const dtToDate = (dt) => {
    dt = typeof(dt) == 'string' ? new Date(dt) : dt;
    return dt.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
}
const dtToTime = (dt) => {
    dt = typeof(dt) == 'string' ? new Date(dt) : dt;
    return dt.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true, timeZoneName: 'short'});
}

export const ListEvents = ({ session, onEdit }) => {
    const [events, setEvents] = useState([]);
    const { updateSession } = useSession();
    const sessionData = useSession().sessionData;
    const isAdmin = sessionData?.user?.type;
    const pathname = usePathname();

    const editEventHandler = (e) => {
        const eventElement = e.target.closest('.event-listing');
        let eventData = JSON.parse(eventElement.dataset.json);
        onEdit(eventData);
    }

    useEffect(() => {
        async function fetchEvents() {
            const eventsData = await collectEvents();
            updateSession({ events: { eventsData } });
            setEvents(eventsData);
        }
        
        fetchEvents();
    }, []);

    return (
        <div className="events-list">
            {events.length ? 
                events.map((x, index) =>
                    <div className="event-listing" key={index} data-event-id={x.id} data-json={JSON.stringify(x)} >
                        <h3>{x.name}</h3>
                        { isAdmin ? 
                            <>
                                <button onClick={(e) => {editEventHandler(e)}}>
                                    <FontAwesomeIcon icon={faPencil} />
                                </button>
                            </>
                        :''}
                        <label className="l-date">Date</label>
                        <p className="date">{dtToDate(x.datetime)}</p>
                        <label className="l-time">Time</label>
                        <p className="time">{dtToTime(x.datetime)}</p>
                        <label className="l-location">Location</label>
                        <p className="location">{x.location}</p>
                        <label className="l-desc">Description</label>
                        <p className="desc">{x.description}</p>
                        <label className="l-host">Host</label>
                        <p className="host">{x.host}</p>
                        { isAdmin ? 
                            <>
                                <label className="l-author">Author</label>
                                <p className="author">{x.author}</p>
                            </>
                        :''}
                    </div>
                )
            :
                <div className="no-events">
                    <h3>There are no events scheduled yet.</h3>
                    { pathname === '/events' ?
                        <p>You can suggest an event through our <a href="/contact" alt="contact us page">contact form</a>.</p>
                    :
                        <p>You can add events here.</p>
                    }
                </div>
            }
        </div>
    );
}