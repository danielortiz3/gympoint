import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
`;

export const Help = styled.View`
  margin: 40px 20px;
  padding: 0 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
`;

export const Info = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444;
  text-align: left;
`;

export const Time = styled.Text`
  font-size: 14px;
  color: #666;
  text-align: right;
`;

export const HelpText = styled.Text`
  font-size: 14px;
  color: #666;
  line-height: 26px;
  text-align: left;
  margin-top: 16px;
  margin-bottom: 20px;
`;
