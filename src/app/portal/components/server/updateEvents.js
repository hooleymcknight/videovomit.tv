'use server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
const db = new PrismaClient();

/* new event */
async function addEventDB(inputData) {
    let dt = `${inputData.date} ${inputData.time}`;

    const insertEventData = await db.events.create({
        data: {
            name: inputData.name,
            description: inputData.description,
            datetime: new Date(dt).toISOString(),
            location: inputData.location,
            host: inputData.host,
            author: inputData.author,
        }
    });
}

export async function createNewEvent(data) {
    addEventDB(data)
        .then(() => {
            return true;
        })
        .catch((e) => {
            console.error(e);
        });
}

/* edit/delete event */
export async function editEventDB(eventID, newData) {
    if (newData === 'delete') {
        console.log('delete this event', eventID);
        const deleteEvent = await db.events.delete({
            where: {
                id: Number(eventID)
            }
        });
    }
    else {
        let dt = `${newData.date} ${newData.time}`;

        const editedEvent = await db.events.update({
            where: {
                id: Number(eventID)
            },
            data: {
                name: newData.name,
                description: newData.description,
                datetime: new Date(dt).toISOString(),
                location: newData.location,
                host: newData.host,
            }
        })
        .then(() => {
            return true;
        })
        .catch((e) => {
            console.error(e);
        });
    }
}

/* list events */
export async function collectEvents() {
    let today = new Date();
    const events = await db.events.findMany({
        where: {
            datetime: {
                gte: today
            }
        },
        orderBy: {
            datetime: 'asc',
        }
    });
    return events;
}