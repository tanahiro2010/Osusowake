import { NextRequest, NextResponse } from "next/server";
import { User } from "better-auth";
import { unauthorized } from "./helpers/response";
import { auth } from "./auth";

type Ctx = { params?: Record<string, string | string[]> };

export const withAuth = async <T extends Ctx>(
    req: NextRequest,
    handler: (auth: { user: User }, ctx: T) => Promise<NextResponse>,
    context?: { params?: Promise<T["params"]> }
) => {
    const [session, params] = await Promise.all([
        auth.api.getSession({ headers: req.headers }),
        context?.params ?? Promise.resolve({} as T["params"]),
    ]);

    if (!session?.user) return unauthorized("Unauthorized");

    return handler({ user: session.user }, { params } as T);
};