import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertContactSubmissionSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // GET: All doors
  app.get("/api/doors", async (_req: Request, res: Response) => {
    try {
      const doors = await storage.getDoors();
      res.json(doors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch doors" });
    }
  });

  // GET: Door by ID
  app.get("/api/doors/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const door = await storage.getDoorById(id);
      if (!door) {
        return res.status(404).json({ message: "Door not found" });
      }
      
      res.json(door);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch door" });
    }
  });
  
  // GET: All collections (with optional featured filter)
  app.get("/api/collections", async (req: Request, res: Response) => {
    try {
      const featuredOnly = req.query.featured === "true";
      const collections = await storage.getCollections(featuredOnly);
      res.json(collections);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch collections" });
    }
  });
  
  // GET: Collection by ID
  app.get("/api/collections/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const collection = await storage.getCollectionById(id);
      if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
      }
      
      res.json(collection);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch collection" });
    }
  });
  
  // GET: All testimonials
  app.get("/api/testimonials", async (_req: Request, res: Response) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  
  // POST: Contact form submission
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const submission = insertContactSubmissionSchema.parse({
        ...req.body,
        createdAt: new Date().toISOString(),
      });
      
      const result = await storage.createContactSubmission(submission);
      res.status(201).json({ message: "Contact form submitted successfully", id: result.id });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
