# Migration `20191005180644-added-help-requests-and-messages`

This migration has been generated by Adrian Aleixandre at 10/5/2019, 6:06:44 PM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration ..20191005180644-added-help-requests-and-messages
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,43 @@
+generator photon {
+  provider = "photonjs"
+}
+
+generator nexus_prisma {
+  provider = "nexus-prisma"
+}
+
+datasource db {
+  provider = "sqlite"
+  url      = "file:dev.db"
+}
+
+model User {
+  id                String        @default(cuid()) @id
+  email             String        @unique
+  password          String
+  name              String?
+  helpRequests      HelpRequest[] @relation("helpRequests")
+  fulfilledRequests HelpRequest[] @relation("fulfilled")
+  messages          Message[]
+}
+
+model HelpRequest {
+  id        String   @default(cuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+
+  owner     User?     @relation("helpRequests")
+  fulfiller User?     @relation("fulfilled")
+  matched   Boolean
+  messages  Message[]
+}
+
+model Message {
+  id        String   @default(cuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+
+  body    String
+  owner   User
+  request HelpRequest
+}
```

## Photon Usage

You can use a specific Photon built for this migration (20191005180644-added-help-requests-and-messages)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20191005180644-added-help-requests-and-messages'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
