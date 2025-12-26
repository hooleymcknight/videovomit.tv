'use server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
const db = new PrismaClient();

/* register new user */
async function validateNewUser(data) {
    const duplicateEmail = await db.users.findMany({
        where: {
            email: data.email,
        }
    });

    // if duplicate email, we won't even get here.
    const duplicateUN = await db.users.findMany({
        where: {
            username: data.username,
        }
    });
    console.log('find first email:')
    console.log(duplicateEmail)

    console.log('find first un:')
    console.log(duplicateUN)

    if (duplicateEmail && duplicateUN) {
        return 'This username and email have already been used. Please try with different user info.';
    }
    else if (duplicateEmail) {
        return 'This email has already been used. Please try another email.';
    }
    else if (duplicateUN) {
        return 'This email has already been used. Please try another email.';
    }

    // if no duplicates, then we can return false.
    return false;
}

export async function registerUser (userData) {
    const duplicateData = await validateNewUser(userData);

    if (!duplicateData) {
        const hashedPassword = bcrypt.hashSync(userData.password, salt);
        const addUser = await db.users.create({
            data: {
                username: userData.username,
                password: hashedPassword,
                type: 'user',
                fname: userData.fname,
                lname: userData.lname,
                email: userData.email,
            }
        })
        .then(() => {
            return true;
        })
        .catch((e) => {
            console.error(e);
            return 'There has been an unknown error. Please refresh and try again.'
        });
    }
    else {
        return duplicateData;
    }
}