import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IMG_ADDRESS } from '../../config';
import * as _banner from '../../controller/banner';
import styled from 'styled-components';
import left_btn from '../../images/left_btn.svg';
import right_btn from '../../images/right_btn.svg';

const MainBanner = () => {
	const history = useHistory();
	const bannerBox = useRef();
	const banner = useRef();
	const [bannerList, setBannerList] = useState([]);
	const [bnnNum, setBnnNum] = useState(0);
	const [autoScrollSwitch, setAutoScrollSwitch] = useState(true);
	let bannerWidth = banner.current && banner.current.offsetWidth;
	let time;

	useEffect(() => {
		_banner.get_list('메인').then((res) => {
			const { success, banner_list } = res.data;
			success && setBannerList(banner_list);
		});
	}, []);

	useEffect(() => {
		if (bannerList.length !== 1) {
			if (autoScrollSwitch && bnnNum === 0) {
				bannerBox.current.scrollTo({ left: 0 });
			}
			bannerBox.current.scrollTo({
				left: (bnnNum + 1) * bannerWidth,
				behavior: 'smooth',
			});
			setAutoScrollSwitch(true);
			autoScroll();
		}
		return () => {
			clearTimeout(time);
		};
		// eslint-disable-next-line
	}, [bnnNum]);

	const autoScroll = () => {
		time = setTimeout(() => {
			bnnNum === bannerList.length - 1 ? setBnnNum(0) : setBnnNum(bnnNum + 1);
		}, 4000);
	};

	const onSlideLeft = () => {
		setAutoScrollSwitch(false);
		clearTimeout(time);
		if (bnnNum !== 0) {
			setBnnNum(bnnNum - 1);
		} else {
			bannerBox.current.scrollTo({
				left: (bannerList.length + 1) * bannerWidth,
			});
			setBnnNum(bannerList.length - 1);
		}
	};

	const onSlideRight = () => {
		setAutoScrollSwitch(false);
		clearTimeout(time);
		if (bnnNum !== bannerList.length - 1) {
			setBnnNum(bnnNum + 1);
		} else {
			bannerBox.current.scrollTo({ left: 0 });
			setBnnNum(0);
		}
	};

	const goUrl = (el) => {
		switch (el.page) {
			case '메인페이지':
				return history.push('/');
			case '품생품사란':
				return history.push('/intro');
			case '상품 카테고리':
				return history.push({
					pathname: '/product',
					state: { part: el.part, subPart: el.subPart },
				});
			case '상품 상세보기':
				return history.push({ pathname: `/detail/${el.product_id}` });
			case '고객센터':
				return history.push('/service');
			case '회원가입':
				return history.push('/register');
			case '로그인':
				return history.push('/login');
			// no default
		}
	};

	const firstLoad = () => {
		banner.current &&
			bannerBox.current.scrollTo({ left: banner.current.offsetWidth });
	};

	return (
		<Container>
			<MainBannerWrap ref={bannerBox} onLoad={firstLoad}>
				<MainBannerList>
					{bannerList.length > 1 && (
						<TempBannerImg
							ref={banner}
							alt="banner image"
							src={`${IMG_ADDRESS}/${bannerList[bannerList.length - 1].image}`}
						/>
					)}
					{bannerList.map((el, idx) => (
						<MainBannerImg
							key={idx}
							alt="banner image"
							src={`${IMG_ADDRESS}/${el.image}`}
							onClick={() => {
								goUrl(el);
							}}
						/>
					))}
					{bannerList.length > 1 && (
						<TempBannerImg
							alt="banner image"
							src={`${IMG_ADDRESS}/${bannerList[0].image}`}
						/>
					)}
				</MainBannerList>
				{bannerList.length > 1 && (
					<BnnBtnBox>
						<BnnScrollBtn onClick={onSlideLeft}>
							<BtnImg alt="banner button" src={left_btn} />
						</BnnScrollBtn>
						<BnnScrollBtn onClick={onSlideRight}>
							<BtnImg alt="banner button" src={right_btn} />
						</BnnScrollBtn>
					</BnnBtnBox>
				)}
				{bannerList.length > 1 && (
					<BnnInfoDotBox>
						{bannerList.map((el, idx) => (
							<BnnInfoDot active={bnnNum === idx} key={idx}></BnnInfoDot>
						))}
					</BnnInfoDotBox>
				)}
			</MainBannerWrap>
		</Container>
	);
};

export default MainBanner;

const Container = styled.div`
	max-width: 192rem;
	max-height: 85rem;
	margin-top: -2rem;
	position: relative;
	@media ${(props) => props.theme.device.mobile} {
		display: none;
	}
`;

const MainBannerWrap = styled.div`
	display: flex;
	width: 100%;
	max-height: 85rem;
	height: 44.27vw;
	overflow: hidden;
`;
const MainBannerList = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
`;
const MainBannerImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: fill;
	cursor: pointer;
`;
const TempBannerImg = styled(MainBannerImg)``;
const BnnBtnBox = styled.div`
	max-width: 192rem;
	width: 100%;
	position: absolute;
	display: flex;
	justify-content: space-between;
	padding: 0 5rem;
	align-items: center;
	top: 43rem;
	z-index: 3;
`;
const BnnScrollBtn = styled.div`
	width: 4.4rem;
	height: 4.4rem;
	background-color: #fff;
	border-radius: 50%;
	box-shadow: 0px 3px 6px #00000029;
	padding: 1rem 1.6rem 0.8rem;
	text-align: center;
	cursor: pointer;
	opacity: 0.4;
	transition: all 100ms ease-in;
	&:hover {
		opacity: 1;
	}
`;
const BtnImg = styled.img`
	width: 1.2rem;
	height: 2.4rem;
`;
const BnnInfoDotBox = styled.ul`
	width: 100%;
	position: absolute;
	display: flex;
	justify-content: center;
	bottom: 8.2rem;
	z-index: 3;
`;
const BnnInfoDot = styled.li`
	width: 1.6rem;
	height: 1.6rem;
	background-color: #a0a0a0;
	border-radius: 50%;
	margin: 0.7rem;
	transition: all 200ms ease-in;
	${(props) =>
		props.active &&
		`background-color:#E50011; width:3.2rem; border-radius:10px;`}
`;
