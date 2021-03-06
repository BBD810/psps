import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const OrderBox = (props) => {
	const history = useHistory();
	const orderCalc = props.orderCalc;

	const goShopping = () => {
		history.push('/product');
	};
	const goPayment = () => {
		if (props.checked.length === 0) {
			return props.setAlertState(true);
		}

		history.push({
			pathname: '/payment',
			state: {
				orderCalc,
				delivery_price: props.delivery_price,
				amount: props.amount,
			},
		});
	};

	return (
		<OrderWrap>
			{props.supplierList &&
				props.supplierList.map((el, idx) => (
					<PriceBox
						key={idx}
						displayNon={orderCalc[idx] && orderCalc[idx].total === 0}
					>
						<TitleAndPrice>
							<PriceTitle>판매자</PriceTitle>
							<Price color={'#A0A0A0'}>{el[0]}</Price>
						</TitleAndPrice>
						<TitleAndPrice>
							<PriceTitle>총 상품 금액</PriceTitle>
							<Price color={'#e50011'}>
								{orderCalc[idx] && orderCalc[idx].total.toLocaleString()}원
							</Price>
						</TitleAndPrice>
						<TitleAndPrice>
							<PriceTitle>배송비 {el.total}</PriceTitle>
							<Price color={'#e50011'}>
								{props.orderCalc[idx] &&
									props.orderCalc[idx].delivery_price.toLocaleString()}
								원
							</Price>
						</TitleAndPrice>
					</PriceBox>
				))}

			<PredictionPriceTitle>예상 결제 금액</PredictionPriceTitle>
			<PredictionPrice>
				{props.amount && props.delivery_price
					? (props.amount + props.delivery_price).toLocaleString()
					: 0}
				<PredictionPriceWon>원</PredictionPriceWon>
			</PredictionPrice>
			<SubmitButton productOrder onClick={goPayment}>
				선택상품 주문하기
			</SubmitButton>
			<SubmitButton shopping onClick={goShopping}>
				쇼핑 계속하기
			</SubmitButton>
		</OrderWrap>
	);
};

export default OrderBox;

const OrderWrap = styled.div`
	width: 45.5rem;
	max-height: 71.5rem;
	border: 1px solid #e0e0e0;
	border-radius: 24px;
	padding: 4rem 5.5rem;
	position: sticky;
	top: 100px;
	overflow: auto;
	::-webkit-scrollbar {
		width: 1.5rem;
		background-color: transparent;
	}
	::-webkit-scrollbar-thumb {
		background-color: #e0e0e0;
		border-radius: 10px;
		background-clip: padding-box;
		border: 7px solid transparent;
		border-right: 5px solid transparent;
		border-top: 7px solid transparent;
		border-bottom: 5px solid transparent;
	}
`;
const PriceBox = styled.div`
	width: 100%;
	padding-bottom: 0.85rem;
	border-bottom: 1px solid #e0e0e0;
	margin-bottom: 2.45rem;
	${(props) => props.displayNon && `display:none; border:1px solid red;`}
`;
const TitleAndPrice = styled.div`
	display: flex;
	justify-content: space-between;
`;
const PriceTitle = styled.p`
	font-size: 2rem;
	font-family: 'kr-r';
	letter-spacing: -0.8px;
	color: #221814;
`;
const Price = styled.p`
	font-size: 2rem;
	font-family: 'kr-r';
	letter-spacing: -0.8px;
	color: ${(props) => props.color};
	margin-bottom: 1.6rem;
	text-align: end;
`;
const PredictionPriceTitle = styled.h2`
	font-size: 2.1rem;
	font-family: 'kr-b';
	letter-spacing: -0.84px;
	color: #221814;
	text-align: end;
	padding-top: 0.9rem;
`;
const PredictionPrice = styled.h2`
	width: fit-content;
	margin-left: auto;
	font-size: 4.5rem;
	font-family: 'ro-b';
	letter-spacing: -1.8px;
	color: #e50011;
	text-align: start;
`;
const PredictionPriceWon = styled.span`
	font-size: 3rem;
	letter-spacing: -1.2px;
	margin-left: 0.3rem;
	text-align: end;
`;
const SubmitButton = styled.button`
	width: 34.6rem;
	height: 6.2rem;
	border-radius: 14px;
	font-size: 2.1rem;
	font-family: 'kr-r';
	letter-spacing: -0.84px;
	border: none;
	transition: all 200ms ease;
	${(props) =>
		props.productOrder &&
		`background-color:#221814; color:#fff ; margin-top:2rem `}
	${(props) =>
		props.shopping &&
		`background-color:#fff; color: #E50011; border: 1px solid #E50011; margin-top:1.2rem ;`};
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
`;
