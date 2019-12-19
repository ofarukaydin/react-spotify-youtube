import React from "react";

const Duration = (props: { className?: string; seconds: number }) => {
  return (
    <time
      dateTime={`P${Math.round(props.seconds)}S`}
      className={props.className}
    >
      {format(props.seconds)}
    </time>
  );
};

function format(seconds: number) {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
}

function pad(string: string | number) {
  return ("0" + string).slice(-2);
}

export default Duration;
