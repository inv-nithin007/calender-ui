
import reducer, { setFromDate, setToDate, setNumberValue, clearDates } from '../store/dateSlice';

describe('dateSlice reducer', () => {
  it('should return initial state', () => {
    const initial = reducer(undefined, { type: '@@INIT' });
    expect(initial).toEqual({ fromDate: '', toDate: '', numberValue: 0 });
  });

  it('setFromDate updates fromDate', () => {
    const next = reducer(undefined, setFromDate('2025-09-01'));
    expect(next.fromDate).toBe('2025-09-01');
  });

  it('setToDate updates toDate', () => {
    const next = reducer(undefined, setToDate('2025-09-05'));
    expect(next.toDate).toBe('2025-09-05');
  });

  it('setNumberValue updates numberValue', () => {
    const next = reducer(undefined, setNumberValue(3));
    expect(next.numberValue).toBe(3);
  });

});
