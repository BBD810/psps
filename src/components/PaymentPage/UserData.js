import React, { useRef } from 'react';
import styled from 'styled-components';
import check_img from '../../images/check_btn.svg';
import uncheck_img from '../../images/uncheck_btn.svg';
import DaumPostcode from '../DaumPostCode';

const UserData = (props) => {
	const inputDetailAddr = useRef();
	const orderUserDataTitle = ['이름', '연락처', '이메일'];
	const receiveUserPlaceholder = [
		'받으시는 분 이름을 입력해주세요.',
		'연락처를 입력해주세요.',
		'내용을 입력해주세요. (선택)',
	];

	const onCheck = () => {
		props.setChecked(!props.checked);
		if (props.checked) {
			props.setDel_name('');
			props.setDel_tel('');
			if (props.user.postcode) {
				props.setPostAddr('');
				props.setDetailAddr('');
				props.setPostZoneCode('');
			}
		} else {
			props.setDel_name(props.user.name);
			props.setDel_tel(props.user.phone_number);
			if (props.user.postcode) {
				const addrArr = props.user.address.split('/');
				props.setPostAddr(addrArr[0]);
				props.setDetailAddr(addrArr[1]);
				props.setPostZoneCode(props.user.postcode);
			}
		}
	};

	const onPasteAddrCheck = () => {
		props.setPasteAddrChecked(!props.pasteAddrChecked);
	};

	const onPostcodeClose = () => {
		props.setPostcodeOpen(false);
	};

	const goDaumPostcode = () => {
		props.setPostcodeOpen(true);
	};

	const changeDetailAddr = (e) => {
		props.setDetailAddr(e.target.value);
	};

	const ChangeName = (e) => {
		props.setDel_name(e.target.value);
	};

	const ChangePhNumber = (e) => {
		if (isNaN(e.target.value)) {
			return;
		} else {
			props.setDel_tel(e.target.value);
		}
	};

	const ChangeRequest = (e) => {
		props.setDel_req(e.target.value);
	};

	return (
		<UserDataWrap>
			<OrderUserWrap>
				<Title>보내시는 분</Title>
				<BorderBox>
					{orderUserDataTitle.map((el, idx) => (
						<DataBox orderUser key={idx}>
							<DataTitle orderUser>{el}</DataTitle>
							<OrderUserText>
								{idx === 0
									? props.user.name
									: idx === 1
									? props.user.phone_number
									: props.user.email}
							</OrderUserText>
						</DataBox>
					))}
				</BorderBox>
			</OrderUserWrap>
			<ReceiveUserWrap>
				<ReceiveUserTitleBox>
					<Title receive>받으시는 분</Title>
					<CheckImg
						alt="check button"
						src={props.checked ? check_img : uncheck_img}
						onClick={onCheck}
					/>
					<CheckInfo>주문자 정보 가져오기</CheckInfo>
				</ReceiveUserTitleBox>
				<BorderBox>
					<DataBox>
						<DataTitle>이름</DataTitle>
						<ReceiveUserInput
							placeholder={receiveUserPlaceholder[0]}
							value={props.del_name}
							onChange={ChangeName}
						></ReceiveUserInput>
					</DataBox>
					<DataBox>
						<DataTitle>연락처</DataTitle>
						<ReceiveUserInput
							type="text"
							maxLength="11"
							placeholder={receiveUserPlaceholder[1]}
							onChange={ChangePhNumber}
							value={props.del_tel}
						></ReceiveUserInput>
					</DataBox>
					<DataBox>
						<DataTitle>배송지</DataTitle>
						<InputBox>
							<InputAndPostcode>
								<ReceiveUserInput
									value={props.postZoneCode && props.postZoneCode}
									readOnly
								></ReceiveUserInput>
								<InputPostcodeBtn
									value={props.postZoneCode && props.postZoneCode}
									onClick={goDaumPostcode}
								>
									우편번호 찾기
								</InputPostcodeBtn>
							</InputAndPostcode>
							<ReceiveUserInput
								value={props.postAddr && props.postAddr}
								long
								destination
								readOnly
							></ReceiveUserInput>
							<ReceiveUserInput
								long
								destination
								ref={inputDetailAddr}
								value={props.detailAddr}
								placeholder={props.postAddr && '상세주소를 입력해주세요'}
								onChange={changeDetailAddr}
							></ReceiveUserInput>
							<PasteAddrCheckBox>
								<CheckImg
									alt="check button"
									src={props.pasteAddrChecked ? check_img : uncheck_img}
									onClick={onPasteAddrCheck}
								/>
								<CheckInfo addr>기본 배송지로 저장</CheckInfo>
							</PasteAddrCheckBox>
						</InputBox>
					</DataBox>

					<DataBox column>
						<DataTitle column>배송요청사항</DataTitle>
						<ReceiveUserInput
							long
							type="text"
							maxLength="25"
							placeholder={receiveUserPlaceholder[2]}
							onChange={ChangeRequest}
						></ReceiveUserInput>
					</DataBox>
				</BorderBox>
			</ReceiveUserWrap>
			{props.postcodeOpen && (
				<PostcodeModal>
					<PostcodeBox>
						<DaumPostcode
							setPostcodeOpen={props.setPostcodeOpen}
							setPostZoneCode={props.setPostZoneCode}
							setPostAddr={props.setPostAddr}
							inputDetailAddr={inputDetailAddr}
						/>
						<PostcodeCloseBtn onClick={onPostcodeClose}>닫기</PostcodeCloseBtn>
					</PostcodeBox>
				</PostcodeModal>
			)}
		</UserDataWrap>
	);
};

