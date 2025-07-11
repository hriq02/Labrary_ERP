import React,{useState, useEffect} from 'react';
import "../../components/module_pane.css"
import "./Hub-Module.css"



function HubModule() {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [today, setToday] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const currentDay = new Date().toLocaleDateString();
      setTime(currentTime);
      setToday(currentDay);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const birthdays = [
    { name: 'John Doe', date: '2023-05-15' },
    { name: 'Jane Smith', date: '2023-05-20' },
    { name: 'Bob Johnson', date: '2023-05-25' },
    {name: 'Mark Smith', date: '2023-05-31'},
  ];

  const news_boards = [
   "https://picsum.photos/200/300",
    "https://picsum.photos/200/400",
    "https://picsum.photos/200/500"
  ];
  const [current_board, setCurrentBoard] = useState(0);

  const nextBoard = () => {
    setCurrentBoard((current_board + 1) % news_boards.length);    
  }

  const prevBoard = () => {
    setCurrentBoard((current_board - 1 + news_boards.length) % news_boards.length);
  }


  return (
    <div className="module-pane-container">
     <div className="dashboard">
      <div className="left-panel">
        <div className="date-time">
          <div className="date">{today}</div>
          <div className="time">{time}</div>
        </div>
        <div className="birthdays">
          <div className="title">birthdays of the month</div>
          <div className="birthday-box">
            {birthdays.map((birthday, index) => (
              <div key={index} className={index % 2 === 0 ? "birthday-item2" : "birthday-item"}>
                <div> {birthday.name}</div>
                <div> {birthday.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="right-panel">
        <div className="news-title">Labrary news</div>
        <div className="news-box">
          <img className="news-board" src={news_boards[current_board]} alt="News Board" />
          <div className="fa-solid fa-arrow-left arrow left-arrow" onClick={prevBoard}></div>
          <div className="fa-solid fa-arrow-right arrow right-arrow" onClick={nextBoard}></div>
        </div>
      </div>
    </div>
   </div>
  );

}


export default HubModule
