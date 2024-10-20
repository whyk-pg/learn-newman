import { writeFileSync } from "node:fs";
import * as newman from "newman";
import { collection } from "./collection.newman";

writeFileSync(
  "src/verify-cfw-drizzle-crud.postman_collection.json",
  JSON.stringify(collection.toJSON()),
);

newman.run(
  {
    collection: "src/verify-cfw-drizzle-crud.postman_collection.json",
    reporters: "cli",
    insecure: true,
    timeout: 600000,
  },
  (err) => {
    if (err) {
      throw err;
    }
    console.log("collection run complete!");
  },
);
