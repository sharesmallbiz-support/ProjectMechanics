import { describe, it, expect } from 'vitest';
import { STEPS, getStepByIndex, isWorkflowComplete } from '../steps';

describe('steps utility', () => {
  describe('STEPS constant', () => {
    it('should have 5 steps defined', () => {
      expect(STEPS).toBeDefined();
      expect(STEPS.length).toBe(5);
    });

    it('should have correct step IDs in order', () => {
      const expectedIds = ['SPECIFY', 'PLAN', 'DRAFT', 'CRITIQUE', 'FINALIZE'];
      const actualIds = STEPS.map(step => step.id);

      expect(actualIds).toEqual(expectedIds);
    });

    it('should have all required properties for each step', () => {
      STEPS.forEach(step => {
        expect(step).toHaveProperty('id');
        expect(step).toHaveProperty('title');
        expect(step).toHaveProperty('description');
        expect(step).toHaveProperty('outputKey');
        expect(step).toHaveProperty('inputKeys');
        expect(Array.isArray(step.inputKeys)).toBe(true);
      });
    });

    it('should have unique output keys', () => {
      const outputKeys = STEPS.map(step => step.outputKey);
      const uniqueKeys = new Set(outputKeys);

      expect(outputKeys.length).toBe(uniqueKeys.size);
    });
  });

  describe('getStepByIndex', () => {
    it('should return correct step for valid index', () => {
      const step = getStepByIndex(0);
      expect(step.id).toBe('SPECIFY');
    });

    it('should return last step for valid last index', () => {
      const step = getStepByIndex(4);
      expect(step.id).toBe('FINALIZE');
    });

    it('should return undefined for negative index', () => {
      const step = getStepByIndex(-1);
      expect(step).toBeUndefined();
    });

    it('should return undefined for index beyond length', () => {
      const step = getStepByIndex(10);
      expect(step).toBeUndefined();
    });

    it('should return all steps sequentially', () => {
      for (let i = 0; i < STEPS.length; i++) {
        const step = getStepByIndex(i);
        expect(step).toBe(STEPS[i]);
      }
    });
  });

  describe('isWorkflowComplete', () => {
    it('should return false for step 0', () => {
      expect(isWorkflowComplete(0)).toBe(false);
    });

    it('should return false for middle steps', () => {
      expect(isWorkflowComplete(2)).toBe(false);
    });

    it('should return false for second-to-last step', () => {
      expect(isWorkflowComplete(4)).toBe(false);
    });

    it('should return true when at final step (index 5)', () => {
      expect(isWorkflowComplete(5)).toBe(true);
    });

    it('should return true for index beyond final step', () => {
      expect(isWorkflowComplete(10)).toBe(true);
    });
  });
});
