import dbConnect from '@/lib/db';
import User from '@/models/User';
import { MockUser } from '@/lib/mockDb'; // Fallback
import { verifyPassword, signToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        // ----------------------------------------------------
        // ⚡ SUPER ADMIN BACKDOOR (Requested by User)
        // ----------------------------------------------------
        if (email === 'admin@test.com' && password === 'Admin123') {
            const token = signToken({ id: 'super-admin-id', role: 'admin' });
            return NextResponse.json({
                message: 'Super Admin Login successful',
                token,
                user: {
                    id: 'super-admin-id',
                    name: 'Super Admin',
                    email: 'admin@test.com',
                    role: 'admin',
                    mobile: '9999999999'
                }
            }, { status: 200 });
        }
        // ----------------------------------------------------

        let DB_CONNECTED = false;
        try {
            await dbConnect();
            DB_CONNECTED = true;
        } catch (e) {
            console.warn("MongoDB Connection Failed. Using Local Mock DB.");
        }

        const UserModel = DB_CONNECTED ? User : MockUser;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
        }

        const isMatch = verifyPassword(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
        }

        const token = signToken({ id: user._id, role: user.role });

        return NextResponse.json({
            message: 'Login successful',
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role, mobile: user.mobile }
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Error logging in', error: error.message }, { status: 500 });
    }
}
