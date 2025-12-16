import { NextRequest } from "next/server";

const GET = (async (req: NextRequest) => {
    const url = req.nextUrl.searchParams.get("url");
    if (!url) {
        return new Response("Missing url parameter", { status: 400 });
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: req.headers
    });
    const data = await response.text();
    return new Response(data, {
        status: response.status,
        headers: {
            'Content-Type': response.headers.get('Content-Type') || 'text/html',
            ...response.headers.entries().reduce((acc, [key, value]) => {
                if (key.toLowerCase() !== 'content-encoding' && key.toLowerCase() !== 'content-length') {
                    acc[key] = value;
                }
                return acc;
            }, {} as Record<string, string>)
        }
    });
});

export { GET };