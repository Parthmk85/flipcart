import dbConnect from '@/lib/db';
import User from '@/models/User';
import { MockUser } from '@/lib/mockDb'; // Fallback
import { hashPassword } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, password, mobile } = body;

        let DB_CONNECTED = false;
        try {
            await dbConnect();
            DB_CONNECTED = true;
        } catch (e) {
            console.warn("MongoDB Connection Failed (Firewall Blocked). Switching to Local Mock DB.");
        }

        // Select Provider
        const UserModel = DB_CONNECTED ? User : MockUser;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = hashPassword(password);

        // Automatically assign Admin role for this specific email
        const role = email === 'admin@test.com' ? 'admin' : 'user';

        await UserModel.create({
            name,
            email,
            password: hashedPassword,
            mobile,
            role
        });

        return NextResponse.json({
            message: DB_CONNECTED ? 'User created in MongoDB' : 'User created in Local DB (Offline Mode)',
            success: true
        }, { status: 201 });

    } catch (error) {
        console.error("Signup Error:", error);
        return NextResponse.json({ message: error.message || 'Error creating user' }, { status: 500 });
    }
}
