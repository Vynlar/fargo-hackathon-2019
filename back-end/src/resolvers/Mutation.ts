import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { idArg, mutationType, stringArg, intArg } from "nexus";
import { APP_SECRET, getUserId } from "../utils";
import * as R from "ramda";

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
        const userId = getUserId(context);

        // They are the one in need
        if (healthScore <= 2) {
          // if there are open fulfillers, connect them
          const openFulfilRequests = R.pipe(
            R.filter(
              R.pipe(
                R.prop("fulfiller"),
                R.compose(
                  R.not,
                  R.isNil
                )
              )
            ),
            R.reject(
              R.pipe(
                R.path(["fulfiller", "id"]),
                R.equals(userId)
              )
            )
          )(
            await context.photon.helpRequests.findMany({
              where: { matched: false },
              include: { fulfiller: true }
            })
          );

          if (openFulfilRequests.length > 0) {
            // If there is an open fulfiller
            return context.photon.helpRequests.update({
              where: { id: openFulfilRequests[0].id },
              data: {
                owner: { connect: { id: userId } },
                matched: true
              }
            });
          } else {
            return context.photon.helpRequests.create({
              data: {
                owner: { connect: { id: userId } },
                matched: false,
                complete: false
              }
            });
          }
        } else {
          // They are the fulfiller
          const openNeedRequests = R.pipe(
            R.filter(
              R.pipe(
                R.prop("owner"),
                R.compose(
                  R.not,
                  R.isNil
                )
              )
            ),
            R.reject(
              R.pipe(
                R.path(["owner", "id"]),
                R.equals(userId)
              )
            )
          )(
            await context.photon.helpRequests.findMany({
              where: { matched: false },
              include: { owner: true }
            })
          );

          if (openNeedRequests.length > 0) {
            return context.photon.helpRequests.update({
              where: {
                id: openNeedRequests[0].id
              },
              data: {
                fulfiller: { connect: { id: userId } },
                matched: true
              }
            });
          } else {
            return context.photon.helpRequests.create({
              data: {
                fulfiller: { connect: { id: userId } },
                matched: false,
                complete: false
              }
            });
          }
        }
      }
    });

    t.field("sendMessage", {
      type: "Message",
      args: {
        helpRequestId: idArg(),
        body: stringArg()
      },
      resolve: (parent, { helpRequestId, body }, context) => {
        const userId = getUserId(context);
        return context.photon.messages.create({
          data: {
            body,
            request: { connect: { id: helpRequestId } },
            owner: { connect: { id: userId } }
          }
        });
      }
    });

    t.boolean("deleteHelpRequest", {
      args: {
        id: idArg()
      },
      resolve: async (parent, { id }, context) => {
        await context.photon.helpRequests.delete({ where: { id } });
        return true;
      }
    });

    t.boolean("closeConversation", {
      args: {
        helpRequestId: idArg({ nullable: true })
      },
      resolve: async (parent, { helpRequestId }, context) => {
        if (helpRequestId) {
          await context.photon.helpRequests.update({
            where: { id: helpRequestId },
            data: { complete: true }
          });
          return true;
        }
        return false;
      }
    });
  }
});
