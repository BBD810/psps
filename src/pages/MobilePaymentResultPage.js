import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { impGetChange } from '../function/mobilePaymentResult';
import styled from 'styled-components';
import Spinner from '../components/Spinner';

const MobilePaymentResultPage = () => {
	const location = useLocation();
	const history = useHistory();
	const [result, setResult] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	// TODO : 서버에서 아임포트로 결제검증받는 코드 완성되면 수정하기
	const newFunction = () => {
		return setResult(
			impGetChange(location.search.includes('imp_success=true'))
		);
	};

	useEffect(() => {
		setIsLoading(true);
		let isSubscribed = true;
		isSubscribed && newFunction();
		setIsLoading(false);
		return () => {
			isSubscribed = false;
		};
	}, [location.search]);

	const goMyPage = () => {
		history.push('/members');
	};

	const goBack = () => {
		history.go(-2);
	};

	return isLoading ? (
		<Spinner />
	) : (
		<div id="container">
			<Container>
				<Result>
					결제가 {result === '성공' ? '완료되었습니다.' : '실패되었습니다.'}
				</Result>
				{result === '성공' && (
					<ShoppingButton onClick={goMyPage}>주문내역보기</ShoppingButton>
				)}
				{result === '실패' && (
					<BackButton onClick={goBack}>이전으로</BackButton>
				)}
			</Container>
		</div>
	);
};

export default MobilePaymentResultPage;

const Container = styled.div`
	width: 100%;
	height: 110vw;
	padding: 100px 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Result = styled.div`
	font-size: 20px;
	margin-bottom: 20px;
`;
const ShoppingButton = styled.button`
	width: 70%;
	height: 44px;
	border-radius: 14px;
	font-size: 18px;
	font-family: 'kr-r';
	letter-spacing: -0.84px;
	border: none;
	color: #fff;
	background-color: #221814;
	transition: all 200ms ease;
	margin-bottom: 10px;
	&:hover {
		background-color: #e50011;
	}
`;
const BackButton = styled(ShoppingButton)`
	border: 1px solid #e50011;
	color: #e50011;
	background-color: #fff;
`;
