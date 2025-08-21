import { Text } from '@chakra-ui/react';
import { useParams } from 'react-router';

export const TestFormView = () => {
  const { uuid } = useParams();

  return <Text>Test Form: {uuid}</Text>;
};
