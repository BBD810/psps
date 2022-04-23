import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as _product from '../controller/product';
import * as _category from '../data/category';
import styled from 'styled-components';
import ProductBanner from '../components/ProductPage/ProductBanner';
import ProductCategory from '../components/ProductPage/ProductCategory';
import ProductList from '../components/ProductPage/ProductList';
import PageSelector from '../components/PageSelector';
import Induce from '../components/Induce';

import Spinner from '../components/Spinner';
import MobileProductCategory from '../components/ProductPage/MobileProductCategory';

const ProductPage = () => {
	const location = useLocation();
	const [part, setPart] = useState('농산');
	const [subPart, setSubPart] = useState(null);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(1);
	const onePage = 12;
	const [list, setList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [subPartArr, setSubPartArr] = useState(['']);

	useEffect(() => {
		const _state = location.state;
		if (_state && _state.part) {
			setPart(_state.part);
			setSubPart(_state.subPart);
		}
		// eslint-disable-next-line
	}, [location]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		setIsLoading(true);
		let isSubscribed = true;
		_product.get_list(part, subPart, page).then((res) => {
			const { success, product_list } = res.data;
			if (isSubscribed && success) {
				setList(product_list);
				setTotal(product_list.length);
			}
		});
		setIsLoading(false);
		return () => {
			isSubscribed = false;
		};
	}, [part, subPart, page]);

	useEffect(() => {
		setPage(1);
	}, [part, subPart]);

	useEffect(() => {
		const _part = _category.part;
		for (let i = 0; i < _part.length; i++) {
			if (_part[i].title === part) {
				setSubPartArr(_part[i]);
			}
		}
	}, [part]);

	return isLoading ? (
		<Spinner />
	) : (
		<div id="container">
			<MobileProductCategory
				part={part}
				subPart={subPart}
				setPart={setPart}
				setSubPart={setSubPart}
				subPartArr={subPartArr}
			/>
			<ProductBanner part={part} subPartArr={subPartArr} />

			<ProductCategory
				part={part}
				subPart={subPart}
				setPart={setPart}
				setSubPart={setSubPart}
				subPartArr={subPartArr}
			/>

			{list && (
				<ProductList
					part={part}
					subPart={subPart}
					setPart={setPart}
					setSubPart={setSubPart}
					list={list}
				/>
			)}
			{list.length > 0 ? (
				<PageSelector
					style={{ marginBottom: '6rem' }}
					total={total}
					page={page}
					setPage={setPage}
					onePage={onePage}
				/>
			) : (
				<ListInfoText>상품이 없습니다.</ListInfoText>
			)}
			<Induce />
		</div>
	);
};

export default ProductPage;

const ListInfoText = styled.p`
	font-size: 2.4rem;
	font-family: 'kr-b';
	letter-spacing: -0.072rem;
	margin: 10rem auto 15rem;
`;
