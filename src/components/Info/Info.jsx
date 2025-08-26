import { useEffect } from 'react';
import style from './style.module.css';

function formatDateTime(changed) {
  if (!changed) return null;
  const date = new Date(changed);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const today = new Date();

  if (
    today.getDate() === date.getDate() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  ) {
    return `${hours}:${minutes}:${seconds}`;
  }

  return `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`;
}

function getTimePassed(formattedDateTime) {
  if (!formattedDateTime) return '';
  const currentDate = new Date();
  const [hours, minutes, seconds] = formattedDateTime.split(':').map(Number);
  const targetDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    hours,
    minutes,
    seconds
  );
  const timePassedInSeconds = (currentDate.getTime() - targetDate.getTime()) / 1000;
  const hoursPassed = Math.floor(timePassedInSeconds / 3600);
  const minutesPassed = Math.floor((timePassedInSeconds % 3600) / 60);
  let formattedTimePassed = '';
  if (hoursPassed > 0) {
    formattedTimePassed += `${hoursPassed.toString().padStart(2, '0')} год.`;
  }
  if (minutesPassed > 0) {
    formattedTimePassed += ` ${minutesPassed.toString().padStart(2, '0')} хв.`;
  }
  if (timePassedInSeconds < 60) {
    formattedTimePassed = 'Тривога тільки почалась';
  }
  return formattedTimePassed.trim();
}

function Info({ data, states }) {
  const regionData = states.find((s) => Number(data) === s.id);
  const region = regionData?.name;
  const alert = regionData?.alert;
  const changed = regionData?.changed;
  const formattedDateTime = formatDateTime(changed);
  const timePassed = alert && formattedDateTime ? getTimePassed(formattedDateTime) : null;

  useEffect(() => {
    const close = document.querySelector('.' + style.close);
    const infoBlock = document.querySelector('.' + style.info_block);
    if (!close || !infoBlock) return;
    const handler = () => {
      infoBlock.style.display = 'none';
    };
    close.addEventListener('click', handler);
    return () => close.removeEventListener('click', handler);
  }, []);

  return (
    <div className={style.info_block}>
      <span className={style.close} id="close"></span>
      <div className={style.title}>Інформація про область</div>
      <div className={style.info_box}>
        <div className={style.box_text}>
          <p className={style.text}>{region}</p>
          <p className={style.text}>
            Зараз {alert ? 'повітряна тривога' : 'немає повітряної тривоги'}
          </p>
          <p className={style.text}>
            Останні зміни: {changed ? formattedDateTime : 'Немає інформації'}
          </p>
          {timePassed && (
            <p className={style.text}>{`Тривога триває: ${timePassed}`}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Info;
