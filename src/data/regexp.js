export const regexp = {
	email: /^([\w])*[a-zA-Z0-9]+([\w])*([a-zA-Z0-9])+([\w])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/,
	password: /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+{};:'",.<>?]).{8,20}$/,
	name: /^[가-힣]{2,10}$/,
	phone_number: /^01([0|1|6|7|8|9])([0-9]{4})([0-9]{4})$/,
};

// password: 최소 8자, 하나 이상의 문자 & 숫자 & 특수문자 조합
