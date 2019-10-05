import { objectType } from "nexus";

export const Message = objectType({
  name: "Message",
  definition(t) {
    t.model.id();
    t.model.body();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.owner();
    t.model.request();
  }
});
