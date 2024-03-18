import * as z from "zod";

export const UserPostSchema = z.object({
  
  name: z.string().min(1, "Name must be required"),
  email: z.string().email("Invalid email"),
});

export const PlaceOrderSchema = z.object({
  userId: z.string().min(1, "`userId` is missing."),
  productId: z.string().min(1, "`productId` is missing."),
});

export const GetAllOrderSchema = z.object({
  userId: z.string().min(1, "`userId` is missing."),
});

export const PatchOrderStatus = z.object({
  orderId: z.string().min(1, "OrderId is missing"),
  status: z.enum(["SHIPPED", "DELIVERED", "CANCELLED"], {
    invalid_type_error: "Invalid Status Property Value",
  }),
});

  export const UserPatchSchema = z.object({
    userId:z.string().min(1, "`userId` is missing."),
    name: z.string().min(1, "Name must be required"),
    email: z.string().email("Invalid email"),
  });
  
  export const CartAddSchema = z.object({
    userId: z.string().min(1, "`userId` is missing."),
    productId: z.string().min(1, "`productId` is missing."),
    quantity:z.string().min(1,"add the product to cart").optional,
  });
  