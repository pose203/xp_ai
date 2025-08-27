import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('https://api.github.com/users/pose203/repos');
        const data = await response.json();
        return NextResponse.json(data);
    } catch(error) {
        console.error('Error fetching repos:', error);
        return NextResponse.json({error: 'Failed to fetch repos'}, {status: 500});
    }
}

