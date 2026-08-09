import { compileMDX } from 'next-mdx-remote/rsc';

/**
 * Minimal MDX support for blog/guide content authoring.
 * Uses next-mdx-remote for server-side MDX compilation with
 * support for embedded components (charts, callouts, code blocks, calculators).
 */

export interface MDXFrontmatter {
  title: string;
  slug: string;
  publishDate: string;
  category: string;
  excerpt: string;
  tags: string[];
}

/**
 * Compiles raw MDX source string into renderable content.
 * Components can be passed for inline embedding (charts, callouts, etc.).
 */
export async function compileMDXContent(source: string) {
  const { content, frontmatter } = await compileMDX<MDXFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
    },
  });

  return { content, frontmatter };
}
