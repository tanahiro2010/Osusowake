import { SignJWT, jwtVerify, decodeJwt } from 'jose';

const ALG = 'HS256';

function getSecret(): Uint8Array {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('Missing JWT_SECRET environment variable');
    return new TextEncoder().encode(secret);
}

export type JwtPayload = Record<string, unknown>;

/**
 * Sign a JWT using HS256.
 * @param payload Arbitrary payload (keep small)
 * @param expiresIn Expiration time (e.g. '2h', '15m', or numeric seconds)
 */
export async function signJwt(payload: JwtPayload, expiresIn: string | number = '2h'): Promise<string> {
    const secret = getSecret();
    const signer = new SignJWT(payload as Record<string, unknown>)
        .setProtectedHeader({ alg: ALG, typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime(expiresIn);

    return signer.sign(secret);
}

/**
 * Verify a JWT and return its payload, or null if invalid.
 */
export async function verifyJwt<T extends JwtPayload = JwtPayload>(token: string): Promise<T | null> {
    try {
        const { payload } = await jwtVerify(token, getSecret(), { algorithms: [ALG] });
        return payload as T;
    } catch (e) {
        console.error("JWT verification failed:", e);
        return null;
    }
}

/**
 * Decode a JWT without verifying its signature. Useful for quick reads.
 */
export function decodeJwtUnsafe<T extends JwtPayload = JwtPayload>(token: string): T | null {
    try {
        return decodeJwt(token) as T;
    } catch (e) {
        console.error("JWT decoding failed:", e);
        return null;
    }
}

/**
 * Helper: attempt to send a small beacon-friendly payload (URLSearchParams) to tracking endpoint.
 * This is a convenience for client-side usage together with `sendBeacon`.
 */
export function buildTrackerPayload(id: string) {
    return new URLSearchParams({ id });
}

const jwt = {
    signJwt,
    verifyJwt,
    decodeJwtUnsafe,
    buildTrackerPayload,
};

export default jwt;
