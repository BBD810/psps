import React, { useState } from 'react';
import { IMG_ADDRESS } from '../../config';
import styled from 'styled-components';
import { useEffect } from 'react';

const MobileOrderBox = (props) => {
	const [option, setOption] = useState('');
	const [count, setCount] = useState(1);

	useEffect(() => {
		!!!option && setOption(props.optionList[0]);
	}, [props]);

	return (
		<Container>
			<ProductImgBox>
				<ProductImg
					alt="product image"
					src={
						props.detail.temp_image &&
						`${IMG_ADDRESS}/${props.detail.temp_image}`
					}
				/>
			</ProductImgBox>
			<ProductTextBox>
				<CategoryText>
					{props.detail && `${props.detail.part} > ${props.detail.subPart}`}
				</CategoryText>
				<ProductTitleAndPrice>
					<ProductTitle>{props.detail && props.detail.title}</ProductTitle>
					<ProductPriceBox>
						<DecoPrice>{`${
							option && (option.price * count).toLocaleString()
						}원`}</DecoPrice>
						<TotalPrice>
							{option &&
								((option.price - option.discount) * count).toLocaleString()}
							<PriceWon>원</PriceWon>
						</TotalPrice>
					</ProductPriceBox>
				</ProductTitleAndPrice>
			</ProductTextBox>
		</Container>
	);
};

export default MobileOrderBox;

const Container = styled.div`
	margin-top: 20px;
	display: none;
	flex-direction: column;
	@media ${(props) => props.theme.device.mobile} {
		display: flex;
	}
`;
const ProductImgBox = styled.div`
	width: 100vw;
	max-height: 92.5vw;
	overflow: hidden;
`;
const ProductImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: fill;
`;
const ProductTextBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 12px 0px 20px;
	margin: 0 16px;
	border-bottom: 1px solid #f4f4f4;
`;
const CategoryText = styled.p`
	font-size: 10px;
	font-family: 'kr-r';
	letter-spacing: -0.4px;
	color: #7c7c7c;
	margin-bottom: 6px;
`;
const ProductTitleAndPrice = styled.div`
	width: 100%;
	height: 48px;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
`;
const ProductTitle = styled.p`
	max-width: 180px;
	font-size: 16px;
	font-family: 'kr-r';
	letter-spacing: -0.8px;
	color: #221814;
	line-height: 24px;
`;
const ProductPriceBox = styled.div`
	font-family: 'kr-b';
	color: #221814;
`;
const DecoPrice = styled.p`
	text-decoration: line-through;
	font-size: 11px;
	font-family: 'kr-r';
	letter-spacing: -0.44px;
	color: #7c7c7c;
`;
const TotalPrice = styled.p`
	font-size: 24px;
	letter-spacing: -0.96px;
	line-height: 24px;
`;
const PriceWon = styled.span`
	font-size: 16px;
	letter-spacing: -0.64px;
	margin-left: 1px;
`;
