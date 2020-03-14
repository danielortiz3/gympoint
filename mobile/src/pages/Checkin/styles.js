import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
  padding: 0 20px;
`;

export const LogoHeader = styled.Image`
  margin: 0 auto;
`;

export const CheckinButton = styled(Button)`
  margin: 30px 0;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const ListItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const Seq = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #444;
  text-align: left;
`;

export const Time = styled.Text`
  font-size: 14px;
  color: #666;
  text-align: right;
`;
