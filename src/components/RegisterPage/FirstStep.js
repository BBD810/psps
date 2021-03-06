import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { regexp } from '../../data/regexp';
import * as _user from '../../controller/user';
import styled from 'styled-components';
import logo from '../../images/red-logo.svg';
import check_box from '../../images/check-box.svg';
import uncheck_box from '../../images/uncheck-box.svg';
import N_logo from '../../images/n-logo.svg';
import K_logo from '../../images/k-logo.svg';

const FirstStep = (props) => {
	const history = useHistory();
	const emailInput = useRef();
	const passwordInput = useRef();
	const passwordConfirmInput = useRef();
	const [agreeCheck, setAgreeCheck] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [check, setCheck] = useState({
		email: true,
		password: true,
		passwordConfirm: true,
	});
	const [isSubmit, setIsSubmit] = useState(false);
	const [allState, setAllState] = useState(false);

	useEffect(() => {
		const state = history.location.state;
		if (state) {
			setEmail(state.email);
			setPassword(state.password);
			setPasswordConfirm(state.passwordConfirm);
			state.agree ? setAgreeCheck(true) : setAgreeCheck(false);
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (check.email && check.password && check.passwordConfirm && agreeCheck) {
			setAllState(true);
		} else {
			setAllState(false);
		}
	}, [check, agreeCheck]);

	const agreeCheckController = () => {
		setAgreeCheck(!agreeCheck);
	};
	const goLogin = () => {
		history.push('/login');
	};
	const goAgree = () => {
		props.setStep(2);
		history.push({ state: { email, password, passwordConfirm } });
	};

	const emailController = (e) => {
		regexp.email.test(e.target.value)
			? setCheck({ ...check, email: true })
			: setCheck({ ...check, email: false });
		return setEmail(e.target.value);
	};
	const passwordController = (e) => {
		regexp.password.test(e.target.value)
			? setCheck({ ...check, password: true })
			: setCheck({ ...check, password: false });
		return setPassword(e.target.value);
	};
	const passwordConfirmController = (e) => {
		password === e.target.value
			? setCheck({ ...check, passwordConfirm: true })
			: setCheck({ ...check, passwordConfirm: false });
		return setPasswordConfirm(e.target.value);
	};

	const goNext = () => {
		if (allState) {
			setIsSubmit(true);
			if (!regexp.email.test(email)) {
				emailInput.current.focus();
				return setCheck({ ...check, email: false });
			} else if (!regexp.password.test(password)) {
				passwordInput.current.focus();
				return setCheck({ ...check, password: false });
			} else if (password !== passwordConfirm) {
				passwordConfirmInput.current.focus();
				return setCheck({ ...check, passwordConfirm: false });
			} else if (!agreeCheck) {
				return;
			} else if (email) {
				_user.check_email({ email }).then((res) => {
					const { success } = res.data;
					if (!success) {
						props.setAlertMsg('?????? ????????? ??????????????????');
						return props.setAlertState(true);
					} else {
						props.setStep(3);
						history.push({ state: { email, password, passwordConfirm } });
					}
				});
			}
		}
	};

	return (
		<Container>
			<RegisterInside>
				<LogoImg alt="logo" src={logo} />
				<Title>???????????? ????????????</Title>
				<Items>
					<ItemTitle>?????????</ItemTitle>
					<ItemInput
						ref={emailInput}
						value={email ? email : ''}
						onChange={emailController}
						placeholder={'????????? ????????? ??????????????????'}
						error={isSubmit && !check.email}
					/>
					{isSubmit && !check.email && (
						<InputError>{'????????? ?????? ????????? ???????????????.'}</InputError>
					)}
				</Items>
				<Items>
					<ItemTitle>????????????</ItemTitle>
					<ItemInput
						ref={passwordInput}
						type="password"
						value={password ? password : ''}
						onChange={passwordController}
						placeholder={'??????????????? ??????????????????'}
						error={isSubmit && !check.password}
					/>
					{isSubmit && !check.password && (
						<InputError>{`??????????????? 8?????? ???????????? ??????, ?????????, ??????????????? ???????????? ?????????.`}</InputError>
					)}
				</Items>
				<Items>
					<ItemTitle>???????????? ??????</ItemTitle>
					<ItemInput
						ref={passwordConfirmInput}
						type="password"
						value={passwordConfirm ? passwordConfirm : ''}
						onChange={passwordConfirmController}
						placeholder={'??????????????? ??????????????????'}
						error={isSubmit && !check.passwordConfirm}
					/>
					{isSubmit && !check.passwordConfirm && (
						<InputError>{`??????????????? ???????????? ????????????.`}</InputError>
					)}
				</Items>

				<AgreeBox>
					<AgreeLeft>
						<AgreeCheck
							alt=""
							src={agreeCheck ? check_box : uncheck_box}
							onClick={agreeCheckController}
						/>
						<AgreeAllText onClick={agreeCheckController}>
							???????????? ?????? ????????? ?????? ???????????????.
						</AgreeAllText>
					</AgreeLeft>
					<AgreeRight onClick={goAgree}>????????????</AgreeRight>
				</AgreeBox>
				<AgreeContents>
					???????????? ????????????(??????), ????????????????????????(??????)
				</AgreeContents>
				<SubmitButton state={allState} onClick={goNext}>
					????????????
				</SubmitButton>
				<EasyBox>
					<EasyLeft>
						<EasyLeftText>SNS???????????? ???????????? ????????????</EasyLeftText>
						<GoLoginBox>
							<EasyLeftText>?????? ???????????????????</EasyLeftText>
							<GoLogin onClick={goLogin}>????????? ??????</GoLogin>
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
				</EasyBox>
			</RegisterInside>
		</Container>
	);
};

export default FirstStep;

const Container = styled.div`
	width: 192rem;
	padding: 10rem 0 10.3rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const RegisterInside = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const LogoImg = styled.img`
	width: 6.4rem;
	height: 6.4rem;
	margin-bottom: 0.8rem;
`;
const Title = styled.h2`
	height: 4.4rem;
	font-size: 3rem;
	font-family: 'kr-b';
	color: #000000;
	margin-bottom: 4rem;
`;
const Items = styled.li`
	position: relative;
	${(props) => (props.last ? `margin-bottom:1.6rem;` : `margin-bottom:2rem`)}
`;
const ItemTitle = styled.p`
	height: 2rem;
	line-height: 2rem;
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #221814;
	position: absolute;
	top: -0.8rem;
	left: 1rem;
	padding: 0 0.5rem;
	background-color: #fff;
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
	${(props) => props.error && `&:focus{border 1px solid #E50011}`}
	&::placeholder {
		color: #c6c6c6;
	}
	&:focus {
		box-shadow: 2px 6px 15px #00000029;
	}
`;
const InputError = styled.p`
	height: 1.5rem;
	font-size: 1rem;
	font-family: 'kr-r';
	color: #e50011;
	margin-top: 0.6rem;
`;
const AgreeBox = styled.div`
	width: 34.6rem;
	height: 2rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 0.4rem;
`;
const AgreeLeft = styled.div`
	display: flex;
	align-items: center;
`;
const AgreeCheck = styled.img`
	width: 1.6rem;
	height: 1.6rem;
	cursor: pointer;
`;
const AgreeAllText = styled.p`
	font-size: 1.4rem;
	font-family: 'kr-b';
	color: #6b6462;
	margin-left: 0.9rem;
`;
const AgreeRight = styled.div`
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #6b6462;
	text-decoration: underline;
	cursor: pointer;
	&:hover {
		color: #e50011;
	}
`;
const AgreeContents = styled.p`
	width: 100%;
	text-align: left;
	font-size: 1rem;
	font-family: 'kr-r';
	color: #a0a0a0;
	margin: 0.8rem 0 1.6rem 0.4rem;
`;
const SubmitButton = styled.button`
	width: 34.6rem;
	height: 6.2rem;
	line-height: 6.2rem;
	margin-bottom: 4rem;
	font-size: 2.4rem;
	font-family: 'kr-r';
	color: #a0a0a0;
	background-color: #fff;
	border: 1px solid #a0a0a0;
	border-radius: 14px;
	transition: all 200ms ease;
	cursor: default !important;
	${(props) =>
		props.state &&
		`border: 1px solid #e50011; color: #e50011;	cursor: pointer !important;
		&:hover {
		background-color: #e50011;
		color: #fff;
	}`}
`;
const EasyBox = styled.div`
	width: 100%;
	height: 5.2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const EasyLeft = styled.div``;
const EasyLeftText = styled.p`
	font-size: 1.6rem;
	font-family: 'kr-b';
	color: #221814;
`;
const GoLoginBox = styled.div`
	display: flex;
	align-items: center;
`;
const GoLogin = styled.p`
	font-size: 1.6rem;
	font-family: 'kr-r';
	color: #6b6462;
	margin-left: 0.7rem;
	text-decoration: underline;
	cursor: pointer;
	&:hover {
		color: #e50011;
	}
`;
const EasyRight = styled.div`
	display: flex;
	align-items: center;
`;
const SocialLogoBox = styled.div`
	width: 5.2rem;
	height: 5.2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	${(props) =>
		props.NLogo
			? `background-color:#50AA34`
			: `background-color: #FFE733; margin-left:0.8rem;`}
`;
const SocialLogo = styled.img`
	width: 3.6rem;
	height: 3.6rem;
	cursor: pointer;
`;
