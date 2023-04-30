import { useState } from 'react';
import classes from './App.module.css'
import Container from './components/Container/Container';
import Button from './components/Button/Button';
import TodoCard from './components/TodoCard/TodoCard';

function App() {
  const [isShow, setIsShow] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [search] = useState('');
  const [currentEdit, setCurrentEdit] = useState(null);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Coding',
      completed: false
    },
    {
      id: 2,
      title: 'Eat',
      completed: false
    },
    {
      id: 3,
      title: 'Sleep',
      completed: false
    },
    {
      id: 4,
      title: 'Coding',
      completed: false
    },
    {
      id: 5,
      title: 'Codinfsdfg',
      completed: false
    },
  ]);
  const [filter, setFilter] = useState('all');

  const handleShow = () => setIsShow(!isShow);

  // eslint-disable-next-line no-unused-vars
  const handleAddTask = () => {
    if (newTask.length < 1) return;

    setTasks((prevState) => [
      ...prevState,
      {
        id: Date.now(),
        title: newTask,
        completed: false
      }
    ]);
    setNewTask('');
    handleShow();
  };

  const handleDone = (id) => {
    const newList = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      } else {
        return task
      }
    })
    setTasks([...newList])
  };
  const handleClearTasks = () => {
    setTasks([]);
    localStorage.clear();
  };


  const handleDelete = (id) => {
    const deletedLedList = tasks.filter(task => task.id !== id);
    setTasks([...deletedLedList])
  };
  const handleEdit = (editTask) => {
    const editList = tasks.map(task => {
      if (task.id === editTask.id) {
        return editTask
      } else {
        return task
      }
    })
    setTasks([...editList]);

  };
  const filteredTasks = tasks
      .filter((task) =>
          filter === 'completed'
              ? task.completed
              : filter === 'notCompleted'
                  ? !task.completed
                  : true
      )
      .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()));
  return (
      <div>
        <Container setFilter={setFilter} filter={filter}>
          <div className={classes.wrapper}>
            {filteredTasks.map((task) => (
                <TodoCard
                    handleDone={handleDone}
                    handleDelete={handleDelete}
                    handleSelectEdit={setCurrentEdit}
                    handleEdit={handleEdit}
                    isEdit={currentEdit === task.id}
                    key={task.id}
                    task={task}
                />
            ))}
          </div>
        </Container>
        <Button handleClick={handleClearTasks}>Очистить все таски</Button>
      </div>
  );


}


export default App;
