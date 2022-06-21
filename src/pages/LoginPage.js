import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { user_login } from '../modules/user';
import * as _user from '../controller/user';
import styled from 'styled-components';
import logo from '../images/red-logo.svg';
import Alert from '../components/Modal/Alert';
// import N_logo from '../images/n-logo.svg';
// import K_logo from '../images/k-logo.svg';

const LoginPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [alertState, setAlertState] = useState(false);
	const [alertMsg, setAlertMsg] = useState('');

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const onChangeEmail = (e) => {
		setEmail(e.target.value);
	};
	const onChangePassword = (e) => {
		setPassword(e.target.value);
	};
	const goFindInfo = () => {
		history.push('/find-info');
	};

	const onKeyPress = (e) => {
		e.key === 'Enter' && onSubmit();
	};
	// const goRegister = () => {
	// 	history.push('/register');
	// };

	const onSubmit = () => {
		if (email.length === 0) {
			setAlertMsg('아이디를 입력해주세요.');
			return setAlertState(true);
		} else if (password.length === 0) {
			setAlertMsg('비밀번호를 입력해주세요.');
			return setAlertState(true);
		} else {
			const data = { email, password };
			_user.login(data).then((res) => {
				if (res.data.success) {
					dispatch(user_login(true));
					history.push('/');
				} else {
					setAlertMsg('아이디 또는 비밀번호를 확인해주세요.');
					return setAlertState(true);
				}
			});
		}
	};

	return (
		<div id="container">
			<Container>
				<RegisterInside>
					<LogoImg alt="logo" src={logo} />
					<Title>품생품사 로그인</Title>
					<Items>
						<ItemTitle>이메일</ItemTitle>
						<ItemInput
							value={email ? email : ''}
							onChange={onChangeEmail}
							placeholder={'이메일 주소를 입력해주세요'}
						/>
					</Items>
					<Items last>
						<ItemTitle>비밀번호</ItemTitle>
						<ItemInput
							type="password"
							value={password ? password : ''}
							onChange={onChangePassword}
							placeholder={'비밀번호를 입력해주세요'}
							onKeyPress={onKeyPress}
						/>
					</Items>
					<FindBox>
						<FindText onClick={goFindInfo}>아이디/비밀번호 찾기</FindText>
					</FindBox>
					<SubmitButton onClick={onSubmit}>로그인</SubmitButton>
					{/* <EasyBox>
						<EasyLeft>
							<EasyLeftText>SNS계정으로 간편하게 로그인</EasyLeftText>
							<GoLoginBox>
								<EasyLeftText>회원이 아니신가요?</EasyLeftText>
								<GoRegister onClick={goRegister}>회원가입</GoRegister>
							</GoLoginBox>
						</EasyLeft>
						<EasyRight>
							<SocialLogoBox NLogo>
								<SocialLogo alt="icon" src={N_logo} />
							</SocialLogoBox>
							<SocialLogoBox KLogo>
								<SocialLogo alt="icon" src={K_logo} />
							</SocialLogoBox>
						</EasyRight>
					</EasyBox> */}
				</RegisterInside>
			</Container>
			{alertState && (
				<Alert
					title={'로그인 안내'}
					msg={alertMsg}
					setAlertState={setAlertState}
				/>
			)}
		</div>
	);
};

export default LoginPage;

