import {
  addOneDay,
  cn,
  extractFirstRoutePart,
  formatDate,
  formatDateDisplay,
  formatSerialNumber,
  numberToCurrency
} from '@/lib/utils'
import { enUS } from 'date-fns/locale'
import { describe, expect, it } from 'vitest'

describe('Functions from `utils` dir', () => {
  describe('addOneDay', () => {
    it('should add one day to the given date', () => {
      expect(addOneDay(new Date('2022-01-01')).toISOString()).toBe(
        '2022-01-02T00:00:00.000Z'
      )
      expect(addOneDay('2022-01-01').toISOString()).toBe(
        '2022-01-02T00:00:00.000Z'
      )
    })
  })

  describe('formatDateDisplay', () => {
    it('should format date to a readable form in default locale', () => {
      expect(formatDateDisplay('2022-01-01')).toBe('1 de enero de 2022')
    })
    it('should format date to a readable form in specified locale', () => {
      expect(formatDateDisplay('2022-01-01', enUS)).toBe('January 1st, 2022')
    })
    it('should handle invalid date strings', () => {
      expect(() => formatDateDisplay('invalid-date')).toThrowError()
    })
  })

  describe('formatSerialNumber', () => {
    it('should format serial number with leading zeros', () => {
      expect(formatSerialNumber('A', 1)).toBe('A-00000001')
      expect(formatSerialNumber('B', 123)).toBe('B-00000123')
    })
    it('should handle large numbers correctly', () => {
      expect(formatSerialNumber('C', 12345678)).toBe('C-12345678')
    })
  })

  describe('numberToCurrency', () => {
    it('should format positive numbers to currency', () => {
      expect(numberToCurrency(100)).toBe('S/ 100.00')
    })
    it('should format negative numbers to currency with parentheses', () => {
      expect(numberToCurrency(-100)).toBe('(S/ 100.00)')
    })
    it('should format zero to currency', () => {
      expect(numberToCurrency(0)).toBe('S/ 0.00')
    })
  })

  describe('extractFirstRoutePart', () => {
    it('should extract the first part of the route', () => {
      expect(extractFirstRoutePart('/kardexs')).toBe('kardexs')
      expect(extractFirstRoutePart('/productos/actualizar')).toBe('productos')
    })
    it('should return null for invalid routes', () => {
      expect(extractFirstRoutePart('')).toBeNull()
      expect(extractFirstRoutePart('/')).toBeNull()
    })
  })

  describe('cn utility function', () => {
    it('should merge class names correctly', () => {
      const condition = false
      expect(cn('class1', 'class2')).toBe('class1 class2')
      expect(cn('class1', condition && 'class2')).toBe('class1')
      expect(cn('class1', undefined, 'class3')).toBe('class1 class3')
    })
  })

  describe('formatDate', () => {
    it('should format date to YYYY-MM-DD', () => {
      expect(formatDate('2022-01-01')).toBe('2022-01-01')
      expect(formatDate('2022-12-31')).toBe('2022-12-31')
    })
    it('should handle invalid date strings', () => {
      expect(() => formatDate('invalid-date')).toThrowError()
    })
  })
})
