import SyncLoader from 'react-spinners/SyncLoader';
import styled from 'styled-components';

const Spinner = () => {
	return (
		<Container>
			<SyncLoader
				style={{
					height: '300px',
					width: '32px',
					color: '#6b5ce7',
					radius: '8px',
				}}
			/>
		</Container>
	);
};

export default Spinner;

const Container = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 100;
	@media ${(props) => props.theme.device.mobile} {
		position: static;
		padding: 50% 0;
	}
`;
