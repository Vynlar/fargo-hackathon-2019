# Migration `20191006092336-added-complete-field-to-help-requests`

This migration has been generated by Adrian Aleixandre at 10/6/2019, 9:23:36 AM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20191005180644-added-help-requests-and-messages..20191006092336-added-complete-field-to-help-requests
--- datamodel.dml
+++ datamodel.dml
@@ -28,8 +28,9 @@
   owner     User?     @relation("helpRequests")
   fulfiller User?     @relation("fulfilled")
   matched   Boolean
+  complete  Boolean
   messages  Message[]
 }
 model Message {
```

## Photon Usage

You can use a specific Photon built for this migration (20191006092336-added-complete-field-to-help-requests)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20191006092336-added-complete-field-to-help-requests'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
