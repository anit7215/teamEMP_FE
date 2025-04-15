import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import hasAlarm from '../../../assets/icons/hasAlarm.svg';
import noAlarm from '../../../assets/icons/bell.svg';
import * as S from './Style';

const Alarm = () => {
    const [alarm, setAlarm] = useState(false);
    const navigate = useNavigate();

    const handleAlarmClick = () => {
        navigate("/notification");
    };

    return (
        <S.AlarmIconWrapper onClick={handleAlarmClick}>
            <S.AlarmIcon src={alarm ? hasAlarm : noAlarm} alt="Alarm" />
        </S.AlarmIconWrapper>
    );

};
export default Alarm;