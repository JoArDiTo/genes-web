import { useParams } from 'react-router';

export const EvaluationDetailView = () => {
  const { uuid } = useParams<{ uuid: string }>();

  return <h1>Detalle de Evaluación: {uuid}</h1>;
};
