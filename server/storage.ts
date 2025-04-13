import { 
  users, 
  type User, 
  type InsertUser,
  doors,
  type Door,
  type InsertDoor,
  collections,
  type Collection,
  type InsertCollection,
  testimonials,
  type Testimonial,
  type InsertTestimonial,
  contactSubmissions,
  type ContactSubmission,
  type InsertContactSubmission
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Doors
  getDoors(): Promise<Door[]>;
  getDoorById(id: number): Promise<Door | undefined>;
  createDoor(door: InsertDoor): Promise<Door>;
  
  // Collections
  getCollections(featuredOnly?: boolean): Promise<Collection[]>;
  getCollectionById(id: number): Promise<Collection | undefined>;
  createCollection(collection: InsertCollection): Promise<Collection>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Contact Submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private doors: Map<number, Door>;
  private collections: Map<number, Collection>;
  private testimonials: Map<number, Testimonial>;
  private contactSubmissions: Map<number, ContactSubmission>;
  
  private userIdCounter: number;
  private doorIdCounter: number;
  private collectionIdCounter: number;
  private testimonialIdCounter: number;
  private contactSubmissionIdCounter: number;

  constructor() {
    this.users = new Map();
    this.doors = new Map();
    this.collections = new Map();
    this.testimonials = new Map();
    this.contactSubmissions = new Map();
    
    this.userIdCounter = 1;
    this.doorIdCounter = 1;
    this.collectionIdCounter = 1;
    this.testimonialIdCounter = 1;
    this.contactSubmissionIdCounter = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample collections
    const sampleCollections: InsertCollection[] = [
      {
        name: "Classic European",
        description: "Timeless elegance with hand-carved panels and salt-air resistant construction.",
        imageUrl: "https://images.unsplash.com/photo-1605276242126-99db8928570d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true,
      },
      {
        name: "Asian-Inspired",
        description: "Exotic teak designs featuring intricate carvings inspired by Eastern traditions.",
        imageUrl: "https://images.unsplash.com/photo-1533377088493-e40a1433f398?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true,
      },
      {
        name: "Contemporary",
        description: "Modern designs featuring clean lines, minimalist hardware, and innovative finishes.",
        imageUrl: "https://images.unsplash.com/photo-1601850615642-e8734338118b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true,
      }
    ];
    
    sampleCollections.forEach(collection => this.createCollection(collection));
    
    // Sample testimonials
    const sampleTestimonials: InsertTestimonial[] = [
      {
        name: "Sarah Johnson",
        title: "Homeowner, California",
        content: "The craftsmanship of our new front door is truly exceptional. It's become a conversation piece for every visitor to our home. Well worth the investment.",
        rating: 5,
        avatarUrl: "https://randomuser.me/api/portraits/women/45.jpg",
      },
      {
        name: "Michael Chen",
        title: "Principal Architect, Chen & Associates",
        content: "As an architect, I value both aesthetics and functionality. These doors deliver on both fronts. My clients are consistently impressed with the quality.",
        rating: 5,
        avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        name: "Elizabeth Ramirez",
        title: "Interior Designer, Miami",
        content: "The custom door for our Mediterranean villa exceeded our expectations. The team's attention to detail and service was impeccable from design to installation.",
        rating: 5,
        avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
      }
    ];
    
    sampleTestimonials.forEach(testimonial => this.createTestimonial(testimonial));
    
    // Sample doors
    const sampleDoors: InsertDoor[] = [
      {
        name: "Château Classic French Oak Door",
        description: "Exquisite French oak door featuring handcrafted details and traditional styling, perfect for elegant homes seeking old-world charm.",
        price: 3400,
        priceCategory: "Premium",
        woodType: "European Oak",
        style: "Classic",
        origin: "French",
        dimensions: "36\" x 80\" x 2.25\"",
        imageUrl: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        additionalImages: [
          "https://images.unsplash.com/photo-1517276554934-9dcac6fccf6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1610178394679-2ce99de6e4e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1518680595690-a2645da62137?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        features: ["Hand-carved", "Custom Hardware", "Weather-sealed"],
        details: "This classic French door is crafted from premium European oak, kiln-dried to prevent warping. Features traditional raised panels with hand-carved detailing and premium brass hardware. Finished with our proprietary 7-layer sealing process for ultimate protection against the elements."
      },
      {
        name: "Milano Modern Walnut Door",
        description: "Contemporary Italian design featuring clean lines and sleek hardware, perfect for modern luxury homes.",
        price: 4200,
        priceCategory: "Luxury",
        woodType: "Italian Walnut",
        style: "Contemporary",
        origin: "Italian",
        dimensions: "36\" x 84\" x 2.5\"",
        imageUrl: "https://images.unsplash.com/photo-1534462477958-e10849bb9354?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        additionalImages: [
          "https://images.unsplash.com/photo-1616693049698-1b89a7e387f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1575444133330-60d5bd9ed1b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        features: ["Soundproof", "Contemporary", "Energy Efficient"],
        details: "The Milano door represents the pinnacle of Italian modern design, featuring book-matched Italian walnut with minimal horizontal graining. The door includes integrated sound dampening technology, providing a STC rating of 36. Hardware options include brushed nickel or matte black."
      },
      {
        name: "Balinese Teak Door",
        description: "Exotic hand-carved teak door featuring intricate traditional Balinese designs and patterns.",
        price: 5800,
        priceCategory: "Ultra-Luxury",
        woodType: "Sustainable Teak",
        style: "Asian",
        origin: "Indonesian",
        dimensions: "42\" x 84\" x 3\"",
        imageUrl: "https://images.unsplash.com/photo-1527261420593-5e27e04a94da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        additionalImages: [
          "https://images.unsplash.com/photo-1469533778471-92a68acc3633?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1588784172122-4d559331a2e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        features: ["Hand-carved", "Weather Resistant", "Exotic Wood"],
        details: "Our Balinese doors showcase generations of Indonesian craftsmanship. Each door takes over 300 hours to hand-carve by master artisans. The sustainable teak is sourced from managed forests and treated to withstand tropical climates. These statement pieces tell a story through traditional symbolic patterns."
      },
      {
        name: "Barcelona Double Door",
        description: "Elegant Mediterranean-inspired double doors with wrought iron accents and rich Spanish oak.",
        price: 6200,
        priceCategory: "Luxury",
        woodType: "Spanish Oak",
        style: "Mediterranean",
        origin: "Spanish",
        dimensions: "72\" x 96\" x 2.5\"",
        imageUrl: "https://images.unsplash.com/photo-1487700160041-babef9c3cb55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        additionalImages: [
          "https://images.unsplash.com/photo-1591005318596-10d119b1ab83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1610178394679-2ce99de6e4e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        features: ["Double Door", "Mediterranean", "Wrought Iron Details"],
        details: "These impressive double doors make a bold statement at any entrance. Crafted from Spanish oak with a distressed finish for an authentic aged appearance. Features hand-forged wrought iron detailing and decorative nailheads. Perfect for Mediterranean-inspired homes or Spanish Colonial architecture."
      },
      {
        name: "Nordic Minimalist Door",
        description: "Clean Scandinavian design with light pine wood and simple, functional hardware.",
        price: 3900,
        priceCategory: "Premium",
        woodType: "Scandinavian Pine",
        style: "Contemporary",
        origin: "Norwegian",
        dimensions: "36\" x 80\" x 2\"",
        imageUrl: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        additionalImages: [
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1607853554439-0069ec2fc2b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        features: ["Energy Efficient", "Contemporary", "Scandinavian Design"],
        details: "Inspired by Scandinavian minimalist design principles, this door features light Scandinavian pine with a natural finish that brightens any entryway. Triple-sealed for superior insulation and energy efficiency. Simple brushed steel hardware complements the clean aesthetic."
      },
      {
        name: "Kyoto Sliding Door",
        description: "Traditional Japanese sliding door with rice paper panels and authentic cedar wood frame.",
        price: 4800,
        priceCategory: "Ultra-Luxury",
        woodType: "Japanese Cedar",
        style: "Asian",
        origin: "Japanese",
        dimensions: "60\" x 84\" sliding",
        imageUrl: "https://images.unsplash.com/photo-1526057621700-1502e421fcdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        additionalImages: [
          "https://images.unsplash.com/photo-1528484548049-116e9866c9c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        features: ["Sliding Door", "Rice Paper Panels", "Asian"],
        details: "Authentic shoji-style sliding doors crafted by Japanese artisans. Features handmade washi paper panels that filter light beautifully throughout the day. The Japanese cedar frame is joined using traditional joinery techniques without nails or screws. Perfect for creating versatile, adaptable spaces with an Eastern aesthetic."
      }
    ];
    
    sampleDoors.forEach(door => this.createDoor(door));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Door methods
  async getDoors(): Promise<Door[]> {
    return Array.from(this.doors.values());
  }
  
  async getDoorById(id: number): Promise<Door | undefined> {
    return this.doors.get(id);
  }
  
  async createDoor(insertDoor: InsertDoor): Promise<Door> {
    const id = this.doorIdCounter++;
    const door: Door = { ...insertDoor, id };
    this.doors.set(id, door);
    return door;
  }
  
  // Collection methods
  async getCollections(featuredOnly = false): Promise<Collection[]> {
    const collections = Array.from(this.collections.values());
    return featuredOnly ? collections.filter(c => c.featured) : collections;
  }
  
  async getCollectionById(id: number): Promise<Collection | undefined> {
    return this.collections.get(id);
  }
  
  async createCollection(insertCollection: InsertCollection): Promise<Collection> {
    const id = this.collectionIdCounter++;
    const collection: Collection = { ...insertCollection, id };
    this.collections.set(id, collection);
    return collection;
  }
  
  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialIdCounter++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  // Contact Submission methods
  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.contactSubmissionIdCounter++;
    const submission: ContactSubmission = { ...insertSubmission, id };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
}

export const storage = new MemStorage();
