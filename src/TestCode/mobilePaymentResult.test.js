import * as MobilePayResult from '../function/mobilePaymentResult';

it('아임포트 결제 결과가 성공으로 나와야 함', () => {
	expect(MobilePayResult.impGetChange(true)).toEqual('성공');
});
