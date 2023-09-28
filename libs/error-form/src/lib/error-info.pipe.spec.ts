import { ErrorInfoPipe } from './error-info.pipe';

describe('ErrorInfoPipe', () => {
  it('create an instance', () => {
    const pipe = new ErrorInfoPipe();
    expect(pipe).toBeTruthy();
  });
});
