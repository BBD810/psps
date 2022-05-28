import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { payment_request } from '../payments';
import * as _user from '../controller/user';
import styled from 'styled-components';
import logo from '../images/red-logo.svg';
import exitBtn from '../images/ico-toggle-white.svg';
import UserData from '../components/PaymentPage/UserData';
import ProductData from '../components/PaymentPage/ProductData';

const PaymentPage = () => {
	const history = useHistory();
	const location = useLocation();
	const [user, setUser] = useState('');
	const [checked, setChecked] = useState(false);
	const [pasteAddrChecked, setPasteAddrChecked] = useState(true);
	const [del_name, setDel_name] = useState('');
	const [del_tel, setDel_tel] = useState('');
	const [postAddr, setPostAddr] = useState('');
	const [postZoneCode, setPostZoneCode] = useState('');
	const [detailAddr, setDetailAddr] = useState('');
	const [del_req, setDel_req] = useState('');
	const [postcodeOpen, setPostcodeOpen] = useState(false);
	const [payment_product_list, setPayment_product_list] = useState([]);
	const [payment_name, setPayment_name] = useState('');
	const { orderCalc, amount, delivery_price } = location.state;
	const [orderState, setOrderState] = useState(false);

	useEffect(() => {
		if (!!!user) {
			_user.get_me().then((res) => {
				const { success, user } = res.data;
				if (success) {
					setUser(user);
				} else {
					history.push('/login');
				}
			});
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (del_name && del_tel && postAddr && detailAddr && postZoneCode) {
			setOrderState(true);
		} else {
			setOrderState(false);
		}
	}, [del_name, del_tel, postAddr, detailAddr, postZoneCode]);

	useEffect(() => {
		if (orderCalc) {
			let count = 0;
			let name;
			let productList = [];
			orderCalc.forEach((el) => {
				if (el.total !== 0) {
					el.checked_product_list.forEach((list) => {
						count++;
						name = list.product_title;
						productList = [
							...productList,
							{
								product_option_id: list.product_option_id,
								quantity: list.quantity,
							},
						];
					});
				}
			});
			if (count === 1) {
				setPayment_name(name);
			} else {
				setPayment_name(`${name} 외 ${count - 1}건`);
			}
			setPayment_product_list(productList);
		}
		// eslint-disable-next-line
	}, []);

	const goBack = () => {
		history.goBack();
	};

	const onOrder = () => {
		if (orderState) {
			const impData = {
				buyer_name: user.name,
				buyer_email: user.email,
				buyer_tel: user.phone_number,
				buyer_addr: user.address,
				buyer_postcode: user.postcode,
				name: payment_name,
				amount: amount + delivery_price,
			};
			const delivery = {
				del_name,
				del_tel,
				del_addr: postAddr + '/' + detailAddr,
				del_postcode: postZoneCode,
				del_price: delivery_price,
				del_req,
			};

			payment_request(
				impData,
				pasteAddrChecked,
				delivery,
				payment_product_list
			);
		}
	};

	return (
		<div id="container">
			<MobileNavbar>
				<ExitBtnImg alt="exit button image" src={exitBtn} onClick={goBack} />
				<NavbarTitle>주문하기</NavbarTitle>
			</MobileNavbar>
			<Container>
				<LogoImg alt="logo" src={logo} />
				<Title>주문하기</Title>
				<UserData
					user={user}
					checked={checked}
					setChecked={setChecked}
					pasteAddrChecked={pasteAddrChecked}
					setPasteAddrChecked={setPasteAddrChecked}
					postcodeOpen={postcodeOpen}
					setPostcodeOpen={setPostcodeOpen}
					postAddr={postAddr}
					setPostAddr={setPostAddr}
					postZoneCode={postZoneCode}
					setPostZoneCode={setPostZoneCode}
					detailAddr={detailAddr}
					setDetailAddr={setDetailAddr}
					del_name={del_name}
					setDel_name={setDel_name}
					del_tel={del_tel}
					setDel_tel={setDel_tel}
					setDel_req={setDel_req}
				/>
				<ProductData
					orderCalc={orderCalc}
					delivery_price={delivery_price}
					amount={amount}
				/>
				<BtnBox>
					<SubmitButton onClick={onOrder} state={orderState}>
						주문하기
					</SubmitButton>
					<BackButton onClick={goBack}>이전으로</BackButton>
				</BtnBox>
			</Container>
		</div>
	);
};

export default PaymentPage;

const Container = styled.div`
	max-width: 69.7rem;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 100px auto;
	${(props) => props.theme.device.tablet && `width:80rem;`}
	@media ${(props) => props.theme.device.mobile} {
		margin: 40px auto;
		max-width: 100vw;
		padding: 0 16px;
	}
`;
const LogoImg = styled.img`
	width: 6.4rem;
	height: 6.4rem;
	@media ${(props) => props.theme.device.mobile} {
		display: none;
	}
`;
const Title = styled.h2`
	font-size: 3rem;
	font-family: 'kr-b';
	letter-spacing: -1.2px;
	margin: 1rem auto;
	@media ${(props) => props.theme.device.mobile} {
		display: none;
	}
`;
const BtnBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 34.6rem;
	margin: auto;
	@media ${(props) => props.theme.device.mobile} {
		width: 100%;
	}
`;
const SubmitButton = styled.button`
	width: 100%;
	height: 6.2rem;
	border-radius: 14px;
	font-size: 2.1rem;
	font-family: 'kr-r';
	letter-spacing: -0.84px;
	border: none;
	transition: all 200ms ease;
	background-color: #a0a0a0;
	color: #fff;
	margin: 6.05rem auto 1rem;
	cursor: default !important;
	${(props) =>
		props.state &&
		`background-color: #221814;
		cursor:pointer !important;
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
	`}
	@media ${(props) => props.theme.device.mobile} {
		font-size: 18px;
		height: 44px;
	}
`;
const BackButton = styled.button`
	width: 100%;
	height: 6.2rem;
	border-radius: 14px;
	font-size: 2.1rem;
	font-family: 'kr-r';
	letter-spacing: -0.84px;
	border: 1px solid #e50011;
	color: #e50011;
	background-color: #fff;
	transition: all 200ms ease;
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
	@media ${(props) => props.theme.device.mobile} {
		display: none;
	}
`;
const MobileNavbar = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 56px;
	background-color: #dc0e0c;
	z-index: 9999;
	padding: 16px;
	display: none;
	@media ${(props) => props.theme.device.mobile} {
		display: flex;
		justify-content: center;
	}
`;
const ExitBtnImg = styled.img`
	width: 24px;
	height: 24px;
	transform: rotate(180deg);
	position: fixed;
	left: 10px;
	cursor: pointer;
`;
const NavbarTitle = styled.h2`
	font-size: 18px;
	font-family: 'kr-b';
	letter-spacing: -0.72px;
	color: #ffffff;
`;
