import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { idArg, mutationType, stringArg, intArg } from "nexus";
import { APP_SECRET, getUserId } from "../utils";

export const Mutation = mutationType({
  definition(t) {
    t.field("signup", {
      type: "AuthPayload",
      args: {
        name: stringArg({ nullable: true }),
        email: stringArg(),
        password: stringArg()
      },
      resolve: async (parent, { name, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10);
        const user = await ctx.photon.users.create({
          data: {
            name,
            email,
            password: hashedPassword
          }
        });
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user
        };
      }
    });

    t.field("login", {
      type: "AuthPayload",
      args: {
        email: stringArg(),
        password: stringArg()
      },
      resolve: async (parent, { email, password }, context) => {
        const user = await context.photon.users.findOne({
          where: {
            email
          }
        });
        if (!user) {
          throw new Error(`No user found for email: ${email}`);
        }
        const passwordValid = await compare(password, user.password);
        if (!passwordValid) {
          throw new Error("Invalid password");
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user
        };
      }
    });

    t.field("submitHelpRequest", {
      type: "HelpRequest",
      nullable: true,
      args: {
        healthScore: intArg({ nullable: false })
      },
      resolve: async (parent, { healthScore }, context) => {
        if (healthScore <= 2) {
          // They are the one in need
          const userId = getUserId(context);
          const newRequest = await context.photon.helpRequests.create({
            data: { owner: { connect: { id: userId } }, health: healthScore }
          });
          return newRequest;
        } else {
          // They are the fulfiller
        }
      }
    });
  }
});
