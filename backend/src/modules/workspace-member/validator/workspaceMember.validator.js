import { z } from "zod";

export const inviteMemberSchema = z.object({

    email: z
        .string()
        .email(),

    role: z.enum([
        "ADMIN",
        "MEMBER",
    ])

});
export const updateMemberRoleSchema = z.object({
  role: z.enum([
    "ADMIN",
    "MEMBER",
  ]),
});
export const transferOwnershipSchema = z.object({
  newOwnerId: z.string().min(1),
});