import { objectType } from "nexus";

export const HelpRequest = objectType({
  name: "HelpRequest",
  definition(t) {
    t.model.id();
    t.model.health({ alias: "healthScore" });
    t.model.owner();
    t.model.fulfiller();
  }
});
