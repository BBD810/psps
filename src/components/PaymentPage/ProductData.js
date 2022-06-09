import React from 'react';
import * as info from '../../config';
import styled from 'styled-components';
import equal_img from '../../images/equal-ico.svg';
import plus_img from '../../images/plus-ico.svg';

const ProductData = (props) => {
	const PaymentAndDeliveryInfo = [
		'신선식품이기 때문에 단순 소비자 단순 변심으로 인한 개인적인 사유로는 교환 및 환불이 불가합니다.',
		`상품의 변질, 이물질 발견, 아이스박스 및 아이스팩이 파손되어 배송될 경우 고객센터(${info.COMPANY_CONTACT})로 전화주시면 바로 교환/환불 해드리겠습니다.`,
		'고객센터 운영시간은 평일 오전 9시부터 오후 6시까지 입니다. (점심시간 : 오전 12시부터 오후 1시)',
	];

	return (
		<ProductDataWrap>
			<Title>주문 상품</Title>
			{props.orderCalc &&
				props.orderCalc.map((supplierList, id) => {
					return (
						supplierList.total !== 0 && (
							<MapBox key={id}>
								<SupplierTitleBox>
									판매자
									<SupplierName>{supplierList.supplier_name}</SupplierName>
								</SupplierTitleBox>

								{supplierList.checked_product_list.map((el, idx) => (
									<BorderBox key={idx}>
										<ProductText title="true">
											{el.product_title}, {el.product_option_title}
											<ProductQuantityText>{el.quantity}개</ProductQuantityText>
										</ProductText>

										<ProductText price>
											{el.total.toLocaleString()}원
										</ProductText>
									</BorderBox>
								))}
								{supplierList.delivery_price !== 0 && (
									<BorderBox>
										<ProductText title="true">배송비</ProductText>
										<ProductText price>
											{supplierList.delivery_price.toLocaleString()}원
										</ProductText>
									</BorderBox>
								)}
							</MapBox>
						)
					);
				})}
			<TotalPriceBox>
				<PriceTitleAndTextBox>
					<PriceTitle>총 상품 금액</PriceTitle>
					<PriceText>
						{props.amount && props.amount.toLocaleString()}원
					</PriceText>
				</PriceTitleAndTextBox>

				<PlusImg alt="plus sign" src={plus_img} />
				<PriceTitleAndTextBox>
					<PriceTitle>배송비</PriceTitle>
					<PriceText>
						{props.delivery_price && props.delivery_price.toLocaleString()}원
					</PriceText>
				</PriceTitleAndTextBox>

				<PlusImg alt="equal sign" src={equal_img} />
				<PriceTitleAndTextBox total>
					<PriceTitle mobile>총 결제 금액</PriceTitle>
					<PaymentPrice>
						{props.amount && props.delivery_price
							? (props.amount + props.delivery_price).toLocaleString()
							: 0}
						<PaymentWon>원</PaymentWon>
					</PaymentPrice>
				</PriceTitleAndTextBox>
			</TotalPriceBox>
			<MobilePaymentAndDeliveryInfoBox>
				<Title>결제 및 배송 관련 안내</Title>
				<PaymentAndDeliveryInfoBox>
					{PaymentAndDeliveryInfo.map((el, idx) => (
						<PaymentAndDeliveryInfoText key={idx}>
							{el}
						</PaymentAndDeliveryInfoText>
					))}
				</PaymentAndDeliveryInfoBox>
			</MobilePaymentAndDeliveryInfoBox>
		</ProductDataWrap>
	);
};

export default ProductData;
const ProductDataWrap = styled.div`
	margin: 6rem auto;
	width: 100%;
`;
const MapBox = styled.div`
	position: relative;
	width: 100%;
	border-top: 1px solid #e0e0e0;
	padding: 3.15rem 1rem 6.45rem;
	@media ${(props) => props.theme.device.mobile} {
		padding-top: 5rem;
	}
`;
const Title = styled.h2`
	font-size: 1.8rem;
	font-family: 'kr-b';
	letter-spacing: -0.072rem;
	margin: 0 auto 3.25rem;
	${(props) => props.receive && `margin: 0 auto 0.6rem 1.5rem`}
	@media ${(props) => props.theme.device.mobile} {
		font-size: 16px;
		margin-left: 0;
	}
`;
const BorderBox = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	border-radius: 4px;
	margin-bottom: 2rem;
