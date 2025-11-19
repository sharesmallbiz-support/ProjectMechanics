import { describe, it, expect } from 'vitest';
import {
  getContentMetadata,
  getAllContentMetadata,
  getNavigationCards
} from '../contentLoader';

describe('contentLoader', () => {
  describe('getContentMetadata', () => {
    it('should return metadata for a valid slug', () => {
      const metadata = getContentMetadata('overview');

      expect(metadata).toBeDefined();
      expect(metadata.title).toBe('Project Mechanics Overview');
      expect(metadata.slug).toBe('overview');
      expect(metadata.description).toBeTruthy();
      expect(metadata.keywords).toBeTruthy();
    });

    it('should return default metadata for unknown slug', () => {
      const metadata = getContentMetadata('unknown-slug');

      expect(metadata).toBeDefined();
      expect(metadata.title).toBe('Project Mechanics');
      expect(metadata.slug).toBe('unknown-slug');
    });

    it('should have metadata for all core pages', () => {
      const coreSlugs = [
        'overview',
        'project-life-cycle',
        'leadership-skills',
        'change-management-strategies',
        'conflict-management-strategies'
      ];

      coreSlugs.forEach(slug => {
        const metadata = getContentMetadata(slug);
        expect(metadata.title).toBeTruthy();
        expect(metadata.description).toBeTruthy();
        expect(metadata.slug).toBe(slug);
      });
    });
  });

  describe('getAllContentMetadata', () => {
    it('should return an array of all content metadata', () => {
      const allMetadata = getAllContentMetadata();

      expect(Array.isArray(allMetadata)).toBe(true);
      expect(allMetadata.length).toBeGreaterThan(0);
    });

    it('should include index page metadata', () => {
      const allMetadata = getAllContentMetadata();
      const indexMeta = allMetadata.find(meta => meta.slug === 'index');

      expect(indexMeta).toBeDefined();
      expect(indexMeta.title).toBe('Project Mechanics');
    });

    it('should have unique slugs', () => {
      const allMetadata = getAllContentMetadata();
      const slugs = allMetadata.map(meta => meta.slug);
      const uniqueSlugs = new Set(slugs);

      expect(slugs.length).toBe(uniqueSlugs.size);
    });
  });

  describe('getNavigationCards', () => {
    it('should return navigation cards in correct order', () => {
      const cards = getNavigationCards();

      expect(Array.isArray(cards)).toBe(true);
      expect(cards.length).toBeGreaterThan(0);
    });

    it('should not include index page in navigation cards', () => {
      const cards = getNavigationCards();
      const hasIndex = cards.some(card => card.slug === 'index');

      expect(hasIndex).toBe(false);
    });

    it('should start with overview page', () => {
      const cards = getNavigationCards();

      expect(cards[0].slug).toBe('overview');
    });

    it('should have all required properties', () => {
      const cards = getNavigationCards();

      cards.forEach(card => {
        expect(card).toHaveProperty('title');
        expect(card).toHaveProperty('description');
        expect(card).toHaveProperty('slug');
        expect(card).toHaveProperty('keywords');
      });
    });
  });
});
