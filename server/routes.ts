import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertBookingSchema, insertQuoteSchema, loginSchema, registerSchema } from "@shared/schema";
import { ObjectStorageService } from "./objectStorage";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "my-jantes-secret-key";

// Middleware for authentication
const authenticateToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await storage.getUser(decoded.userId);
    if (!user) {
      return res.sendStatus(401);
    }
    req.user = user;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth endpoints
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ error: "Email déjà utilisé" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      
      // Create user
      const user = await storage.createUser({
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
      });

      // Generate token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      res.json({
        user: { ...user, password: undefined },
        token,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ error: "Erreur lors de l'inscription" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      // Find user
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.status(401).json({ error: "Email ou mot de passe incorrect" });
      }

      // Check password
      const isValidPassword = await bcrypt.compare(validatedData.password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Email ou mot de passe incorrect" });
      }

      // Generate token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      res.json({
        user: { ...user, password: undefined },
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(400).json({ error: "Erreur lors de la connexion" });
    }
  });

  app.get("/api/auth/me", authenticateToken, async (req, res) => {
    const user = (req as any).user;
    res.json({ ...user, password: undefined });
  });

  app.post("/api/auth/logout", authenticateToken, async (req, res) => {
    res.json({ message: "Déconnecté avec succès" });
  });

  // Profile endpoints
  app.put("/api/profile", authenticateToken, async (req, res) => {
    try {
      const user = (req as any).user;
      const updates = req.body;
      
      const updatedUser = await storage.updateUser(user.id, updates);
      res.json({ ...updatedUser, password: undefined });
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({ error: "Erreur lors de la mise à jour" });
    }
  });

  // Services endpoints
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      console.error("Services error:", error);
      res.status(500).json({ error: "Erreur lors de la récupération des services" });
    }
  });

  // Bookings endpoints
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.json(booking);
    } catch (error) {
      console.error("Booking creation error:", error);
      res.status(400).json({ error: "Erreur lors de la création de la réservation" });
    }
  });

  app.get("/api/bookings/user/:userId", authenticateToken, async (req, res) => {
    try {
      const user = (req as any).user;
      const bookings = await storage.getBookingsByUserId(user.id);
      res.json(bookings);
    } catch (error) {
      console.error("Bookings retrieval error:", error);
      res.status(500).json({ error: "Erreur lors de la récupération des réservations" });
    }
  });

  // Quotes endpoints
  app.post("/api/quotes", async (req, res) => {
    try {
      const validatedData = insertQuoteSchema.parse(req.body);
      const quote = await storage.createQuote(validatedData);
      res.json(quote);
    } catch (error) {
      console.error("Quote creation error:", error);
      res.status(400).json({ error: "Erreur lors de la création du devis" });
    }
  });

  app.get("/api/quotes/user/:userId", authenticateToken, async (req, res) => {
    try {
      const user = (req as any).user;
      const quotes = await storage.getQuotesByUserId(user.id);
      res.json(quotes);
    } catch (error) {
      console.error("Quotes retrieval error:", error);
      res.status(500).json({ error: "Erreur lors de la récupération des devis" });
    }
  });

  app.post("/api/quotes/:id/accept", authenticateToken, async (req, res) => {
    try {
      const user = (req as any).user;
      const quoteId = req.params.id;
      
      const quote = await storage.getQuote(quoteId);
      if (!quote || quote.userId !== user.id) {
        return res.status(404).json({ error: "Devis non trouvé" });
      }

      // Update quote status
      await storage.updateQuote(quoteId, { status: "accepted" });

      // Create invoice
      const invoiceNumber = `INV-${Date.now()}`;
      await storage.createInvoice({
        userId: user.id,
        quoteId: quoteId,
        invoiceNumber,
        amount: quote.amount || "0",
      });

      res.json({ message: "Devis accepté et facture créée" });
    } catch (error) {
      console.error("Quote acceptance error:", error);
      res.status(500).json({ error: "Erreur lors de l'acceptation du devis" });
    }
  });

  // Invoices endpoints
  app.get("/api/invoices/user/:userId", authenticateToken, async (req, res) => {
    try {
      const user = (req as any).user;
      const invoices = await storage.getInvoicesByUserId(user.id);
      res.json(invoices);
    } catch (error) {
      console.error("Invoices retrieval error:", error);
      res.status(500).json({ error: "Erreur lors de la récupération des factures" });
    }
  });

  // Object storage endpoints for image uploads
  app.post("/api/objects/upload", async (req, res) => {
    try {
      const objectStorageService = new ObjectStorageService();
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      res.json({ uploadURL });
    } catch (error) {
      console.error("Upload URL generation error:", error);
      res.status(500).json({ error: "Erreur lors de la génération de l'URL d'upload" });
    }
  });

  app.put("/api/quote-images", async (req, res) => {
    try {
      const { imageURL } = req.body;
      if (!imageURL) {
        return res.status(400).json({ error: "imageURL is required" });
      }

      const objectStorageService = new ObjectStorageService();
      const objectPath = await objectStorageService.trySetObjectEntityAclPolicy(
        imageURL,
        {
          owner: "public", // For public quote images
          visibility: "public",
        }
      );

      res.json({ objectPath });
    } catch (error) {
      console.error("Error setting quote image ACL:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Serve uploaded images
  app.get("/objects/:objectPath(*)", async (req, res) => {
    try {
      const objectStorageService = new ObjectStorageService();
      const objectFile = await objectStorageService.getObjectEntityFile(req.path);
      objectStorageService.downloadObject(objectFile, res);
    } catch (error) {
      console.error("Error serving object:", error);
      res.status(404).json({ error: "File not found" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
