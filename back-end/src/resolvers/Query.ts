import { idArg, queryType, stringArg, booleanArg } from "nexus";
import { getCurrentConversation, getUserId } from "../utils";

export const Query = queryType({
  definition(t) {
    t.field("me", {
      type: "User",
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx);
        return ctx.photon.users.findOne({
          where: {
            id: userId
          }
        });
      }
    });

    t.field("helpRequests", {
      type: "HelpRequest",
      list: true,
      args: {
        matched: booleanArg({ nullable: true })
      },
      resolve: async (parent, { matched }, context) => {
        const result = await context.photon.helpRequests.findMany({
          where: { matched },
          include: { owner: true, fulfiller: true }
        });
        return result;
      }
    });

    t.field("currentConversation", {
      type: "HelpRequest",
      nullable: true,
      resolve: (parent, args, context) => {
        return getCurrentConversation(context);
      }
    });
  }
});
