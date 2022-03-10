import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as _banner from '../../controller/banner';
import { IMG_ADDRESS } from '../../config';
import leftBtn from '../../images/left_btn.svg';
import rightBtn from '../../images/right_btn.svg';
import { useHistory } from 'react-router-dom';

const MainBanner = () => {
	const history = useHistory();
	const bannerBox = useRef();
	const bannerListEl = useRef();
	const [bannerList, setBannerList] = useState([]);
	const [tempBnnState, setTempBnnState] = useState([false, false]);
	const [bnnNum, setBnnNum] = useState(0);
	const [autoScrollSwitch, setAutoScrollSwitch] = useState(true);
	let time;

	useEffect(() => {
		_banner.get_list('메인').then((res) => {
			const { success, banner_list } = res.data;
			if (success) {
				setBannerList(banner_list);
			}
		});
	}, []);
	// console.log(bannerListEl.current.children);

	useEffect(() => {
		bannerBox.current.scrollTo({
			left: bnnNum * 1920,
			behavior: 'smooth',
		});

		setAutoScrollSwitch(true);
		autoScroll();

		if (bnnNum === bannerList.length - 1) {
			setTempBnnState([true, false]);
		} else if (bnnNum === 0) {
			setTempBnnState([false, true]);
		} else {
			setTempBnnState([false, false]);
		}

		return () => {
			clearTimeout(time);
		};
	}, [bnnNum]);
	console.log(tempBnnState);

	useEffect(() => {
		let tempTime = setTimeout(() => {
			if (tempBnnState[0]) {
				console.log('!!!!');
				// bannerBox.current.scrollTo({ left: 0 });
			} else if (tempBnnState[1]) {
				console.log('aaa');
				// 	bannerBox.current.scrollTo({ left: bannerList.length * 1920 });
			}
		}, 2000);
	}, [tempBnnState]);

	const autoScroll = () => {
		time = setTimeout(() => {
			if (bnnNum === bannerList.length - 1) {
				setBnnNum(0);
			} else {
				setBnnNum(bnnNum + 1);
			}
		}, 4000);
	};

	const onSlideLeft = () => {
		setAutoScrollSwitch(false);
		clearTimeout(time);
		if (bnnNum !== 0) {
			setBnnNum(bnnNum - 1);
		}
	};

	const onSlideRight = () => {
		setAutoScrollSwitch(false);
		clearTimeout(time);
		if (bnnNum !== bannerList.length - 1) {
			setBnnNum(bnnNum + 1);
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
		}
	};

	return (
		<Container>
			<MainBannerWrap ref={bannerBox}>
				<MainBannerList ref={bannerListEl}>
					{bannerList && bannerList.length > 1 && (
						<TempBannerImg
							// temp={tempBnnState[0]}
							alt="banner image"
							src={`${IMG_ADDRESS}/${bannerList[bannerList.length - 1].image}`}
						/>
					)}
					{bannerList &&
						bannerList.map((el, idx) => (
							<MainBannerImg
								key={idx}
								alt="banner image"
								src={`${IMG_ADDRESS}/${el.image}`}
								onClick={() => {
									goUrl(el);
								}}
							/>
						))}
					{bannerList && bannerList.length > 1 && (
						<TempBannerImg
							// temp={tempBnnState[1]}
							alt="banner image"
							src={`${IMG_ADDRESS}/${bannerList[0].image}`}
						/>
					)}
				</MainBannerList>
				{bannerList.length > 1 && (
					<BnnBtnBox>
						<BnnScrollBtn onClick={onSlideLeft}>
							<BtnImg alt="banner button" src={leftBtn} />
						</BnnScrollBtn>
						<BnnScrollBtn onClick={onSlideRight}>
							<BtnImg alt="banner button" src={rightBtn} />
						</BnnScrollBtn>
					</BnnBtnBox>
				)}
				{bannerList.length > 1 && (
					<BnnInfoDotBox>
						{bannerList &&
							bannerList.map((el, idx) => (
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
	width: 192rem;
	margin-top: -2rem;
	position: relative;
`;

const MainBannerWrap = styled.div`
	display: flex;
	width: 192rem;
	height: 85rem;
	/* z-index: -5; */
	overflow: hidden;
	/* border: 5px solid green; */
`;
const BannerBox = styled.div``;
const MainBannerList = styled.div`
	display: flex;
	width: 192rem;
	height: 85rem;
`;
const MainBannerImg = styled.img`
	width: 192rem;
	height: 85rem;
	/* object-fit: contain; */
`;

const TempBannerImg = styled(MainBannerImg)`
	display: none;
	${(props) => props.temp && `display:block;`};
`;
const BnnBtnBox = styled.div`
	width: 124.4rem;
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