`;
const ProductText = styled.p`
	font-size: 1.5rem;
	font-family: 'kr-r';
	letter-spacing: -0.6px;
	color: #6b6462;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	${(props) =>
		props.title &&
		`width:55rem; font-family: 'kr-b'; color: #221814;display:flex; justify-content: space-between;`}

	${(props) => props.price && `width:10rem; text-align: right; `}
	@media ${(props) => props.theme.device.mobile} {
		font-size: 12px;
		font-family: 'kr-r';
		color: #221814;
		${(props) => props.title && `width:fit-content;`}
	}
`;
const ProductQuantityText = styled.span`
	font-size: 1.5rem;
	font-family: 'kr-r';
	letter-spacing: -0.6px;
	color: #6b6462;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	width: 7rem;
	&::before {
		content: '수량 ';
	}
	@media ${(props) => props.theme.device.mobile} {
		font-size: 12px;
		font-family: 'kr-r';
		color: #221814;
		&::before {
			content: ', ';
		}
	}
`;
const TotalPriceBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 3.5rem 5.8rem;
	color: #e50011;
	font-family: 'kr-b';
	color: #6b6462;
	box-shadow: 0px 0px 10px #00000014;
	border-radius: 24px;
	margin: 0rem 0 8.6rem;
	@media ${(props) => props.theme.device.mobile} {
		flex-direction: column;
	}
`;
const PriceTitleAndTextBox = styled.div`
	display: flex;
	align-items: center;
	@media ${(props) => props.theme.device.mobile} {
		width: 100%;
		justify-content: space-between;
		margin-bottom: 16px;
		${(props) => props.total && `margin:7px 0 0;`}
	}
`;
const PriceTitle = styled.p`
	font-size: 1.4rem;
	letter-spacing: -0.56px;
	margin-right: 2rem;
	${(props) => props.mobile && `display:none;`}
	@media ${(props) => props.theme.device.mobile} {
		font-size: 12px;
		font-family: 'kr-r';
		${(props) => props.mobile && `display:inline;`}
	}
`;
const PriceText = styled.p`
	font-size: 1.6rem;
	letter-spacing: -0.56px;
	color: #221814;
	@media ${(props) => props.theme.device.mobile} {
		font-size: 12px;
		font-family: 'kr-r';
	}
`;
const PlusImg = styled.img`
	width: 1.1rem;
	height: 1.1rem;
	margin: 0 2rem;
	@media ${(props) => props.theme.device.mobile} {
		display: none;
	}
`;
const PaymentPrice = styled.p`
	width: 15rem;
	font-size: 3rem;
	font-family: 'ro-b';
	letter-spacing: -1.2px;
	color: #e50011;
	text-align: right;
	@media ${(props) => props.theme.device.mobile} {
		font-size: 20px;
	}
`;
const PaymentWon = styled.span`
	font-size: 2rem;
	letter-spacing: -0.8px;
	margin-left: 2px;
`;
const MobilePaymentAndDeliveryInfoBox = styled.div`
	@media ${(props) => props.theme.device.mobile} {
		border-top: 1px solid #e0e0e0;
		border-bottom: 1px solid #e0e0e0;
		padding: 30px 0;
	}
`;
const PaymentAndDeliveryInfoBox = styled.div`
	width: 100%;
	padding: 2.05rem 3.1rem;
	border-top: 1px solid #e0e0e0;
	border-bottom: 1px solid #e0e0e0;
	font-size: 1.4rem;
	font-family: 'kr-r';
	letter-spacing: -0.56px;
	line-height: 2.4rem;
	color: #6b6462;
	word-break: break-all;
	white-space: pre-wrap;
	@media ${(props) => props.theme.device.mobile} {
		border: none;
		padding: 0;
	}
`;
const PaymentAndDeliveryInfoText = styled.p`
	::before {
		content: '- ';
	}
	@media ${(props) => props.theme.device.mobile} {
		letter-spacing: -0.48px;
		font-size: 12px;
		line-height: 20px;
		:nth-child(2) {
			margin: 20px 0;
		}
		::before {
			content: '';
		}
	}
`;
const SupplierName = styled.span`
	font-family: 'kr-r';
	margin-left: 0.6rem;
	margin-right: 1.2rem;
`;
const SupplierTitleBox = styled.div`
	position: absolute;
	top: -1rem;
	left: 0;
	font-size: 1.2rem;
	font-family: 'kr-b';
	letter-spacing: -0.48px;
	color: #a0a0a0;
	background-color: #fff;
	@media ${(props) => props.theme.device.mobile} {
		font-size: 12px;
		top: -10px;
	}
`;
