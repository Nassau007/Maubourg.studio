import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

/**
 * Served at /robots.txt.
 *
 * Everything public is crawlable, including by the AI crawlers that feed
 * ChatGPT, Claude, Perplexity and Google's AI surfaces. They are listed
 * explicitly rather than left to the wildcard so the intent is unambiguous:
 * being quoted by an assistant is a lead source for this site, not a leak.
 * Only /api/ is closed, since those routes accept lead posts and return
 * nothing a reader wants.
 */
const AI_CRAWLERS = [
  'GPTBot', // OpenAI, training + ChatGPT browsing index
  'OAI-SearchBot', // OpenAI, ChatGPT search
  'ChatGPT-User', // OpenAI, live fetch when a user asks
  'ClaudeBot', // Anthropic, index
  'Claude-User', // Anthropic, live fetch during a conversation
  'Claude-SearchBot', // Anthropic, search
  'anthropic-ai', // Anthropic, legacy token still honoured by some tooling
  'PerplexityBot', // Perplexity index
  'Perplexity-User', // Perplexity live fetch
  'Google-Extended', // Gemini / AI Overviews grounding
  'Applebot-Extended', // Apple Intelligence
  'CCBot', // Common Crawl, the corpus most models start from
  'cohere-ai',
  'Meta-ExternalAgent',
  'DuckAssistBot',
  'Amazonbot',
  'YouBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: '/api/' })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
