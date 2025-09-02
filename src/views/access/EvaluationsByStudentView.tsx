import { Text } from '@chakra-ui/react';
import { useParams } from 'react-router';

export const EvaluationsByStudentView = () => {
  const { uuid } = useParams<{ uuid: string }>();
  return <Text>Evaluaciones del estudiante con UUID: {uuid}</Text>;
};
