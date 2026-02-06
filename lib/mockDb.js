
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(process.cwd(), 'data', 'users.json');

// Ensure data directory exists
if (!fs.existsSync(path.dirname(DB_FILE))) {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
}

function getUsers() {
    if (!fs.existsSync(DB_FILE)) return [];
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data || '[]');
}

function saveUser(user) {
    const users = getUsers();
    users.push(user);
    fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
    return user;
}

function findUserByEmail(email) {
    const users = getUsers();
    return users.find(u => u.email === email);
}

export const MockUser = {
    findOne: async ({ email }) => findUserByEmail(email),
    create: async (userData) => {
        const newUser = { ...userData, _id: Date.now().toString(), role: 'user' };
        return saveUser(newUser);
    }
};
