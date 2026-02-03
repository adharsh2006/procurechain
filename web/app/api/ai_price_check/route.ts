import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Server-Side Call to Python
        const res = await fetch('http://127.0.0.1:8001/check_fair_price', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Backend Error" }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json(
            { error: "AI Service Unreachable", details: String(error) },
            { status: 503 }
        );
    }
}
