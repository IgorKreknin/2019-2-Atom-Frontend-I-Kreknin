/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman';

test('Returns false for invalid types', () => {
  expect(convertBytesToHuman(-12)).toBe(false);
  expect(convertBytesToHuman("Bytes")).toBe(false)
  expect(convertBytesToHuman("12324234 B")).toBe(false)
  expect(convertBytesToHuman(true)).toBe(false)
});

test('Returns correct value', () => {
  expect(convertBytesToHuman(145)).toBe("145 B")
  expect(convertBytesToHuman(1024)).toBe("1.00 KB")
  expect(convertBytesToHuman(102400)).toBe("100.00 KB")
  expect(convertBytesToHuman(58982400)).toBe("56.25 MB")
  expect(convertBytesToHuman(23443289689)).toBe("21.83 GB")
});


// другая группа проверок
