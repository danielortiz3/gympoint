import React, { useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { parseISO, formatRelative } from 'date-fns';
import enUS from 'date-fns/locale/en-US';

import colors from '../../../styles/colors';

import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';

import LogoHeader from '~/components/LogoHeader';
import {
  Container,
  HelpButton,
  List,
  ListItem,
  Info,
  Status,
  StatusIcon,
  StatusText,
  Time,
  Question,
} from './styles';

function ListOrder({ navigation, isFocused }) {
  const dispatch = useDispatch();
  const id = useSelector(state => state.auth.id);
  const [loading, setLoading] = useState(true);
  const [helps, setHelps] = useState([]);

  async function loadHelps() {
    try {
      const response = await api.get(`students/${id}/help-orders`);
      const data = response.data.map(item => ({
        ...item,
        time: formatRelative(parseISO(item.createdAt), new Date(), {
          locale: enUS,
          addSuffix: true,
        }),
      }));

      setHelps(data);
    } catch (err) {
      if (err.response.status === 402) {
        showMessage({
          message: 'Access denied',
          description: 'Unregistered student, please make a new login.',
          type: 'info',
          position: 'top',
          icon: 'warning',
          backgroundColor: `${colors.red}`,
          color: `${colors.white}`,
        });
        dispatch(signOut());
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isFocused && loading) {
      loadHelps();
    }
  }, [isFocused]); // eslint-disable-line

  function handleNewHelp() {
    navigation.navigate('NewOrder', { setLoading });
  }

  function handleViewHelp(item) {
    navigation.navigate('Answer', { helpOrder: item });
  }

  return (
    <Container>
      <HelpButton onPress={handleNewHelp} loading={loading}>
        New Help Request
      </HelpButton>

      <List
        data={helps}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <ListItem onPress={() => handleViewHelp(item)}>
            <Info>
              <Status>
                <StatusIcon
                  name="check-circle"
                  size={20}
                  answered={item.answer}
                />
                <StatusText answered={item.answer}>
                  {item.answer ? 'Answered' : 'Wainting for an answer'}
                </StatusText>
              </Status>
              <Time>{item.time}</Time>
            </Info>
            <Question numberOfLines={3}>{item.question}</Question>
          </ListItem>
        )}
      />
    </Container>
  );
}

ListOrder.navigationOptions = {
  headerTitle: () => <LogoHeader />,
};

export default withNavigationFocus(ListOrder);
