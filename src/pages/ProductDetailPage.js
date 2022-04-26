import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as _product from '../controller/product';
import styled, { keyframes, css } from 'styled-components';
import alert_img from '../images/alert-box.svg';
import OrderBox from '../components/ProductDetailPage/OrderBox';
import ProductDetail from '../components/ProductDetailPage/ProductDetail';
import ProductInfoTable from '../components/ProductDetailPage/ProductInfoTable';
import Induce from '../components/Induce';
import Alert from '../components/Modal/Alert';
import MobileOrderBox from '../components/ProductDetailPage/MobileOrderBox';
import MobileOrderButton from '../components/ProductDetailPage/MobileOrderButton';

const ProductDetailPage = () => {
	const location = useLocation().state;
	const history = useHistory();
	const user = useSelector((state) => state.user);
	const { product_id } = useParams();
	const selectRef = useRef();
	const infoRef = useRef();
	const detailRef = useRef();
	const [detail, setDetail] = useState({});
	const [optionList, setOptionList] = useState([]);
	const [alertState, setAlertState] = useState(false);
	const [alertMsg, setAlertMsg] = useState('');
	const [cartAlertState, setCartAlertState] = useState({
		successTrue: false,
		successFalse: false,
	});

	useEffect(() => {
		window.scrollTo(0, 0);
		return () => {
			history.action === 'POP' && history.replace({ state: location });
		};
	}, []);

	useEffect(() => {
		if (product_id) {
			let isSubscribed = true;
			_product.get_detail(product_id).then((res) => {
				const { success, product, product_option_list } = res.data;
				if (isSubscribed && success) {
					setDetail(product);
					setOptionList([...product_option_list]);
				}
			});
			return () => {
				isSubscribed = false;
			};
		}
	}, [product_id]);

	return (
		<div id="container">
			{(cartAlertState.successTrue || cartAlertState.successFalse) && (
				<AlertBox>
					<AlertImgBox
						state={cartAlertState.successTrue || cartAlertState.successFalse}
					>
						<AlertImg alt="alert image" src={alert_img} />
						<AlertText>
							{cartAlertState.successTrue
								? '상품이 장바구니에 담겼어요!'
								: `이미 장바구니에\n존재하는 상품입니다.`}
						</AlertText>
					</AlertImgBox>
				</AlertBox>
			)}
			<MobileOrderButton
				detail={detail}
				optionList={optionList}
				selectRef={selectRef}
				user={user}
				cartAlertState={cartAlertState}
				setCartAlertState={setCartAlertState}
				setAlertMsg={setAlertMsg}
				setAlertState={setAlertState}
			/>
			<MobileOrderBox detail={detail} optionList={optionList} />

			<OrderBox
				detail={detail}
				optionList={optionList}
				selectRef={selectRef}
				user={user}
				cartAlertState={cartAlertState}
				setCartAlertState={setCartAlertState}
				setAlertMsg={setAlertMsg}
				setAlertState={setAlertState}
			/>
			<ProductDetail
				detail={detail}
				detailRef={detailRef}
				selectRef={selectRef}
				infoRef={infoRef}
			/>
			<ProductInfoTable
				detail={detail}
				optionList={optionList}
				infoRef={infoRef}
			/>
			<Induce />
			{alertState && (
				<Alert
					title={'상품 주문 안내'}
					msg={alertMsg}
					setAlertState={setAlertState}
				/>
			)}
		</div>
	);
};

export default ProductDetailPage;

const AlertBox = styled.div`
	width: 120rem;
	padding-left: 98rem;
	position: fixed;
	top: 8.5rem;
	z-index: 44;
	@media ${(props) => props.theme.device.mobile} {
		width: fit-content;
		z-index: 9999;
		right: 0px;
	}
`;

const alertBoxFade = keyframes`
	0% {
		opacity: 0;
	}
	10% {
		opacity: 1;
	}
	90% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
`;
const AlertImgBox = styled.div`
	position: relative;
	width: 25rem;
	opacity: 0;
	${(props) =>
		props.state &&
		css`
			animation: ${alertBoxFade} 5s;
		`}
	@media ${(props) => props.theme.device.mobile} {
		width: 200px;
	}
`;
const AlertImg = styled.img`
	width: 100%;
`;
const AlertText = styled.p`
	width: 20rem;
	position: absolute;
	font-size: 1.6rem;
	font-family: 'kr-b';
	letter-spacing: -0.64px;
	color: #221814;
	top: 50%;
	transform: translateY(-50%);
	left: 2.2rem;
	text-align: center;
	@media ${(props) => props.theme.device.mobile} {
		width: 35rem;
		font-size: 14px;
	}
`;
