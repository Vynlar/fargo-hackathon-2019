import { objectType } from "nexus";

export const HelpRequest = objectType({
  name: "HelpRequest",
  definition(t) {
    t.model.id();
    t.model.owner();
    t.model.fulfiller();
    t.model.matched();
    t.model.complete();
    t.model.messages();
  }
});
