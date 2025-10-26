import { defineCollection } from 'astro:content';

const pages = defineCollection({})
const components = defineCollection({})

export const collections = {pages, components};
