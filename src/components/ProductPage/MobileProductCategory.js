import React from 'react';
import styled from 'styled-components';
import * as category from '../../data/category';

const MobileProductCategory = (props) => {
	const onChangePart = (e) => {
		props.setPart(e.target.innerText);
		props.setSubPart(null);
	};

	return (
		<Container>
			<PartWrap>
				{category.mainCategories.map((el, idx) => (
					<PartList key={idx} active={props.part === el} onClick={onChangePart}>
						{el}
					</PartList>
				))}
			</PartWrap>
		</Container>
	);
};

export default MobileProductCategory;

const Container = styled.div`
	width: 100%;
	margin-top: 30px;
	position: fixed;
	top: 23px;
	background-color: #fff;
	z-index: 99;
	display: none;
	overflow-x: auto;
	::-webkit-scrollbar {
		display: none;
	}
	@media ${(props) => props.theme.device.mobile} {
		display: block;
	}
`;
const PartWrap = styled.ul`
	min-width: max-content;
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin: 0;
	padding: 0 20px;
`;
const PartList = styled.li`
	font-size: 12px;
	font-family: 'kr-r';
	letter-spacing: -0.48px;
	color: #332824;
	padding: 10px 8px;
	${(props) =>
		props.active &&
		`font-family:'kr-b'; border-bottom: 2px solid #DC0E0C; padding-bottom:8px`}
`;
