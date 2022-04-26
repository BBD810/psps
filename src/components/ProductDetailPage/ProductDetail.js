import React, { useEffect, useState } from 'react';
import { IMG_ADDRESS } from '../../config';
import styled from 'styled-components';

const ProductDetail = (props) => {
	const arr = ['상품선택', '상세설명', '상품정보'];
	const [view, setView] = useState('상품선택');

	const onScroll = () => {
		if (props.infoRef.current) {
			if (window.scrollY > props.infoRef.current.offsetTop) {
				return setView('상품정보');
			} else if (window.scrollY > props.detailRef.current.offsetTop) {
				return setView('상세설명');
			} else if (window.scrollY > props.selectRef.current.offsetTop) {
				return setView('상품선택');
			}
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
		// eslint-disable-next-line
	}, []);

	const onChangeView = (e) => {
		const { innerText } = e.target;
		let refEl;
		switch (innerText) {
			case arr[0]:
				refEl = props.selectRef.current;
				break;
			case arr[1]:
				refEl = props.detailRef.current;
				break;
			case arr[2]:
				refEl = props.infoRef.current;
				break;
			default:
		}
		refEl.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	return (
		<ProductDetailWrap ref={props.detailRef}>
			<ProductDetailHead></ProductDetailHead>
			<ControllerBox>
				<Controller>
					{arr.map((el, idx) => (
						<Switch key={idx} active={view === el} onClick={onChangeView}>
							{el}
						</Switch>
					))}
				</Controller>
			</ControllerBox>

			<ProductDetailBody>
				<DetailImg
					alt="detail img"
					src={
						props.detail.detail_image &&
						`${IMG_ADDRESS}/${props.detail.detail_image}`
					}
				/>
			</ProductDetailBody>
		</ProductDetailWrap>
	);
};

export default ProductDetail;

const ProductDetailWrap = styled.div`
	position: relative;
	max-width: 192rem;
	width: 100%;
`;
const ProductDetailHead = styled.div`
	width: 100%;
	height: 32.7rem;
	padding: 12;
	display: flex;
	justify-content: center;
	background-color: #f2f2f2;
	position: relative;
	z-index: -3;
	@media ${(props) => props.theme.device.mobile} {
		width: 100%;
		background-color: #fff;
		height: 5rem;
	}
`;
const ControllerBox = styled.div`
	width: 100%;
	max-width: 100vw;
	position: fixed;
	bottom: 3rem;
	left: 0;
	z-index: 99;
	@media ${(props) => props.theme.device.mobile} {
		display: none;
	}
`;
const Controller = styled.ul`
	width: 36rem;
	height: 7rem;
	display: flex;
	margin: auto;
	background: #ffffff 0% 0% no-repeat padding-box;
	box-shadow: 0px 3px 10px #00000029;
	border-radius: 14px;
	z-index: 99;
`;
const Switch = styled.li`
	width: 12rem;
	height: 7rem;
	line-height: 7rem;
	text-align: center;
	font-size: 1.8rem;
	font-family: 'kr-r';
	color: #221814;
	background-color: #fff;
	border-radius: 14px;

	cursor: pointer;
	${(props) =>
		props.active &&
		`border: 3px solid #E50011;
		box-shadow: 0px 3px 6px #00000029;
		line-height:6.4rem;`}
`;
const ProductDetailBody = styled.div`
	max-width: 192rem;
	width: 100%;
	display: flex;
	justify-content: center;
	position: relative;
	margin-bottom: 7.5rem;
`;
const DetailImg = styled.img`
	max-width: 120rem;
	width: 100%;
	padding: 0 16px;
`;
