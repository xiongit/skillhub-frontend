import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://skillhub.com';

  const staticRoutes = [
    '',
    '/courses',
    '/learning-paths',
    '/pricing',
    '/jobs',
    '/mentors',
    '/search',
    '/verify',
    '/login',
    '/register',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const sampleCourses = [
    'full-stack-web-development-masterclass',
    'postgresql-database-architecture-and-optimization',
    'modern-devops-and-cloud-architect',
    'docker-and-kubernetes-production-bootcamp',
  ].map((slug) => ({
    url: `${baseUrl}/courses/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...sampleCourses];
}
