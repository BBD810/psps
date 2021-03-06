import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as _user from '../controller/user';
import styled from 'styled-components';

import logoImg from '../images/red-logo.svg';
import Alert from '../components/Modal/Alert';

const WithdrawalPage = () => {
	const history = useHistory();
	const [password, setPassword] = useState('');
	const [check, setCheck] = useState(false);
	const [alertState, setAlertState] = useState(false);
	const [alertMsg, setAlertMsg] = useState('');
	const arr = [
		`개인정보 삭제는 취소/교환/환불 및 사후처리 등을 위해 전자상거래 등 소비자 보호에 관한 법률에 의거 일정 기간동안 보관 후 파기됩니다.`,
		'탈퇴 시 개인정보가 삭제되면 복원할 수 없습니다.',
		'탈퇴 시 개인정보가 삭제된 후에는 주문내역 확인 및 취소/교환/환불에 어려움이 있을 수 있습니다.',
	];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const goBack = () => {
		history.push({ pathname: '/members', state: { type: '개인정보관리' } });
	};

	const clickWithdrawal = () => {
		if (check) {
			_user.withdrawal({ password }).then((res) => {
				const { success } = res.data;
				if (success) {
					setAlertMsg('회원탈퇴가 완료되었습니다.');
					history.push('/');
				} else {
					setAlertMsg('비밀번호가 맞지 않습니다.');
				}
				setAlertState(true);
			});
		}
	};

	const changePassword = (e) => {
		setPassword(e.target.value);
		if (e.target.value.length >= 8) {
			setCheck(true);
		} else {
			setCheck(false);
		}
	};

	return (
		<div id="container">
			<Container>
				<LogoImg alt="logo image" src={logoImg} />
				<Title>회원탈퇴</Title>
				<WithdrawalInfo>
					<InfoTitle>{`그동안 품생품사를 이용해주셔서 감사합니다.\n회원 탈퇴 전 유의사항을 확인해주세요.`}</InfoTitle>
					<InfoMessageBox>
						{arr.map((el, idx) => (
							<InfoMessage key={idx}>· {el}</InfoMessage>
						))}
					</InfoMessageBox>
				</WithdrawalInfo>
				<InputItemBox>
					<ItemTitle>비밀번호</ItemTitle>
					<InputItem
						type="password"
						onChange={changePassword}
						placeholder="비밀번호를 입력해주세요."
					/>
				</InputItemBox>
				<SubmitButton onClick={clickWithdrawal} state={check}>
					회원탈퇴
				</SubmitButton>
				<BackButton onClick={goBack}>이전으로</BackButton>
			</Container>
			{alertState && (
				<Alert
					title={'회원탈퇴 안내'}
					msg={alertMsg}
					setAlertState={setAlertState}
				/>
			)}
		</div>
	);
};

export default WithdrawalPage;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10rem 0;
`;
const LogoImg = styled.img`
	width: 6.4rem;
	height: 6.4rem;
`;
const Title = styled.h2`
	font-size: 3rem;
	font-family: 'kr-b';
	letter-spacing: -1.2px;
	margin: 0.8rem auto 4rem;
`;
const WithdrawalInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const InfoTitle = styled.p`
	font-size: 2rem;
	font-family: 'kr-b';
	margin-bottom: 2.4rem;
	letter-spacing: -0.8px;
	text-align: center;
`;
const InfoMessageBox = styled.div`
	width: 50rem;
	/* border: 1px solid #e6e6e6; */
	border-radius: 24px;
	padding: 2rem 3rem;
`;
const InfoMessage = styled.p`
	font-size: 1.4rem;
	font-family: 'kr-r';
	margin-bottom: 1rem;
	word-break: keep-all;
`;
const InputItemBox = styled.div`
	position: relative;
	width: 34.6rem;
	font-size: 1.4rem;
	font-family: 'kr-r';
	letter-spacing: -0.56px;
	color: #221814;
	margin: 3rem auto 0;
`;
const ItemTitle = styled.p`
	position: absolute;
	font-size: 1.4rem;
	top: -1rem;
	left: 1.4rem;
	padding: 0 0.2rem;
	background-color: #fff;
`;
const InputItem = styled.input`
	width: 100%;
	background-color: #fff;
	padding: 2.1rem 1.4rem;
	border-radius: 14px;
	font-size: 1.4rem;
`;
const SubmitButton = styled.button`
	width: 34.6rem;
	padding: 1.2rem;
	border: none;
	border-radius: 14px;
	background-color: #a0a0a0;
	font-size: 2.4rem;
	font-family: 'kr-r';
	letter-spacing: -0.96px;
	color: #fff;
	margin: 3rem auto 0;
	transition: all 200ms ease;
	cursor: default !important;
	${(props) =>
		props.state &&
		`background-color: #221814; cursor: pointer !important; &:hover {background-color: #e50011;}`}
`;
const BackButton = styled(SubmitButton)`
	border: 1px solid #e50011;
	color: #e50011;
	background-color: #fff;
	margin: 1rem auto 3rem;
	cursor: pointer !important;
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
`;
