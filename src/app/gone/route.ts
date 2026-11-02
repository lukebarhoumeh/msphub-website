/**
 * Theme-demo URLs from the old WordPress site (fake team, case studies,
 * projects, careers, lorem-ipsum services) are rewritten here in
 * `next.config.ts` and answered with 410 Gone so search engines drop them.
 */
export function GET() {
  return new Response("Gone", {
    status: 410,
    headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
  });
}
