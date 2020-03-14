import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
  padding: 0 20px;
`;
export const HelpButton = styled(Button)`
  margin: 30px 0;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const ListItem = styled.TouchableOpacity`
  padding: 15px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const Info = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Status = styled.View`
  flex-direction: row;
`;

export const StatusIcon = styled(Icon)`
  color: ${props => (props.answered ? '#42cb59' : '#999')};
`;

export const StatusText = styled.Text`
  margin-left: 8px;
  font-size: 14px;
  color: ${props => (props.answered ? '#42cb59' : '#999')};
  text-align: left;
`;

export const Time = styled.Text`
  font-size: 14px;
  color: #666;
  text-align: right;
`;

export const Question = styled.Text`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  line-height: 26px;
  text-align: left;
`;
