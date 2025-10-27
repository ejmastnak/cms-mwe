import { defineConfig } from "tinacms";
import { HomePageCollection } from "@tina/collections/pages/home";
import { AboutPageCollection } from "@tina/collections/pages/about";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.PUBLIC_TINA_CLIENT_ID, // from tina.io
  token: process.env.TINA_TOKEN,               // from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      publicFolder: "",
      mediaRoot: "/src/assets",
      // publicFolder: "public",
      // mediaRoot: "img",
    },
  },
  schema: {
    collections: [
      HomePageCollection,
      AboutPageCollection,
    ],
  },
});
