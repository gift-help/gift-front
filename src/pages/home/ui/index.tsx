import {useEffect, useState} from "react";
import {HomeApi} from "../api";

export const HomePage = () => {
    const [data, setData] = useState<{ token: string; user: { telegramId: number; username?: string; firstName?: string; lastName?: string } } | null>(null);

    const initData = async (initData: string) => {
        const response = await HomeApi.post({ initData });
        console.log(response);
        setData(response);
    };

    useEffect(() => {
        initData(window.Telegram.WebApp.initData);
    }, [window.Telegram.WebApp.initData]);

    return (
      <div>
          {data ? (
              <div>
                  <p>Token: {data.token}</p>
                  <p>Telegram ID: {data.user.telegramId}</p>
                  {data.user.username && <p>Username: {data.user.username}</p>}
                  {data.user.firstName && <p>First Name: {data.user.firstName}</p>}
                  {data.user.lastName && <p>Last Name: {data.user.lastName}</p>}
              </div>
          ) : (
              <p>Failed</p>
          )}
      </div>
    );
};
