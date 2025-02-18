import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const createReferral = (userId) => 
    api.post('/referral/create', { userId });

export const useReferral = (referralCode) =>
    api.post('/referral/use', { referralCode });

export const enterRaffle = (userId, raffleId) =>
    api.post('/raffle/enter', { userId, raffleId });