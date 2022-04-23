import React from 'react';
import styled from 'styled-components';
import * as category from '../../data/category';

const ProductCategory = (props) => {
	const onChangePart = (e) => {
		props.setPart(e.target.innerText);
		props.setSubPart(null);
	};
	const onChangeSubPart = (e) => {
		const innerText = e.target.innerText;
		innerText === '전체보기'
			? props.setSubPart(null)
			: props.setSubPart(innerText);
	};

	return (
		<Container>
			<ProductCategoryWrap>
				<PartWrap>
					{category.mainCategories.map((el, idx) => (
						<PartList
							key={idx}
							active={props.part === el}
							onClick={onChangePart}
						>
							{el}
						</PartList>
					))}
				</PartWrap>
				<SubPartWrap>
					{props.subPartArr.arr &&
						props.subPartArr.arr.map((el, idx) => (
							<SubPartListBox key={idx}>
								<SubPartList
									active={
										(idx === 0 && props.subPart === null) ||
										(idx > 0 && props.subPart === el)
									}
									onClick={onChangeSubPart}
								>
									{el}
								</SubPartList>
								<SubPartListLine
									last={idx === props.subPartArr.arr.length - 1}
								></SubPartListLine>
							</SubPartListBox>
						))}
				</SubPartWrap>
			</ProductCategoryWrap>
		</Container>
	);
};

export default ProductCategory;

const Container = styled.div`
	position: relative;
`;
const ProductCategoryWrap = styled.div`
	width: 95.3rem;
	height: 13.2rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	transform: translateY(-30%);
	z-index: 3;
	@media ${(props) => props.theme.device.mobile} {
		transform: translateY(0);
		width: 100vw;
		align-items: flex-start;
		overflow-x: auto;
		::-webkit-scrollbar {
			display: none;
		}
	}
`;
const PartWrap = styled.ul`
	width: 100%;
	height: 7rem;
	display: flex;
	align-items: center;
	background: #ffffff 0% 0% no-repeat padding-box;
	box-shadow: 0px 3px 18px #00000029;
	border-radius: 14px;
	cursor: pointer;
	@media ${(props) => props.theme.device.mobile} {
		display: none;
	}
`;
const PartList = styled.li`
	width: 12rem;
	height: 7rem;
	line-height: 6.5rem;
	text-align: center;
	font-size: 1.8rem;
	font-family: 'kr-r';
	color: #221814;
	padding: 0.3rem;
	letter-spacing: -0.72px;
	${(props) =>
		props.active &&
		`font-family:'kr-b'; border:3px solid #E50011; border-radius:14px; padding:0`}
`;
const SubPartWrap = styled.ul`
	height: 2.6rem;
	display: flex;
	justify-content: center;
	align-items: center;
	@media ${(props) => props.theme.device.mobile} {
		background-color: #fff;
		width: 100%;
		min-width: 443px;
		box-shadow: 0px 3px 10px #0000000f;
		height: fit-content;
		margin: 0;
	}
`;
const SubPartListBox = styled.li`
	display: flex;
	align-items: center;
	&:nth-last-child(1).SubPartListLine {
		display: none;
	}
`;
const SubPartList = styled.p`
	font-size: 1.8rem;
	font-family: 'kr-r';
	color: #000000;
	cursor: pointer;
	&:nth-last-child(1) {
		border: none;
	}
	${(props) =>
		props.active && `font-family:'kr-b' ; border-bottom:2px solid #E50011;`}
	@media ${(props) => props.theme.device.mobile} {
		padding: 10px 8px;
		${(props) => props.active && ` padding-bottom:8px;`}
	}
`;
const SubPartListLine = styled.div`
	width: 0.1rem;
	height: 1.3rem;
	background-color: #8e8e8e;
	margin: 0 1rem;
	@media ${(props) => props.theme.device.mobile} {
		display: none;
	}
	${(props) => props.last && `display:none`}
`;
