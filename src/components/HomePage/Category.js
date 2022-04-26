import React from 'react';
import { useHistory } from 'react-router-dom';
import { homeCategories } from '../../data/category_icon';
import styled from 'styled-components';

const Category = (props) => {
	const history = useHistory();
	const onCategory = (title) => {
		history.push({
			pathname: '/product',
			state: { part: title, subPart: null },
		});
		props.navbar && props.setMenuState(false);
	};

	return (
		<Container>
			<CategoryWrap>
				<Title navbar={props.navbar}>카테고리</Title>
				{!props.navbar && (
					<TitleDes>어떤 종류의 식품을 찾고 계신가요?</TitleDes>
				)}
				<CategoryBox navbar={props.navbar}>
					{homeCategories.map((el, idx) => (
						<IconBox
							key={idx}
							onClick={() => {
								onCategory(el.title);
							}}
						>
							<IconImgBox>
								<IconImg alt={`${el.title} image`} src={el.src} />
							</IconImgBox>
							<IconTitle>{el.title}</IconTitle>
						</IconBox>
					))}
				</CategoryBox>
			</CategoryWrap>
		</Container>
	);
};

export default Category;
const Container = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	padding: 5rem 0;
	@media ${(props) => props.theme.device.mobile} {
		margin: 30px auto;
	}
`;
const CategoryWrap = styled.div`
	max-width: 101.9rem;
	width: 100%;
	margin: auto;
	text-align: center;
`;
const Title = styled.h2`
	font-size: 4rem;
	font-family: 'kr-b';
	letter-spacing: -1.6px;
	color: #221814;
	${(props) => props.navbar && `text-align:left; margin-left:22px;`}
	@media ${(props) => props.theme.device.mobile} {
		font-size: 20px;
	}
`;
const TitleDes = styled.p`
	font-size: 1.8rem;
	font-family: 'kr-r';
	letter-spacing: -0.72px;
	color: #7c7c7c;
	@media ${(props) => props.theme.device.mobile} {
		font-size: 14px;
	}
`;
const CategoryBox = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 5.5rem;
	margin: 5.9rem 0;
	${(props) => props.navbar && `gap:3%; padding: 0 5px;`}
`;
const IconBox = styled.div`
	width: 14.5rem;
	height: 18.5rem;
	margin: auto;
	cursor: pointer;
`;
const IconImgBox = styled.div`
	width: 100%;
`;
const IconImg = styled.img`
	width: 14.5rem;
	height: 14.5rem;
`;
const IconTitle = styled.p`
	font-size: 2.8rem;
	font-family: 'kr-b';
	letter-spacing: -1.12px;
	color: #5c5c5c;
`;
