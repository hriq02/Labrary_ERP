import React,{useState, useEffect} from 'react';
import "../../components/module_pane.css"
import "./Hub-Module.css"



function HubModule() {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [today, setToday] = useState(new Date().toLocaleDateString());
  const [birthdays, setBirthdays] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const currentDay = new Date().toLocaleDateString();
      setTime(currentTime);
      setToday(currentDay);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5010/api/employee/birthdates")
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching\n" + res.statusText);
        return res.json();
      })
      .then((data) => {
        // backend retorna [["name","date"], ...]
        const formatted = data.map((item) => ({ name: item[0], date: item[1] }));
        setBirthdays(formatted);
      })
      .catch((err) => {
        console.error("Erro:", err);
        setBirthdays([]);
      });
  }, []); // roda só uma vez

  const news_boards = [
   "http://localhost:3000/?path=a.png",
    "http://localhost:3000/?path=osaka1.png",
    "http://localhost:3000/?path=osaka3.gif"
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
