'use server';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

/* messages */

export async function collectMessages() {
    const messages = await db.messages.findMany({
        orderBy: {
            datetime: 'asc',
        }
    });
    return messages;
}

export async function markAsRead(message, value) {
    const markedRead = await db.messages.update({
        where: {
            id: message.id,
        },
        data: {
            read: value,
        }
    });
}

export async function markAsReplied(message, value) {
    const markedReplied = await db.messages.update({
        where: {
            id: message.id,
        },
        data: {
            replied: value,
        }
    });
}

export async function deleteMessage(message) {
    const deletedMessage = await db.messages.delete({
        where: {
            id: message.id,
        }
    });
}

async function addMessageDB(inputData) {
    const insertMessageData = await db.messages.create({
        data: {
            name: inputData.name,
            email: inputData.email,
            message: inputData.message,
            datetime: new Date().toISOString(),
            read: 0,
            replied: 0,
        }
    });
}

export async function insertNewMessage(data) {
    addMessageDB(data)
        .then(() => {
            return true;
        })
        .catch((e) => {
            console.error(e);
        });
}