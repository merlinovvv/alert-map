import style from './style.module.css';

function Info(props) {
  for (let i = 0; i < props.states.length; i++) {
    if (Number(props.data) === props.states[i].id) {
      var region = props.states[i].name;
      var alert = props.states[i].alert;
      var changed = props.states[i].changed;
      const date = new Date(changed);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      const today = new Date();
      var formattedDateTime;
      if (
        today.getDate() === date.getDate() &&
        today.getMonth() === date.getMonth() &&
        today.getFullYear() === date.getFullYear()
      ) {
        formattedDateTime = `${hours}:${minutes}:${seconds}`;
      } else {
        formattedDateTime = `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`;
      }
    }
  }

  if (document.querySelector('.' + style.info_block)) {
    const close = document.querySelector('.' + style.close);
    const infoBlock = document.querySelector('.' + style.info_block);
    close.addEventListener('click', () => {
      infoBlock.style.display = 'none';
    });
  }

  function getTimePassed(formattedDateTime) {
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
    const timePassedInSeconds =
      (currentDate.getTime() - targetDate.getTime()) / 1000;
    // переводим секунды в нужный формат
    const hoursPassed = Math.floor(timePassedInSeconds / 3600);
    const minutesPassed = Math.floor((timePassedInSeconds % 3600) / 60);
    const secondsPassed = Math.floor(timePassedInSeconds) % 60;
    let formattedTimePassed = '';
    if (hoursPassed > 0) {
      formattedTimePassed += `${hoursPassed.toString().padStart(2, '0')} год.`;
    }
    if (minutesPassed > 0) {
      formattedTimePassed += ` ${minutesPassed
        .toString()
        .padStart(2, '0')} хв.`;
    }
    if (formattedDateTime < 60) {
      formattedTimePassed = 'Тривога тільки почалась';
    }
    return formattedTimePassed.trim();
  }

  const timePassed = getTimePassed(formattedDateTime);
  console.log(timePassed);

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
          <p className={style.text}>
            {alert && changed ? 'Тривога триває: ' + String(timePassed) : null}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Info;
