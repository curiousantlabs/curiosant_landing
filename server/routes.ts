import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "../shared/routes";
import { z } from "zod";
import { AccessToken } from "livekit-server-sdk";


export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const request = await storage.createContactRequest(input);
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

  return httpServer;
}
