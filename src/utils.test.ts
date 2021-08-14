import { CoolorsPaletteWidgetError } from './CoolorsPaletteWidgetError';
import { normalizeColor } from './utils';

describe('utils', () => {
  describe('normalizeColor', () => {
    describe('test values without # symbol', () => {
      it('should work with short colors', () => {
        expect(normalizeColor('aaa')).toEqual('#AAAAAA');
        expect(normalizeColor('abc')).toEqual('#AABBCC');
        expect(normalizeColor('fed')).toEqual('#FFEEDD');
        expect(normalizeColor('DeD')).toEqual('#DDEEDD');
        expect(normalizeColor('012')).toEqual('#001122');
        expect(normalizeColor('a2d')).toEqual('#AA22DD');
      });

      it('should work with long colors', () => {
        expect(normalizeColor('aaaaaa')).toEqual('#AAAAAA');
        expect(normalizeColor('abcdef')).toEqual('#ABCDEF');
        expect(normalizeColor('FeDcBa')).toEqual('#FEDCBA');
        expect(normalizeColor('f0e1d2')).toEqual('#F0E1D2');
        expect(normalizeColor('012345')).toEqual('#012345');
        expect(normalizeColor('987542')).toEqual('#987542');
      });
    });

    describe('test values with # symbol', () => {
      it('should work with short colors', () => {
        expect(normalizeColor('#ccc')).toEqual('#CCCCCC');
        expect(normalizeColor('#cba')).toEqual('#CCBBAA');
        expect(normalizeColor('#def')).toEqual('#DDEEFF');
        expect(normalizeColor('#aFd')).toEqual('#AAFFDD');
        expect(normalizeColor('#456')).toEqual('#445566');
        expect(normalizeColor('#b4c')).toEqual('#BB44CC');
      });

      it('should work with long colors', () => {
        expect(normalizeColor('#cccccc')).toEqual('#CCCCCC');
        expect(normalizeColor('#fedcba')).toEqual('#FEDCBA');
        expect(normalizeColor('#aBcDeF')).toEqual('#ABCDEF');
        expect(normalizeColor('#c3b2a1')).toEqual('#C3B2A1');
        expect(normalizeColor('#789012')).toEqual('#789012');
        expect(normalizeColor('#146809')).toEqual('#146809');
      });
    });

    describe('test invalid values', () => {
      it('should throw on multiple # symbols', () => {
        expect(() => normalizeColor('##ccc')).toThrowError(new CoolorsPaletteWidgetError('Malformed color: ##ccc'));
        expect(() => normalizeColor('##abcdef')).toThrowError(new CoolorsPaletteWidgetError('Malformed color: ##abcdef'));
        expect(() => normalizeColor('##ACD234')).toThrowError(new CoolorsPaletteWidgetError('Malformed color: ##ACD234'));
      });

      it('should throw on invalid length', () => {
        expect(() => normalizeColor('#f')).toThrowError(new CoolorsPaletteWidgetError('Malformed color: #f'));
        expect(() => normalizeColor('#ab')).toThrowError(new CoolorsPaletteWidgetError('Malformed color: #ab'));
        expect(() => normalizeColor('#cccc')).toThrowError(new CoolorsPaletteWidgetError('Malformed color: #cccc'));
        expect(() => normalizeColor('#abcd1')).toThrowError(new CoolorsPaletteWidgetError('Malformed color: #abcd1'));
        expect(() => normalizeColor('#0123456789')).toThrowError(new CoolorsPaletteWidgetError('Malformed color: #0123456789'));
      });
    });
  });
});
