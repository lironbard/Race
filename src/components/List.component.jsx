import { useState } from "react";
import { useParams } from "react-router";
const List = (props) => {
  const [tasks, useTasks] = useState([
    { text: "1111asdasdasd", when: "00:00:00" },
    { text: "asdasdasd22222", when: "00:13:00" },
  ]);
  const params = useParams();

  console.log(params);
  return (
    <div>
      <h2>on day: {props.di}</h2>
      <ul>
        {tasks.map((el) => {
          return (
            <li>
              {el.when} : {el.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
