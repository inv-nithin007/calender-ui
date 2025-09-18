
import { getTimeSlot } from '../utils/getTimeSlot';

describe('getTimeSlot util', () => {
  const from = '2025-09-01';

  it('cellId 1 with diff 3 -> Sep 1 8:00-8:30', () => {
    expect(getTimeSlot(from, 3, 1)).toBe('Sep 1 8:00-8:30');
  });

  it('cellId 2 with diff 3 -> Sep 2 8:00-8:30', () => {
    expect(getTimeSlot(from, 3, 2)).toBe('Sep 2 8:00-8:30');
  });

  it('cellId 4 with diff 3 -> Sep 1 8:30-9:00', () => {
    expect(getTimeSlot(from, 3, 4)).toBe('Sep 1 8:30-9:00');
  });

  it('returns a string for a later cellId', () => {
    const cellId = (4 * 3) + 1; 
    const out = getTimeSlot(from, 3, cellId);
    expect(typeof out).toBe('string');
  });
});
