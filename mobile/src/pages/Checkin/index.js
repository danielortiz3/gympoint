import React, { useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO, formatRelative } from 'date-fns';
import enUS from 'date-fns/locale/en-US';

import colors from '../../styles/colors';

import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';

import LogoHeader from '~/components/LogoHeader';
import { Container, CheckinButton, List, ListItem, Seq, Time } from './styles';

export default function Checkin() {
  const dispatch = useDispatch();
  const id = useSelector(state => state.auth.id);
  const [loading, setLoading] = useState(true);
  const [checkins, setCheckins] = useState([]);

  async function loadCheckins() {
    try {
      const response = await api.get(`students/${id}/checkin`);
      const data = response.data.map((check, index, array) => ({
        ...check,
        seq: array.length - index,
        time: formatRelative(parseISO(check.createdAt), new Date(), {
          locale: enUS,
          addSuffix: true,
        }),
      }));

      setCheckins(data);
    } catch (err) {
      if (err.response.status === 402) {
        showMessage({
          message: 'Access denied',
          description: 'Student is not registered, please make a new login.',
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
    loadCheckins();
  }, []); // eslint-disable-line

  async function handleCheckin() {
    try {
      const response = await api.post(`students/${id}/checkin`);
      const data = {
        ...response.data,
        seq: checkins.length + 1,
        time: formatRelative(parseISO(response.data.createdAt), new Date(), {
          locale: enUS,
          addSuffix: true,
        }),
      };

      setCheckins([data, ...checkins]);
    } catch (err) {
      if (err.response.status === 402) {
        showMessage({
          message: 'Access denied',
          description: 'Student is not registered, please make a new login.',
          type: 'info',
          position: 'top',
          icon: 'warning',
          backgroundColor: `${colors.red}`,
          color: `${colors.white}`,
        });
        dispatch(signOut());
      } else if (err.response.status === 403) {
        showMessage({
          message: 'Access blocked',
          description: 'Student has no active registration',
          type: 'info',
          position: 'top',
          icon: 'warning',
          backgroundColor: `${colors.red}`,
          color: `${colors.white}`,
        });
      } else if (err.response.status === 404) {
        showMessage({
          message: 'Access denied',
          description: 'Only 5 checkins allowed per week',
          type: 'info',
          position: 'top',
          icon: 'warning',
          backgroundColor: `${colors.red}`,
          color: `${colors.white}`,
        });
      } else {
        showMessage({
          message: 'Failed to check-in, please try again.',
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
      <CheckinButton onPress={handleCheckin} loading={loading}>
        New check-in
      </CheckinButton>
      <List
        data={checkins}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <ListItem>
            <Seq>Check-in #{item.seq}</Seq>
            <Time>{item.time}</Time>
          </ListItem>
        )}
      />
    </Container>
  );
}

Checkin.navigationOptions = {
  headerTitle: () => <LogoHeader />,
};
