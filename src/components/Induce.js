import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import img from '../images/induce.png';

const Induce = () => {
	const history = useHistory();

	const goShopping = () => {
		history.push('/product');
	};

	return (
		<InduceContainer>
			<InduceImgBox>
				<InduceImg alt="" src={img} onClick={goShopping} />
			</InduceImgBox>
		</InduceContainer>
	);
};

export default Induce;

const InduceContainer = styled.div`
	width: 100%;
	height: fit-content;
	display: flex;
	justify-content: center;
	margin: 4rem 0 10rem;
	@media ${(props) => props.theme.device.mobile} {
		display: none;
	}
`;
const InduceImgBox = styled.div`
	width: 100vw;
	max-width: 120rem;
	max-height: 25rem;
`;
const InduceImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
	border-radius: 32px;
	cursor: pointer;
`;
