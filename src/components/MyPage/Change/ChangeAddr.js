import React, { useEffect, useRef, useState } from 'react';
import * as _user from '../../../controller/user';
import styled from 'styled-components';
import Postcode from '../../DaumPostCode';

const ChangeAddr = (props) => {
	const inputDetailAddr = useRef();
	const [postcodeOpen, setPostcodeOpen] = useState(false);
	const [postZoneCode, setPostZoneCode] = useState('');
	const [postAddr, setPostAddr] = useState('');
	const [postDetailAddr, setPostDetailAddr] = useState('');
	const [allState, setAllState] = useState(false);

	useEffect(() => {
		if (postAddr && postDetailAddr && postZoneCode) {
			setAllState(true);
		} else {
			setAllState(false);
		}
	}, [postZoneCode, postAddr, postDetailAddr]);

	const onPostcode = () => {
		setPostcodeOpen(true);
	};
	const onPostcodeClose = () => {
		setPostcodeOpen(false);
	};

	const changeDetailAddr = (e) => {
		setPostDetailAddr(e.target.value);
	};

	const offChangeAddr = () => {
		props.setChangeAddrState(false);
	};

	const onSubmit = () => {
		if (!postAddr || !postDetailAddr || !postZoneCode) {
			return;
		}
		const data = {
			address: postAddr + '/' + postDetailAddr,
			postcode: postZoneCode,
		};

		_user.change_address(data).then((res) => {
			const { success } = res.data;
			if (success) {
				props.setAlertMsg('주소가 변경되었습니다.');
				props.setChangeAddrState(false);
				props.setAlertState(true);
			} else {
			}
		});
	};

	return (
		<Container>
			<ChangeAddrWrap>
				<Title>배송지 변경</Title>
				<PostcodeBox>
					<AddrInput
						postcode
						placeholder={props.user.postcode && props.user.postcode}
						value={postZoneCode}
						readOnly
					/>
					<PostcodeBtn onClick={onPostcode}>우편번호 찾기</PostcodeBtn>
				</PostcodeBox>
				<AddrInput
					placeholder={props.user.address && props.user.address.split('/')[0]}
					value={postAddr}
					readOnly
				/>
				<AddrInput
					ref={inputDetailAddr}
					placeholder={
						props.user.address
							? props.user.address.split('/')[1]
							: '상세 주소를 입력해주세요'
					}
					onChange={changeDetailAddr}
				/>
				<ButtonBox>
					<BackButton onClick={offChangeAddr}>취소</BackButton>
					<SubmitButton state={allState} onClick={onSubmit}>
						확인
					</SubmitButton>
				</ButtonBox>
			</ChangeAddrWrap>
			{postcodeOpen && (
				<PostcodeModal>
					<PostcodeWrap>
						<Postcode
							setPostcodeOpen={setPostcodeOpen}
							setPostZoneCode={setPostZoneCode}
							setPostAddr={setPostAddr}
							inputDetailAddr={inputDetailAddr}
						/>
						<PostcodeCloseBtn onClick={onPostcodeClose}>닫기</PostcodeCloseBtn>
					</PostcodeWrap>
				</PostcodeModal>
			)}
		</Container>
	);
};

export default ChangeAddr;

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: #000000ba;
`;
const ChangeAddrWrap = styled.div`
	width: 48rem;
	height: 36.6rem;
	background-color: #fff;
	margin: 20vh auto;
	box-shadow: 0px 3px 6px #00000029;
	border-radius: 24px;
	padding: 3.6rem 6.7rem;
`;
const Title = styled.h2`
	margin-bottom: 3rem;
	font-size: 2rem;
	font-family: 'kr-b';
	letter-spacing: -0.8px;
	text-align: center;
`;
const PostcodeBox = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const AddrInput = styled.input`
	width: 34.6rem;
	padding: 1.2rem 2.8rem;
	border: 1px solid #c6c6c6;
	border-radius: 14px;
	background-color: #fff;
	font-size: 1.4rem;
	letter-spacing: -0.28px;
	margin: 0.1rem 0.1rem 1.1rem;
	${(props) => props.postcode && `width:23.8rem;`}
	&::placeholder {
		color: #8e8e8e;
	}
	&:focus {
		margin: 0 0 1rem;
		&::placeholder {
			color: #8e8e8e;
		}
	}
`;
const PostcodeBtn = styled.button`
	padding: 1rem 1rem;
	margin-bottom: 1rem;
	border: 1px solid #c6c6c6;
	border-radius: 14px;
	background-color: #f2f2f2;
	font-size: 1.4rem;
	font-family: 'kr-b';
	letter-spacing: -0.28px;
	color: #8e8e8e;
`;
const ButtonBox = styled.div`
	display: flex;
	justify-content: space-between;
`;
const SubmitButton = styled.button`
	padding: 1.4rem 6.2rem;
	font-size: 2.4rem;
	font-family: 'kr-r';
	letter-spacing: -0.96px;
	color: #fff;
	border-radius: 14px;
	background-color: #a0a0a0;
	border: none;
	cursor: default !important;
	transition: all 200ms ease;
	${(props) =>
		props.state &&
		`background-color:#221814; cursor: pointer !important; &:hover{
		background-color:#e50011;
	}`}
`;
const BackButton = styled(SubmitButton)`
	border: 1px solid #e50011;
	background-color: #fff;
	color: #e50011;
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
	cursor: pointer !important;
`;
const PostcodeModal = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
`;
const PostcodeWrap = styled.div`
	width: 80%;
	height: 80%;
	max-width: 500px;
	max-height: 500px;
	margin: 10% auto;
	background-color: #fff;
`;
const PostcodeCloseBtn = styled.button`
	width: 15%;
	height: 3rem;
	margin: 1rem 0 0 85%;
	padding: 0.2rem 0.4rem;
	border-radius: 14px;
	border: 1px solid #fff;
`;
