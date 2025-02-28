import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Enums
export const userRoleEnum = pgEnum("user_role", ["admin"]);
export const seasonEnum = pgEnum("season", ["hiver", "printemps", "ete", "automne"]);

export const mainCategories = pgTable("main_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  isActive: boolean("is_active").default(true),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  image: text("image").default(""),
  isFeatured: boolean("is_featured").default(false),
  mainCategoryId: uuid("main_category_id")
    .notNull()
    .references(() => mainCategories.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});


// Products Table
export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  mark: varchar("mark", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  isFeatured: boolean("is_featured").notNull().default(false),
  mainCategoryId: uuid("main_category_id"),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// Product Specifications (Dynamic - colors, sizes, etc.)
export const productSpecifications = pgTable("product_specifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(), // e.g., "color", "size"
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// Product Specification Values
export const specificationValues = pgTable("specification_values", {
  id: uuid("id").defaultRandom().primaryKey(),
  specificationId: uuid("specification_id")
    .notNull()
    .references(() => productSpecifications.id, { onDelete: "cascade" }),
  value: varchar("value", { length: 255 }).notNull(), // e.g., "red", "XL"
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// Product Images Table
export const productImages = pgTable("product_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  url: varchar("url", { length: 255 }).notNull(),
  cloudId: varchar("cloud_id", { length: 255 }).notNull(),
  isMain: boolean("is_main").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// Users Table
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  role: userRoleEnum("role").default("admin").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const mainCategoryRelations = relations(mainCategories, ({ many }) => ({
  categories: many(categories),
}));

export const categoryRelations = relations(categories, ({ one, many }) => ({
  mainCategory: one(mainCategories, {
    fields: [categories.mainCategoryId],
    references: [mainCategories.id],
  }),
  products: many(products),
}));

export const productRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  images: many(productImages),
  specifications: many(productSpecifications),
  // whatsappMessages: many(whatsappMessages),
}));

export const productSpecificationsRelations = relations(
  productSpecifications,
  ({ one, many }) => ({
    product: one(products, {
      fields: [productSpecifications.productId],
      references: [products.id],
    }),
    values: many(specificationValues),
  })
);

export const specificationValuesRelations = relations(
  specificationValues,
  ({ one }) => ({
    specification: one(productSpecifications, {
      fields: [specificationValues.specificationId],
      references: [productSpecifications.id],
    }),
  })
);

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export const insertMainCategorySchema = createInsertSchema(mainCategories);
export const selectMainCategorySchema = createSelectSchema(mainCategories);

export const insertCategorySchema = createInsertSchema(categories);
export const selectCategorySchema = createSelectSchema(categories);


export const insertProductSchema = createInsertSchema(products);
export const selectProductSchema = createSelectSchema(products);

export const insertProductSpecificationSchema = createInsertSchema(productSpecifications);
export const selectProductSpecificationSchema = createSelectSchema(productSpecifications);

export const insertSpecificationValueSchema = createInsertSchema(specificationValues);
export const selectSpecificationValueSchema = createSelectSchema(specificationValues);

export const insertProductImageSchema = createInsertSchema(productImages);
export const selectProductImageSchema = createSelectSchema(productImages);

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

// export const insertWhatsappMessageSchema = createInsertSchema(whatsappMessages);
// export const selectWhatsappMessageSchema = createSelectSchema(whatsappMessages);