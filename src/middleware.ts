import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const res = NextResponse.next();

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.headers.append('Access-Control-Allow-Credentials', 'true');
        res.headers.append('Access-Control-Allow-Origin', '*'); // replace with your actual origin in production
        res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
        res.headers.append(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        );
        return res;
    }

    // Add CORS headers to the response
    res.headers.append('Access-Control-Allow-Credentials', 'true');
    res.headers.append('Access-Control-Allow-Origin', '*'); // replace with your actual origin in production
    res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
    res.headers.append(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    return res;
}

export const config = {
    matcher: '/api/:path*',
};