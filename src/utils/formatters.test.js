import { sizeFormatter } from './formatters';

describe('sizeFormatter', () => {
    it('can format different formats', () => {
        [
            ['100000', '100.00 kB'],
            ['1000001', '1.00 MB'],
            ['100', '100 bytes'],
            ['123456789', '123.46 MB']
        ].forEach(v => expect(sizeFormatter(v[0])).toEqual(v[1]));
    });
});
