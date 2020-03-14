import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import colors from '../../../styles/colors';

import Button from '~/components/Button';
import LogoHeader from '~/components/LogoHeader';
import { Container, QuestionText } from './styles';

export default function NewOrder({ navigation }) {
  const id = useSelector(state => state.auth.id);
  const [question, setQuestion] = useState('');

  async function handleNewOrder() {
    try {
      await api.post(`students/${id}/help-orders`, {
        student_id: id,
        question,
      });

      const setLoading = navigation.getParam('setLoading');
      setLoading(true);

      navigation.navigate('ListOrder');
    } catch (err) {
      if (err.response.status === 401) {
        showMessage({
          message: 'Enter your question',
          type: 'info',
          position: 'top',
          icon: 'warning',
          backgroundColor: `${colors.yellow}`,
          color: `${colors.white}`,
        });
      } else if (err.response.status === 402) {
        showMessage({
          message: 'Unregistered student',
          type: 'info',
          position: 'top',
          icon: 'warning',
          backgroundColor: `${colors.yellow}`,
          color: `${colors.white}`,
        });
      } else {
        showMessage({
          message: 'Failed to record. Please try again.',
          type: 'info',
          position: 'top',
          icon: 'warning',
          backgroundColor: `${colors.red}`,
          color: `${colors.white}`,
        });
      }
    }
  }

  return (
    <Container>
      <QuestionText
        multiline
        numberOfLines={10}
        textAlignVertical="top"
        placeholder="Include your help request"
        value={question}
        onChangeText={setQuestion}
      />
      <Button onPress={handleNewOrder}>Send Help Request</Button>
    </Container>
  );
}

NewOrder.navigationOptions = ({ navigation }) => ({
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
