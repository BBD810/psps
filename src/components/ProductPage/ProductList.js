import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IMG_ADDRESS } from '../../config';
import styled from 'styled-components';

const ProductList = (props) => {
	const history = useHistory();
	const [hover, setHover] = useState('');

	const goDetail = (product) => {
		product.price !== null &&
			history.push({
				pathname: `/detail/${product.product_id}`,
				state: { part: props.part, subPart: props.subPart },
			});
	};

	return (
		<ProductContainer>
			<ProductWrap>
				{props.list &&
					props.list.map((el, idx) => (
						<Product
							key={idx}
							onMouseEnter={() => {
								setHover(idx);
							}}
							onMouseLeave={() => {
								setHover('');
							}}
							onClick={() => {
								goDetail(el);
							}}
						>
							{el.image && (
								<ProductImgBox>
									(
									<ProductImg
										alt="product img"
										src={`${IMG_ADDRESS}/${el.image}`}
										hover={hover === idx}
									/>
									)
								</ProductImgBox>
							)}
							<ProductTitle hover={hover === idx}>{el.title}</ProductTitle>
							{el.price !== null ? (
								<ProductDescTotalPrice>
									{`${(el.price - el.discount).toLocaleString()}`}
									<DescWon>원</DescWon>
									{el.discount !== 0 && (
										<ProductDesc>{`${
											el.price && el.price.toLocaleString()
										} `}</ProductDesc>
									)}
								</ProductDescTotalPrice>
							) : (
								<SoldOut>{`품절`}</SoldOut>
							)}
						</Product>
					))}
			</ProductWrap>
			<GrayBackground />
		</ProductContainer>
	);
};

export default ProductList;

const ProductContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
`;
const ProductWrap = styled.ul`
	margin-bottom: 0;
	width: 100%;
	width: fit-content;
	max-width: 120rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 4rem 3rem;
	margin-bottom: 5.9rem;
	@media ${(props) => props.theme.device.mobile} {
		grid-template-columns: repeat(2, 1fr);
		gap: 28px 16px;
	}
`;
const Product = styled.li`
	max-width: 38rem;
	max-height: 40rem;
`;
const ProductImgBox = styled.div`
	width: 38rem;
	height: 35rem;
	cursor: pointer;
	border-radius: 24px;
	overflow: hidden;
	@media ${(props) => props.theme.device.mobile} {
		width: 156px;
		height: 144px;
	}
`;
const ProductImg = styled.img`
	width: 100%;
	height: 100%;
	transition: all 300ms ease;
	${(props) => props.hover && `transform:scale(1.1)`}
`;
const ProductTitle = styled.h3`
	margin-top: 0.3rem;
	height: 2.6rem;
	line-height: 2.6rem;
	font-size: 1.8rem;
	font-family: 'kr-r';
	color: #221814;
	cursor: pointer;
	${(props) => props.hover && `text-decoration: underline;`}
`;
const GrayBackground = styled.div`
	width: 100%;
	height: 37.3rem;
	background: #f2f2f2 0% 0% no-repeat padding-box;
	position: absolute;
	bottom: -9.5rem;
	z-index: -10;
	@media ${(props) => props.theme.device.mobile} {
		display: none;
	}
`;
const ProductDesc = styled.span`
	font-size: 1.4rem;
	font-family: 'ro-r';
	letter-spacing: -0.28px;
	color: #a0a0a0;
	margin-left: 0.6rem;
	text-decoration: line-through;
`;
const ProductDescTotalPrice = styled.p`
	font-size: 2.4rem;
	font-family: 'ro-b';
	letter-spacing: -0.4px;
	margin-top: 0.2rem;
`;
const DescWon = styled.span`
	font-family: 'kr-r';
	font-size: 1.4rem;
	margin-left: 0.2rem;
	color: #a0a0a0;
`;
const SoldOut = styled(ProductDescTotalPrice)`
	width: 100%;
	color: #6b6462;
	font-size: 2rem;
`;
