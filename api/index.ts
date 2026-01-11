import "dotenv/config";
import { createServer } from 'http';
import express, { type Request, Response, type Express } from 'express';
import { z } from 'zod';
import { AccessToken } from 'livekit-server-sdk';
import type { Server } from 'http';

// --- Shared Schema (Inline) ---
const insertContactRequestSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    companyName: z.string().min(1, "Company name is required"),
    message: z.string().optional(),
});

type InsertContactRequest = z.infer<typeof insertContactRequestSchema>;

type ContactRequest = InsertContactRequest & {
    id: number;
    createdAt: Date;
};

// --- Shared Routes Config (Inline) ---
const errorSchemas = {
    validation: z.object({
        message: z.string(),
        field: z.string().optional(),
    }),
    internal: z.object({
        message: z.string(),
    }),
};

const apiRouteConfig = {
    contact: {
        create: {
            method: 'POST' as const,
            path: '/api/contact',
            input: insertContactRequestSchema,
            responses: {
                201: z.custom<ContactRequest>(),
                400: errorSchemas.validation,
            },
        },
    },
};

// --- Storage (Inline) ---
interface IStorage {
    createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
}

class MemStorage implements IStorage {
    private requests: Map<number, ContactRequest>;
    private currentId: number;

    constructor() {
        this.requests = new Map();
        this.currentId = 1;
    }

    async createContactRequest(request: InsertContactRequest): Promise<ContactRequest> {
        const id = this.currentId++;
        const newItem: ContactRequest = {
            ...request,
            id,
            createdAt: new Date(),
        };
        this.requests.set(id, newItem);
        return newItem;
    }
}

const storage = new MemStorage();

// --- Main App Logic ---

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check route for debugging
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

async function registerRoutes(httpServer: Server, app: Express) {
    // Contact Request Route
    app.post(apiRouteConfig.contact.create.path, async (req, res) => {
        try {
            const input = apiRouteConfig.contact.create.input.parse(req.body);
            const request = await storage.createContactRequest(input);

            // Send to Webhook
            try {
                const webhookUrl = 'http://88.222.214.250:5678/webhook/demoRequest';
                await fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(input),
                });
                console.log(`Successfully sent contact request ${request.id} to webhook`);
            } catch (webhookError) {
                console.error('Failed to send contact request to webhook:', webhookError);
                // We don't block the response if the webhook fails, avoiding user-facing error
            }

            res.status(201).json(request);
        } catch (err) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({
                    message: err.errors[0].message,
                    field: err.errors[0].path.join('.'),
                });
            }
            throw err;
        }
    });

    // LiveKit Connection Details Route
    app.get("/api/connection-details", async (req, res) => {
        try {
            const apiKey = process.env.LIVEKIT_API_KEY;
            const apiSecret = process.env.LIVEKIT_API_SECRET;
            const wsUrl = process.env.LIVEKIT_URL;

            if (!apiKey || !apiSecret || !wsUrl) {
                return res.status(500).json({ error: "Server misconfigured" });
            }

            const participantName = "User-" + Math.floor(Math.random() * 10000);
            const roomName = "voice-assistant-demo-" + Math.floor(Math.random() * 10000);

            const at = new AccessToken(apiKey, apiSecret, {
                identity: participantName,
            });

            at.addGrant({ roomJoin: true, room: roomName });

            const token = await at.toJwt();

            res.json({
                serverUrl: wsUrl,
                token: token,
                participantName,
                roomName,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Could not generate token" });
        }
    });
}

// Initialize logic
let routesRegistered = false;

const initRoutes = async () => {
    if (!routesRegistered) {
        try {
            await registerRoutes(httpServer, app);
            routesRegistered = true;
        } catch (err) {
            console.error("Failed to register routes:", err);
            throw err;
        }
    }
};

export default async function handler(req: Request, res: Response) {
    // Short-circuit for health check to ensure it ALWAYS returns
    if (req.url === '/api/health' || req.originalUrl === '/api/health') {
        return app(req, res);
    }

    try {
        await initRoutes();
        return app(req, res);
    } catch (err: any) {
        console.error("API Handler Error:", err);
        res.status(500).json({
            error: "Internal Server Error",
            details: err.message
        });
    }
}
