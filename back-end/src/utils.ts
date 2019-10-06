import { verify } from "jsonwebtoken";
import { Context } from "../types";

export const APP_SECRET = "appsecret321";

interface Token {
  userId: string;
}

export function getUserId(context: Context) {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const verifiedToken = verify(token, APP_SECRET) as Token;
    return verifiedToken && verifiedToken.userId;
  }
}

export const getCurrentConversation = async (context: Context) => {
  const userId = getUserId(context);
  const matchedConversations = await context.photon.helpRequests.findMany({
    where: {
      OR: [{ owner: { id: userId } }, { fulfiller: { id: userId } }],
      matched: true
    },
    orderBy: { createdAt: "desc" }
  });

  console.log(matchedConversations);

  if (matchedConversations.length === 0) {
    return null;
  }
  const currentConversation = matchedConversations[0];
  return currentConversation;
};
