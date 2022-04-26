import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IMG_ADDRESS } from '../../config';
import * as _product from '../../controller/product';
import styled from 'styled-components';
import logo from '../../images/red-logo.svg';

const RecommendList = () => {
	const history = useHistory();
	const [list, setList] = useState([]);
	const [hover, setHover] = useState('');

	useEffect(() => {
		let isSubscribed = true;
		_product.get_recommend_list().then((res) => {
			isSubscribed &&
				res.data.success &&
				setList(res.data.product_recommend_list);
		});
		return () => {
			isSubscribed = false;
		};
	}, []);

	const goDetail = (product_id) => {
		history.push(`/detail/${product_id}`);
	};

	return (
		<RecommendWrap>
			<Logo alt="logo" src={logo} />
			<Title>{`품생품사 추천 상품`}</Title>
			<Desc>{`품생품사에서 선별한\n특별한 상품들을 지금 바로 만나보세요!`}</Desc>
			<ListWrap>
				{list &&
					list.map((el, idx) => (
						<List
							key={idx}
							onClick={() => {
								goDetail(el.product_id);
							}}
							onMouseEnter={() => {
								setHover(idx);
							}}
							onMouseLeave={() => {
								setHover('');
							}}
						>
							<ListImgBox>
								<ListImg
									alt="product img"
									src={`${IMG_ADDRESS}/${el.image}`}
									hover={hover === idx}
								/>
							</ListImgBox>
							<ListTitle hover={hover === idx}>{el.title}</ListTitle>
							{/* 상품설명 */}
							<ListDescTotalPrice>
								{el.total_price && `${el.total_price.toLocaleString()}`}
								<DescWon>원</DescWon>
								{el.discount !== 0 && (
									<ListDesc>
										{el.price && `${el.price.toLocaleString()} `}
									</ListDesc>
								)}
							</ListDescTotalPrice>
						</List>
					))}
			</ListWrap>
		</RecommendWrap>
	);
};

export default RecommendList;

const RecommendWrap = styled.div`
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	@media ${(props) => props.theme.device.mobile} {
		margin: 0px auto 40px;
	}
`;
const Logo = styled.img`
	width: 6rem;
	height: 6rem;
	margin-bottom: 1rem;
`;
const Title = styled.h2`
	height: 5.8rem;
	line-height: 5.8rem;
	font-size: 4rem;
	font-family: 'kr-b';
	${(props) => props.highLight && `color:red`}
	@media ${(props) => props.theme.device.mobile} {
		font-size: 20px;
	}
`;
const Desc = styled.p`
	height: 5.1rem;
	font-size: 1.8rem;
	color: #8e8e8e;
	text-align: center;
	margin-bottom: 5rem;
	@media ${(props) => props.theme.device.mobile} {
		font-size: 14px;
	}
`;
const ListWrap = styled.ul`
	max-width: 120rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 3.2rem 1.6rem;
	padding: 0 2rem;
	@media ${(props) => props.theme.device.mobile} {
		grid-template-columns: repeat(2, 1fr);
		width: 100%;
		justify-items: center;
	}
`;
const List = styled.li`
	max-width: 38rem;
	max-height: 40rem;
	cursor: pointer;
	background-color: #fff;
	border-radius: 24px;
	@media ${(props) => props.theme.device.tablet} {
		max-width: 33.2rem;
	}
`;
const ListImgBox = styled.div`
	width: 100%;
	height: 35rem;
	overflow: hidden;
	border-radius: 24px;
	background-color: #fff;
	@media ${(props) => props.theme.device.tablet} {
		height: 28.8rem;
	}
`;
const ListImg = styled.img`
	width: 100%;
	height: 100%;
	transition: all 300ms ease;
	object-fit: cover;
	${(props) => props.hover && `transform:scale(1.1)`}
`;
const ListTitle = styled.h3`
	height: 2.6rem;
	line-height: 2.6rem;
	font-size: 1.8rem;
	font-family: 'kr-r';
	letter-spacing: -0.72px;
	color: #221814;
	${(props) => props.hover && `text-decoration: underline;`}
	@media ${(props) => props.theme.device.mobile} {
		margin-top: 5px;
		font-size: 14px;
	}
`;
const ListDesc = styled.span`
	font-size: 1.4rem;
	font-family: 'ro-r';
	letter-spacing: -0.28px;
	color: #a0a0a0;
	margin-left: 0.4rem;
	text-decoration: line-through;
`;
const ListDescTotalPrice = styled.p`
	font-size: 2.4rem;
	font-family: 'ro-b';
	letter-spacing: -0.4px;
	margin-top: 0.2rem;
	@media ${(props) => props.theme.device.mobile} {
		font-size: 18px;
	}
`;
const DescWon = styled.span`
	font-family: 'kr-r';
	font-size: 1.4rem;
	color: #a0a0a0;
	margin-left: 0.2rem;
`;
