import express from "express";
import { DB } from "../DB/index.js"
import { orders, products, users } from "../DB/schema.js";
import dotenv from "dotenv";
import {
  GetAllOrderSchema,
  PatchOrderStatus,
  PlaceOrderSchema,
  UserPostSchema,
  UserPatchSchema,
  CartAddSchema
} from "./validatator/zod-schemas.js";
import { eq } from "drizzle-orm";

const app = express();
const PORT = 8000;

dotenv.config();

app.use(express.json());



app.post("/order.create", async (req, res) => {
  try {
    const sanitizedData = PlaceOrderSchema.parse(req.body);

    const orderDetails = await DB
      .insert(orders)
      .values({
        productId: sanitizedData.productId,
        userId: sanitizedData.userId,
      })
      .returning();

    res.status(201).json(orderDetails);
  } catch (e) {
    res.status(400).json({
      message: "Bad Request",
      extra: e,
    });
  }
});

app.patch("/order.patch", async (req, res) => {
  try {
    const sanitizedData = PatchOrderStatus.parse(req.body);

    const orderDetails = await DB
      .update(orders)
      .set({
        status: sanitizedData.status,
      })
      .where(eq(orders.id, sanitizedData.orderId))
      .returning();

    res.status(200).json(orderDetails);
  } catch (e) {
    res.status(400).json({
      message: "Bad Request",
      extra: e,
    });
  }
});

app.get("/order.getAll", async (req, res) => {
  try {
    const sanitizedData = GetAllOrderSchema.parse(req.body);

    const orderDetails = await DB
      .select({
        orderId: orders.id,
        status: orders.status,
        products: products,
      })
      .from(orders)
      .innerJoin(products, eq(orders.productId, products.id))
      .where(eq(orders.userId, sanitizedData.userId));

    res.status(201).json(orderDetails);
  } catch (e) {
    res.status(400).json({
      message: "Bad Request",
      extra: e,
    });
  }
});

app.post("/user.create", async (req, res) => {
  try {
    const userData = UserPostSchema.parse(req.body);

    const user = await DB
      .insert(users)
      .values({
        name: userData.name,
        email: userData.email,
      })
      .returning({ id: users.id });

    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({
      message: "Bad Request",
      extra: e,
    });
  }
});
app.patch("/user.patch", async (req, res) => {
  try {
   
    const sanitizedData = UserPatchSchema.parse(req.body);

    
    const userData = await DB
      .update(users)
      .set({
        name: sanitizedData.name,
        email: sanitizedData.email,
      })
      .where(eq(users.id, sanitizedData.userId))
      .returning();

    res.status(200).json(userData);
  } catch (e) {
    res.status(400).json({
      message: "Bad Request",
      extra: e,
    });
  }
});

app.get("/user.getAll", async(req,res) => {
  const data = await DB.select().from(users);
  res.status(201).json(data);
});

app.delete("/user.delete/byId", async (req, res) => {
  try {
    const userId = req.params.id;
    await DB
      .delete()
      .from(users)
      .where(eq(users.id, userId));

    res.status(204).end();
  } catch (e) {
    res.status(400).json({
      message: "Bad Request",
      extra: e,
    });
  }
});

app.post("/cart.add", async (req, res) => {
  try {
    const sanitizedData =CartAddSchema.parse(req.body);

    const cartItem = await DB
      .insert(cart)
      .values({
        productId: sanitizedData.productId,
        userId: sanitizedData.userId,
        quantity: sanitizedData.quantity,
      })
      .returning({id:cart.id});

    res.status(201).json(cartItem);
  } catch (e) {
    res.status(400).json({
      message: "Bad Request",
      extra: e,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
