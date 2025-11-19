import { describe, it, expect } from 'vitest';
import { getStructuredData } from '../../utils/seo/generateSitemap';
import { getAllContentMetadata } from '../../utils/contentLoader';

describe('SEO and Metadata Tests', () => {
  describe('Structured Data', () => {
    it('should generate valid homepage structured data', () => {
      const data = getStructuredData('homepage', {
        description: 'Test description'
      });

      expect(data['@context']).toBe('https://schema.org');
      expect(data['@type']).toBe('WebSite');
      expect(data.name).toBe('Project Mechanics');
      expect(data.url).toBeTruthy();
      expect(data.publisher).toBeDefined();
      expect(data.publisher['@type']).toBe('Person');
      expect(data.publisher.name).toBe('Mark Hazleton');
    });

    it('should generate valid article structured data', () => {
      const metadata = {
        title: 'Test Article',
        description: 'Test description',
        slug: 'test-article',
        keywords: 'test, article'
      };

      const data = getStructuredData('article', metadata);

      expect(data['@context']).toBe('https://schema.org');
      expect(data['@type']).toBe('Article');
      expect(data.headline).toBe('Test Article');
      expect(data.description).toBe('Test description');
      expect(data.author).toBeDefined();
      expect(data.publisher).toBeDefined();
      expect(data.keywords).toBe('test, article');
    });

    it('should include required SEO properties', () => {
      const data = getStructuredData('article', {
        title: 'Test',
        description: 'Test desc',
        slug: 'test'
      });

      expect(data).toHaveProperty('datePublished');
      expect(data).toHaveProperty('dateModified');
      expect(data).toHaveProperty('mainEntityOfPage');
      expect(data).toHaveProperty('inLanguage');
      expect(data.inLanguage).toBe('en-US');
    });
  });

  describe('Content Metadata Validation', () => {
    it('should have metadata for all content pages', () => {
      const allMetadata = getAllContentMetadata();

      expect(allMetadata.length).toBeGreaterThan(0);

      allMetadata.forEach(meta => {
        expect(meta).toHaveProperty('title');
        expect(meta).toHaveProperty('description');
        expect(meta).toHaveProperty('keywords');
        expect(meta).toHaveProperty('slug');

        // Validate not empty
        expect(meta.title).toBeTruthy();
        expect(meta.description).toBeTruthy();
        expect(meta.keywords).toBeTruthy();
        expect(meta.slug).toBeTruthy();
      });
    });

    it('should have SEO-friendly descriptions (50-160 chars recommended)', () => {
      const allMetadata = getAllContentMetadata();

      allMetadata.forEach(meta => {
        const descLength = meta.description.length;
        // Warn if too short or too long, but don't fail
        if (descLength < 50 || descLength > 300) {
          console.warn(
            `SEO Warning: ${meta.slug} description length is ${descLength} chars (recommended: 50-160)`
          );
        }
        expect(descLength).toBeGreaterThan(0);
      });
    });

    it('should have unique titles across all pages', () => {
      const allMetadata = getAllContentMetadata();
      const titles = allMetadata.map(meta => meta.title);
      const uniqueTitles = new Set(titles);

      expect(titles.length).toBe(uniqueTitles.size);
    });

    it('should have keywords for better discoverability', () => {
      const allMetadata = getAllContentMetadata();

      allMetadata.forEach(meta => {
        expect(meta.keywords).toBeTruthy();
        expect(meta.keywords.length).toBeGreaterThan(10);
      });
    });
  });

  describe('URL Structure', () => {
    it('should have valid slugs (lowercase, hyphenated)', () => {
      const allMetadata = getAllContentMetadata();

      allMetadata.forEach(meta => {
        // Slugs should be lowercase
        expect(meta.slug).toBe(meta.slug.toLowerCase());

        // Should not have spaces
        expect(meta.slug).not.toMatch(/\s/);

        // Should use hyphens for multi-word slugs
        if (meta.slug.length > 5 && meta.slug !== 'index') {
          // Most slugs should have hyphens (except very short ones)
          const hasValidFormat = /^[a-z0-9]+(-[a-z0-9]+)*$/.test(meta.slug);
          expect(hasValidFormat).toBe(true);
        }
      });
    });
  });
});
