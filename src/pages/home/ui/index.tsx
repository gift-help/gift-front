import { useEffect } from 'react';
import { HomeApi } from '../api';
import { Button } from '@telegram-apps/telegram-ui';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();

  const getData = async () => {
    const response = await HomeApi.get();
    console.log(response);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Button onClick={() => navigate('/questions')}>к категориям</Button>
      <Button onClick={() => navigate('/base_info')}>к базовой информации</Button>
      <Button onClick={() => navigate('/description')}>к описанию</Button>
    </div>
  );
};
