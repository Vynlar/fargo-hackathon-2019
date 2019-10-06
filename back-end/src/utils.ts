import { verify } from "jsonwebtoken";
import { Context } from "./types";
import * as moment from "moment";
import { listenerCount } from "cluster";

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

  const helpRequests = await context.photon.users
    .findOne({ where: { id: userId } })
    .helpRequests({ orderBy: { updatedAt: "desc" }, first: 1 });
  const fulfilledRequests = await context.photon.users
    .findOne({ where: { id: userId } })
    .fulfilledRequests({ orderBy: { updatedAt: "desc" }, first: 1 });

  const helpRequest = helpRequests[0];
  const fulfilledRequest = fulfilledRequests[0];

  let candidates = [];
  if (helpRequest) candidates.push(helpRequest);
  if (fulfilledRequest) candidates.push(fulfilledRequest);

  if (candidates.length === 0) return null;
  if (candidates.length === 1) return candidates[0];

  if (moment(helpRequest.updatedAt).isAfter(fulfilledRequest.updatedAt)) {
    return helpRequest;
  } else {
    return fulfilledRequest;
  }
};
