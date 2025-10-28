import { defineConfig } from "tinacms";
import { HomePageCollection } from "@tina/collections/pages/home";
import { AboutPageCollection } from "@tina/collections/pages/about";
import { TINA_MEDIA_ROOT, TINA_PUBLIC_FOLDER } from "@src/config";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      publicFolder: "",
      mediaRoot: "/src/assets",
    },
  },
  schema: {
    collections: [
      HomePageCollection,
      AboutPageCollection,
    ],
  },
});
