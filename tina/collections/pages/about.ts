import type { Collection } from "tinacms";

export const AboutPageCollection: Collection = {

  name: "aboutPage",
  label: "About Page",
  path: "src/content/pages/about",
  format: "json",

  ui: {
    router: () => "/about",
    allowedActions: {
      create: false,
      delete: false,
    },
  },

  fields: [
    {
      name: "meta",
      label: "Metadata",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string",
        },
        {
          name: "description",
          label: "Description",
          type: "string",
        },
      ],
    },
    {
      name: "h1",
      label: "Heading",
      type: "string",
      required: true,
    },
    {
      name: "subtitle",
      label: "Subtitle",
      type: "string",
      required: true,
    },
    {
      name: "body",
      label: "Body",
      type: "rich-text",
      required: true,
    },
  ],
};