export default UserData;

const UserDataWrap = styled.div`
	width: 100%;
`;
const OrderUserWrap = styled.div`
	width: 100%;
	margin-bottom: 6rem;
`;
const Title = styled.h2`
	font-size: 1.8rem;
	font-family: 'kr-b';
	letter-spacing: -0.072rem;
	margin: 0 auto 1.3rem 1.5rem;
	@media ${(props) => props.theme.device.mobile} {
		font-size: 16px;
		margin-left: 0;
	}
	${(props) => props.receive && `margin: 0 auto 0.6rem 1.5rem`}
`;
const BorderBox = styled.ul`
	width: 100%;
	padding: 0rem 4rem 0;
	border: 1px solid #e0e0e0;
	border-radius: 24px;
	@media ${(props) => props.theme.device.mobile} {
		border: none;
		border-bottom: 1px solid #f4f4f4;
		border-radius: 0;
		padding: 0px 0px 22px;
		padding-bottom: 22px;
	}
`;
const DataBox = styled.li`
	display: flex;
	align-items: flex-start;
	margin: 3rem 0;

	${(props) => props.orderUser && `margin:0 0 2rem`}
	@media ${(props) => props.theme.device.mobile} {
		align-items: center;
		${(props) =>
			props.column && `flex-direction: column; align-items: flex-start;`}
	}
`;

const DataTitle = styled.p`
	width: 7.4rem;
	font-size: 1.4rem;
	font-family: 'kr-b';
	text-align: left;
	letter-spacing: -0.056rem;
	color: #6b6462;
	margin-right: 6.1rem;
	padding-top: 1rem;
	@media ${(props) => props.theme.device.mobile} {
		font-size: 12px;
		padding-top: 0;
		${(props) => props.column && `margin-bottom:9px;`}
	}
	${(props) => props.orderUser && `padding-top:0`}
`;
const OrderUserText = styled.p`
	font-size: 1.4rem;
	font-family: 'kr-r';
	text-align: left;
	letter-spacing: -0.056rem;
	color: #221814;
	@media ${(props) => props.theme.device.mobile} {
		font-size: 12px;
	}
`;
const ReceiveUserWrap = styled.div`
	width: 100%;
`;
const ReceiveUserTitleBox = styled.div`
	display: flex;
	align-items: center;
`;
const CheckImg = styled.img`
	width: 1.4rem;
	height: 1.4rem;
	cursor: pointer;
	@media ${(props) => props.theme.device.mobile} {
		width: 14px;
		height: 14px;
	}
`;
const CheckInfo = styled.span`
	font-size: 1.2rem;
	font-family: 'kr-b';
	letter-spacing: -0.048rem;
	color: #6b6462;
	margin: 0 1.5rem 0 1rem;
`;

const ReceiveUserInput = styled.input`
	width: 23.8rem;
	padding: 1.2rem 1.4rem;
	display: block;
	border: 1px solid #c6c6c6;
	border-radius: 14px;
	background-color: #fff;
	letter-spacing: -0.056rem;
	text-align: left;
	font-size: 1.4rem;
	margin-bottom: 2rem;
	&::placeholder {
		letter-spacing: -0.56px;
		color: #c6c6c6;
	}
	&:focus {
		margin-bottom: 1.8rem;
	}
	${(props) =>
		props.readOnly &&
		`&:focus {border: 1px solid #c6c6c6; box-shadow:none; margin-bottom: 2rem;}`}

	@media ${(props) => props.theme.device.tablet} {
		width: 30rem;
		${(props) => props.long && `width:44.6rem`}
	}
	@media ${(props) => props.theme.device.mobile} {
		width: 100%;
		font-size: 12px;
		height: 44px;
	}
	${(props) => props.long && `width:34.6rem`}
`;
const InputBox = styled.div`
	width: 34.6rem;
	${(props) => props.theme.device.tablet && `width:fit-content;`}
	@media ${(props) => props.theme.device.mobile} {
		width: 100%;
	}
`;
const InputAndPostcode = styled.div`
	display: flex;
	justify-content: space-between;
	@media ${(props) => props.theme.device.mobile} {
		position: relative;
		margin-bottom: 0px;
	}
`;
const InputPostcodeBtn = styled.div`
	height: 4.3rem;
	background-color: #f2f2f2;
	border: 1px solid #c6c6c6;
	border-radius: 14px;
	font-size: 1.4rem;
	font-family: 'kr-b';
	letter-spacing: -0.28px;
	padding: 1rem 1rem;
	color: #8e8e8e;
	cursor: pointer;
	@media ${(props) => props.theme.device.mobile} {
		position: absolute;
		width: 100%;
		height: 81%;
		background-color: transparent;
		border: none;
		font-size: 12px;
		padding: 13px 8px;
		font-family: 'kr-r';
		${(props) => props.value && `opacity: 0;`}
	}
`;
const PostcodeModal = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: #000000a0;
	position: fixed;
	top: 0;
	left: 0;
`;
const PostcodeBox = styled.div`
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
	border-radius: 5px;
	border: 1px solid #fff;
`;
const PasteAddrCheckBox = styled.div`
	text-align: start;
	margin-top: -1rem;
	display: flex;
	align-items: center;
	@media ${(props) => props.theme.device.mobile} {
		justify-content: flex-end;
	}
`;