const Container = styled.div`
	width: 192rem;
	max-width: 100vw;
	padding: 10rem 0 10.3rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 9.2rem;
`;
const RegisterInside = styled.div`
	max-width: 90vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	@media ${(props) => props.theme.device.mobile} {
		width: 100%;
	}
`;
const LogoImg = styled.img`
	width: 6.4rem;
	height: 6.4rem;
	margin-bottom: 0.8rem;
	@media ${(props) => props.theme.device.mobile} {
		display: none;
	}
`;
const Title = styled.h2`
	height: 4.4rem;
	font-size: 3rem;
	font-family: 'kr-b';
	color: #000000;
	margin-bottom: 4rem;
	@media ${(props) => props.theme.device.mobile} {
		font-size: 24px;
		margin-bottom: 32px;
	}
`;
const Items = styled.li`
	position: relative;
	@media ${(props) => props.theme.device.mobile} {
		margin-bottom: 12px;
		width: 90vw;
	}
	${(props) => (props.last ? `margin-bottom:0.8rem;` : `margin-bottom:2rem`)}
`;
const ItemTitle = styled.p`
	height: 2rem;
	line-height: 2rem;
	position: absolute;
	top: -0.8rem;
	left: 1rem;
	padding: 0 0.5rem;
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #221814;
	background-color: #fff;
	@media ${(props) => props.theme.device.mobile} {
		display: none;
	}
`;
const ItemInput = styled.input`
	width: 34.6rem;
	height: 6.4rem;
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #221814;
	padding-left: 1.2rem;
	border: 1px solid #c6c6c6;
	border-radius: 14px;
	background-color: #fff;
	@media ${(props) => props.theme.device.mobile} {
		width: 100%;
		font-size: 14px;
		padding: 20px 12px;
	}
	&::placeholder {
		color: #c6c6c6;
	}
	&:focus {
		box-shadow: 2px 6px 15px #00000029;
	}
`;
const FindBox = styled.div`
	width: 100%;
	height: 2rem;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;
const FindText = styled.div`
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #6b6462;
	text-decoration: underline;
	cursor: pointer;
	@media ${(props) => props.theme.device.mobile} {
		font-size: 12px;
	}
	&:hover {
		color: #e50011;
	}
`;
const SubmitButton = styled.button`
	width: 34.6rem;
	height: 6.2rem;
	line-height: 6.2rem;
	margin-top: 3.9rem;
	margin-bottom: 4rem;
	font-size: 2.4rem;
	font-family: 'kr-r';
	color: #e50011;
	background-color: #fff;
	border: 1px solid #e50011;
	border-radius: 14px;
	transition: all 200ms ease;
	@media ${(props) => props.theme.device.mobile} {
		font-size: 18px;
		width: 100%;
		height: 44px;
	}
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
`;

// const EasyBox = styled.div`
// 	width: 100%;
// 	height: 5.2rem;
// 	display: flex;
// 	justify-content: space-between;
// 	align-items: center;
// `;
// const EasyLeft = styled.div``;
// const EasyLeftText = styled.p`
// 	font-size: 1.6rem;
// 	font-family: 'kr-b';
// 	color: #221814;
// `;
// const GoLoginBox = styled.div`
// 	display: flex;
// 	align-items: center;
// `;
// const GoRegister = styled.p`
// 	font-size: 1.6rem;
// 	font-family: 'kr-r';
// 	color: #6b6462;
// 	margin-left: 1.3rem;
// 	text-decoration: underline;
// 	cursor: pointer;
// 	&:hover {
// 		color: #e50011;
// 	}
// `;
// const EasyRight = styled.div`
// 	display: flex;
// 	align-items: center;
// `;
// const SocialLogoBox = styled.div`
// 	width: 5.2rem;
// 	height: 5.2rem;
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// 	border-radius: 4px;
// 	${(props) =>
// 		props.NLogo
// 			? `background-color:#50AA34`
// 			: `background-color: #FFE733; margin-left:0.8rem;`}
// `;
// const SocialLogo = styled.img`
// 	width: 3.6rem;
// 	height: 3.6rem;
// 	cursor: pointer;
// `;
// const NonMemberInfo = styled.p`
// 	width: 100%;
// 	text-decoration: underline;
// 	text-align: end;
// 	letter-spacing: -0.56px;
// 	color: #6b6462;
// 	font-size: 1.4rem;
// 	font-family: 'kr-r';
// 	margin-top: 2rem;
// 	cursor: pointer;
// 	&:hover {
// 		color: #e50011;
// 	}
// `;
