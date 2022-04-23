import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import logo from '../../images/red-logo.svg';
import cartIco from '../../images/ico-mobileCart.svg';
import toggleIco from '../../images/ico-toggle-white.svg';
import MobileMenu from './MobileMenu';
import Alert from '../Modal/Alert';

const MobileNavbar = () => {
	const location = useLocation();
	const history = useHistory();
	const user = useSelector((state) => state.user);
	const [menuState, setMenuState] = useState(false);
	const [alertState, setAlertState] = useState(false);
	const [alertMsg, setAlertMsg] = useState('');

	const goShopping = () => {
		history.push('/product');
	};
	const goCart = () => {
		history.push('/cart');
	};
	const goHome = () => {
		history.push('/');
	};
	const goMenu = () => {
		setMenuState(!menuState);
	};

	return (
		<Container menuState={menuState}>
			<NavbarWarp path={location.pathname === '/product'}>
				{menuState && (
					<NavbarInfoBox>
						{user.login ? (
							<UserNameBox>{`${user.name} 님`}</UserNameBox>
						) : (
							<LoginOrRegInfoBox>
								{`로그인 / 회원가입`}
								<LoginOrRegInfo>을 해주세요</LoginOrRegInfo>
							</LoginOrRegInfoBox>
						)}
						<ToggleImg alt="toggle image" src={toggleIco} />
					</NavbarInfoBox>
				)}
				<MenuAndLogo>
					<MenuBox onClick={goMenu} menuState={menuState}>
						<MenuLine></MenuLine>
						<MenuLine></MenuLine>
						<MenuLine></MenuLine>
					</MenuBox>
					{!menuState && (
						<LogoImgBox onClick={goHome}>
							<LogoImg alt="logo image" src={logo} />
						</LogoImgBox>
					)}
				</MenuAndLogo>
				{!menuState && (
					<ShoppingAndCart>
						<GoShopping onClick={goShopping}>{`쇼핑하기`}</GoShopping>
						<CartImgBox onClick={goCart}>
							<CartImg alt="cart icon image" src={cartIco} />
						</CartImgBox>
					</ShoppingAndCart>
				)}
			</NavbarWarp>
			{menuState && (
				<MobileMenu
					setMenuState={setMenuState}
					setAlertState={setAlertState}
					setAlertMsg={setAlertMsg}
				/>
			)}
			{alertState && (
				<Alert title={'로그인 안내'} msg={alertMsg} setAlertMsg={setAlertMsg} />
			)}
		</Container>
	);
};

export default MobileNavbar;

const Container = styled.div`
	width: 100vw;
	position: fixed;
	top: 0rem;
	z-index: 100;
	display: none;
	background-color: #fff;
	transition: all 200ms ease;
	@media ${(props) => props.theme.device.mobile} {
		display: block;
	}
	${(props) => props.menuState && `background-color:#DC0E0C`}
`;
const NavbarWarp = styled.div`
	width: 100%;
	height: 56px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0px 3px 10px #0000000f;
	${(props) => props.path && `box-shadow: none;`}
`;
const NavbarInfoBox = styled.div`
	display: flex;
	font-size: 14px;
	font-family: 'kr-b';
	letter-spacing: -0.56px;
	color: #ffffff;
	margin-left: 16px;
	display: flex;
	align-items: center;
`;
const UserNameBox = styled(NavbarInfoBox)`
	margin-left: 0;
`;
const LoginOrRegInfoBox = styled(NavbarInfoBox)`
	margin-left: 0;
`;
const LoginOrRegInfo = styled.p`
	font-family: 'kr-r';
`;
const ToggleImg = styled.img`
	width: 24px;
	height: 24px;
`;
const MenuAndLogo = styled.div`
	padding: 0 16px;
	display: flex;
	align-items: center;
	margin-right: -10px;
`;
const MenuLine = styled.li`
	width: 100%;
	border: 1.5px solid #221814;
	border-radius: 5px;
	margin: 3.5px;
`;
const MenuBox = styled.ul`
	width: 50px;
	padding: 7.5px 9px;
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	${(props) =>
		props.menuState &&
		`${MenuLine} {
			width:70%;
		:nth-child(1) {
			transform: rotate(-45deg) translate(-12%, 4px);
			border-color: #fff;
		}
		:nth-child(2) {
			display: none;
		}
		:nth-child(3) {
			transform: rotate(45deg) translate(-12%, -4px);
			border-color: #fff;
		}
	}`}
`;
const LogoImgBox = styled.div`
	width: 36px;
	height: 36px;
	cursor: pointer;
`;
const LogoImg = styled.img`
	width: 100%;
	height: 100%;
	margin-left: 10px;
`;
const ShoppingAndCart = styled(MenuAndLogo)``;
const GoShopping = styled.p`
	font-size: 14px;
	font-family: 'kr-b';
	letter-spacing: -0.56px;
	color: #221814;
	padding: 8px;
	cursor: pointer;
`;
const CartImgBox = styled(LogoImgBox)``;
const CartImg = styled(LogoImg)`
	margin-left: 0;
`;
