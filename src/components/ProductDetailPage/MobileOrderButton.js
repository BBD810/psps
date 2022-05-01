import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { cart_newData } from '../../modules/cart';
import styled, { css, keyframes } from 'styled-components';
import * as _basket from '../../controller/basket';
import angleDown from '../../images/angle-down.svg';
import increase from '../../images/count-plus.svg';
import decrease from '../../images/count-minus.svg';

const MobileOrderButton = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const optionEl = useRef();
	const [option, setOption] = useState('');
	const [count, setCount] = useState(1);
	const [payBtnState, setPayBtnState] = useState(false);
	const [optionBoxState, setOptionBoxState] = useState(false);

	useEffect(() => {
		!!!option && setOption(props.optionList[0]);
	}, [props]);

	const clickPayBtn = () => {
		setPayBtnState(true);
	};

	const clickOptionBox = () => {
		setOptionBoxState(true);
	};

	const clickOption = (option) => {
		setOption(option);
		setCount(1);
		setOptionBoxState(false);
	};
	const decreaseCount = () => {
		count !== 1 && setCount(count - 1);
	};

	const increaseCount = () => {
		setCount(count + 1);
	};

	const onAddCart = () => {
		if (!!!option) {
			return;
		} else if (!props.user.login) {
			return alert('로그인 후 이용가능합니다');
		}
		props.setCartAlertState({ successTrue: false, successFalse: false });
		const data = {
			product_option_id: option.product_option_id,
			quantity: count,
		};
		_basket.add_cart(data).then((res) => {
			const { success } = res.data;
			if (success) {
				alertMessage(success);
				dispatch(cart_newData(count));
			} else {
				alertMessage(success);
			}
			setPayBtnState(false);
		});
	};

	function alertMessage(success) {
		success
			? props.setCartAlertState({ ...props.cartAlertState, successTrue: true })
			: props.setCartAlertState({
					...props.cartAlertState,
					successFalse: true,
			  });
		setTimeout(() => {
			if (
				props.cartAlertState.successTrue ||
				props.cartAlertState.successFalse
			) {
				props.setCartAlertState({ successTrue: false, successFalse: false });
			}
		}, 5000);
	}

	const goPayment = async () => {
		if (!props.user.login) {
			props.setAlertMsg('로그인 후 이용가능합니다');
			return props.setAlertState(true);
		}

		history.push({
			pathname: '/payment',
			state: {
				orderCalc: [
					{
						supplier_name: props.detail.supplier_name,
						total: (option.price - option.discount) * count,
						delivery_price: 3000,
						checked_product_list: [
							{
								product_option_id: option.product_option_id,
								product_option_title: option.title,
								quantity: count,
								total: (option.price - option.discount) * count,
								total_price: (option.price - option.discount) * count,
								product_title: props.detail.title,
							},
						],
					},
				],
				delivery_price: 3000,
				amount: (option.price - option.discount) * count,
			},
		});
	};

	const closeOption = (e) => {
		if (optionBoxState) {
			(!optionEl.current || !optionEl.current.contains(e.target)) &&
				setOptionBoxState(false);
		}
	};

	const closeOrderWrap = () => {
		setPayBtnState(false);
	};

	return (
		<Container payBtnState={payBtnState} onClick={closeOption}>
			{!payBtnState && <PayButton onClick={clickPayBtn}>구매하기</PayButton>}
			{payBtnState && (
				<OrderWrap state={payBtnState}>
					<CloseLineBox onClick={closeOrderWrap}>
						<CloseLine></CloseLine>
					</CloseLineBox>
					{!optionBoxState ? (
						<OptionBox option onClick={clickOptionBox}>
							{option && option.title}
							<OptionTitle>옵션</OptionTitle>
							<ToggleBtn alt="toggle image" src={angleDown} />
						</OptionBox>
					) : (
						<OptionBox>
							<OptionListBox state={optionBoxState} ref={optionEl}>
								{props.optionList.map((el, idx) => (
									<OptionList
										key={idx}
										active={option && el.title === option.title}
										onClick={() => {
											clickOption(el);
										}}
									>
										<OptionListText>{el.title}</OptionListText>
										<OptionListText>
											{(el.price - el.discount).toLocaleString()}
										</OptionListText>
									</OptionList>
								))}
							</OptionListBox>
						</OptionBox>
					)}
					<OptionBox>
						<OptionTitle>수량</OptionTitle>
						<CountBtnImg
							minus
							alt="count button image"
							src={decrease}
							onClick={decreaseCount}
						/>
						{count}
						<CountBtnImg
							plus
							alt="count button image"
							src={increase}
							onClick={increaseCount}
						/>
					</OptionBox>
					<PriceBox>
						<Price title="true">배송비</Price>
						<Price>3,000원</Price>
					</PriceBox>
					<PriceBox bottom>
						<Price title="true">상품 금액</Price>
						<Price>
							<DecoPrice>{`${
								option && (option.price * count).toLocaleString()
							}원`}</DecoPrice>
							{`${
								option &&
								((option.price - option.discount) * count).toLocaleString()
							}원`}
						</Price>
					</PriceBox>
					<PriceBox total>
						<Price title="true">예상 주문 금액</Price>
						<Price total>{`${
							option &&
							((option.price - option.discount) * count + 3000).toLocaleString()
						}원`}</Price>
					</PriceBox>
					<ButtonBox>
						<SubmitButton cartBtn onClick={onAddCart}>
							장바구니
						</SubmitButton>
						<SubmitButton orderBtn onClick={goPayment}>
							주문하기
						</SubmitButton>
					</ButtonBox>
				</OrderWrap>
			)}
		</Container>
	);
};

