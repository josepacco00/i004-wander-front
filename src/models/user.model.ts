export interface User {
    _id: string,
    name: string
    email: string,
    passwordHash: string,
    role: 'tourist' | 'provider',
    preferences: string[],
    location: string,
    createdAt: Date,
    bookings: string[]
}

// Preferences se moverá al profile
// Location hay que decidir cómo implementarlo
export interface NewUser {
    name: string
    email: string,
    password: string,
    confirmPassword: string,
    role: 'tourist' | 'provider',
    // preferences: string[],
    // location: string,
}