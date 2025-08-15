import { type User, type InsertUser, type Booking, type InsertBooking, type Quote, type InsertQuote, type Service, type InsertService, type Invoice, type InsertInvoice } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User>;

  // Services
  getAllServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;

  // Bookings
  getBookingsByUserId(userId: string): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: string, updates: Partial<Booking>): Promise<Booking>;

  // Quotes
  getQuotesByUserId(userId: string): Promise<Quote[]>;
  getQuote(id: string): Promise<Quote | undefined>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  updateQuote(id: string, updates: Partial<Quote>): Promise<Quote>;

  // Invoices
  getInvoicesByUserId(userId: string): Promise<Invoice[]>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  updateInvoice(id: string, updates: Partial<Invoice>): Promise<Invoice>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private services: Map<string, Service>;
  private bookings: Map<string, Booking>;
  private quotes: Map<string, Quote>;
  private invoices: Map<string, Invoice>;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.bookings = new Map();
    this.quotes = new Map();
    this.invoices = new Map();

    // Initialize default services
    this.initializeServices();
  }

  private initializeServices() {
    const defaultServices: Service[] = [
      {
        id: "renovation",
        name: "Rénovation",
        description: "Remise à neuf complète de vos jantes en aluminium",
        basePrice: "150.00",
      },
      {
        id: "personnalisation",
        name: "Personnalisation",
        description: "Customisation selon vos goûts et couleurs préférées",
        basePrice: "200.00",
      },
      {
        id: "devoilage",
        name: "Dévoilage",
        description: "Redressage professionnel de jantes voilées",
        basePrice: "80.00",
      },
      {
        id: "decapage",
        name: "Décapage",
        description: "Décapage chimique pour une base parfaite",
        basePrice: "60.00",
      },
    ];

    defaultServices.forEach(service => {
      this.services.set(service.id, service);
    });
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      address: insertUser.address ?? null,
      phone: insertUser.phone ?? null,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error("User not found");
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Services
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = { 
      ...insertService, 
      id,
      basePrice: insertService.basePrice ?? null 
    };
    this.services.set(id, service);
    return service;
  }

  // Bookings
  async getBookingsByUserId(userId: string): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => booking.userId === userId);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = { 
      ...insertBooking, 
      id,
      userId: insertBooking.userId ?? null,
      serviceId: insertBooking.serviceId ?? null,
      comments: insertBooking.comments ?? null,
      status: "pending",
      createdAt: new Date(),
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
    const booking = this.bookings.get(id);
    if (!booking) throw new Error("Booking not found");
    
    const updatedBooking = { ...booking, ...updates };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  // Quotes
  async getQuotesByUserId(userId: string): Promise<Quote[]> {
    return Array.from(this.quotes.values()).filter(quote => quote.userId === userId);
  }

  async getQuote(id: string): Promise<Quote | undefined> {
    return this.quotes.get(id);
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = randomUUID();
    const quote: Quote = { 
      ...insertQuote, 
      id,
      userId: insertQuote.userId ?? null,
      imageUrls: insertQuote.imageUrls ?? null,
      amount: null,
      status: "pending",
      createdAt: new Date(),
    };
    this.quotes.set(id, quote);
    return quote;
  }

  async updateQuote(id: string, updates: Partial<Quote>): Promise<Quote> {
    const quote = this.quotes.get(id);
    if (!quote) throw new Error("Quote not found");
    
    const updatedQuote = { ...quote, ...updates };
    this.quotes.set(id, updatedQuote);
    return updatedQuote;
  }

  // Invoices
  async getInvoicesByUserId(userId: string): Promise<Invoice[]> {
    return Array.from(this.invoices.values()).filter(invoice => invoice.userId === userId);
  }

  async createInvoice(insertInvoice: InsertInvoice): Promise<Invoice> {
    const id = randomUUID();
    const invoice: Invoice = { 
      ...insertInvoice, 
      id,
      userId: insertInvoice.userId ?? null,
      quoteId: insertInvoice.quoteId ?? null,
      status: "unpaid",
      issuedAt: new Date(),
      paidAt: null,
    };
    this.invoices.set(id, invoice);
    return invoice;
  }

  async updateInvoice(id: string, updates: Partial<Invoice>): Promise<Invoice> {
    const invoice = this.invoices.get(id);
    if (!invoice) throw new Error("Invoice not found");
    
    const updatedInvoice = { ...invoice, ...updates };
    this.invoices.set(id, updatedInvoice);
    return updatedInvoice;
  }
}

export const storage = new MemStorage();