export default MobileOrderButton;

const Container = styled.div`
	width: 100vw;
	position: fixed;
	bottom: 0;
	background-color: #ffffff3a;
	z-index: 999;
	border: 1px solid #a0a0a0;
	padding: 14px 16px;
	display: none;
	transition: all 300ms ease;
	@media ${(props) => props.theme.device.mobile} {
		display: block;
	}
	${(props) => props.payBtnState && `height: 100vh; background-color:#000000a6`}
`;
const PayButton = styled.button`
	width: 100%;
	padding: 9px;
	background-color: #dc0e0c;
	border: none;
	border-radius: 4px;
	font-size: 18px;
	font-family: 'kr-r';
	color: #fff;
	letter-spacing: -0.72px;
`;
const orderBoxFade = keyframes`
	0% {
		opacity: 0;
		transform: translateY(70%);
	}
	100%{
		opacity: 1;
		transform: translateY(0%);
	}
`;
const OrderWrap = styled.div`
	width: 100vw;
	background-color: #fff;
	position: fixed;
	bottom: 0;
	left: 0;
	border-radius: 14px 14px 0 0;
	padding: 14px 16px;
	${(props) =>
		props.state &&
		css`
			animation: ${orderBoxFade} 500ms ease;
		`}
`;
const CloseLineBox = styled.div`
	width: 100%;
	height: 20px;
	padding: 0 38% 16px;
	margin-bottom: 10px;
`;
const CloseLine = styled.div`
	width: 100%;
	height: 100%;
	max-width: 100px;
	margin: auto;
	border-radius: 10px;
	background-color: #e0e0e0;
`;

const OptionBox = styled.div`
	height: 62px;
	border: 1px solid #c6c6c6;
	border-radius: 14px;
	position: relative;
	padding: 20px;
	font-size: 14px;
	font-family: 'kr-b';
	letter-spacing: -0.56px;
	color: #221814;
	text-align: center;
	margin-bottom: 3rem;
	${(props) => props.option && `cursor: pointer !impotent;`}
`;
const OptionTitle = styled.p`
	width: fit-content;
	position: absolute;
	font-size: 14px;
	font-family: 'kr-r';
	letter-spacing: -0.56px;
	color: #221814;
	padding: 0 4px;
	background-color: #fff;
	top: -10px;
	left: 7px;
`;
const ToggleBtn = styled.img`
	position: absolute;
	width: 19px;
	right: 2.7rem;
	top: 30%;
	border-radius: 50%;
	box-shadow: 0px 3px 6px #00000029;
`;

const OptionListBox = styled.ul`
	width: 100.4%;
	width: calc(100% + 2px);
	max-height: 190px;
	position: absolute;
	top: -15px;
	left: -0.8px;
	background-color: #fff;
	border: 1px solid #c6c6c6;
	border-radius: 14px;
	z-index: 999;
	overflow-y: auto;
	${(props) =>
		props.state &&
		css`
			animation: ${orderBoxFade} 300ms;
		`}
`;
const OptionList = styled.li`
	display: flex;
	justify-content: space-between;
	padding: 20px;
	font-size: 14px;
	font-family: 'kr-r';
	letter-spacing: -0.56px;
	color: #221814;
	border-radius: 14px;
	transition: all 200ms ease;
	${(props) => props.active && `font-family:'kr-b';`}
	&:hover {
		background-color: #f2f2f2;
	}
`;
const OptionListText = styled.p``;
const CountBtnImg = styled.img`
	width: 19px;
	height: 19px;
	position: absolute;
	border-radius: 50%;
	box-shadow: 0px 3px 6px #00000029;
	${(props) => props.minus && `left:2.7rem;`}
	${(props) => props.plus && `right:2.7rem;`}
`;
const PriceBox = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	font-size: 14px;
	padding-bottom: 12px;
	color: #7c7c7c;
	${(props) => props.bottom && `border-bottom:1px solid #f4f4f4`}
	${(props) => props.total && `color: #E50F11; padding-bottom:10px;`}
`;
const Price = styled.p`
	font-family: 'ro-b';
	letter-spacing: -0.56px;
	${(props) => props.title && `font-family: 'kr-r';`}
	${(props) => props.total && `font-size:24px; margin-top:10px;`}
`;
const DecoPrice = styled.span`
	text-decoration: line-through;
	font-size: 11px;
	font-family: 'ro-r';
	letter-spacing: -0.44px;
	margin-right: 6px;
`;
const ButtonBox = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin: 10px 0 0;
`;
const SubmitButton = styled.button`
	width: 158px;
	width: 48%;
	line-height: 7.2rem;
	font-size: 2.4rem;
	font-family: 'kr-r';
	color: #fff;
	letter-spacing: -0.96px;
	border: none;
	background: #221814 0% 0% no-repeat padding-box;
	border-radius: 14px;
	transition: all 200ms ease;
	${(props) =>
		props.cartBtn &&
		`background-color:#fff; color: #e50011;	border: 1px solid #e50011;`}
	${(props) => props.orderBtn && ``}
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
`;
