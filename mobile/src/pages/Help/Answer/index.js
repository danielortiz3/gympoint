import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LogoHeader from '~/components/LogoHeader';
import { Container, Help, Info, Label, Time, HelpText } from './styles';

export default function Answer({ navigation }) {
  const helpOrder = navigation.getParam('helpOrder');

  return (
    <Container>
      <Help>
        <Info>
          <Label>PERGUNTA</Label>
          <Time>{helpOrder.time}</Time>
        </Info>
        <HelpText>{helpOrder.question}</HelpText>
        {helpOrder.answer && (
          <>
            <Info>
              <Label>RESPOSTA</Label>
            </Info>
            <HelpText>{helpOrder.answer}</HelpText>
          </>
        )}
      </Help>
    </Container>
  );
}

Answer.navigationOptions = ({ navigation }) => ({
  headerTitle: () => <LogoHeader />,
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={24} color="#000" />
    </TouchableOpacity>
  ),
});
