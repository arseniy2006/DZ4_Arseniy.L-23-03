import Modal from './components/Modal/Modal';
import { useState } from 'react';
import classes from './App.module.css'
import Container from './components/Container/Container';
import Button from './components/Button/Button';
import TodoCard from './components/TodoCard/TodoCard';

function App() {
  const [isShow, setIsShow] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [search, setSearch] = useState('');
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

  const handleDelete = (id) => {
    const deletedLedList = tasks.filter(task => task.id !== id);
    setTasks([...deletedLedList])
  };

  const handleSearch = (event) => {
    setSearch(event.target.value)
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
      <>
        <Container>
          <div className={classes.wrapper}>
            {isShow && <Modal handleAddTask={handleAddTask} setNewTask={setNewTask} handleShow={handleShow} />}
            <div className={classes.header}>
              <Button handleClick={handleShow}><p>Добавить</p></Button>
              <input name='search' placeholder='Поиск...' onChange={handleSearch} />
              <select onChange={(event) => setFilter(event.target.value)}>
                <option value='all'>Все таски</option>
                <option value='completed'>Выполненные</option>
                <option value='notCompleted'>Не выполненные</option>
              </select>
            </div>
            {filteredTasks.map(task =>
                <TodoCard
                    handleDone={handleDone}
                    handleDelete={handleDelete}
                    handleSelectEdit={setCurrentEdit}
                    handleEdit={handleEdit}
                    isEdit={ currentEdit === task.id}
                    key={task.id}
                    task={task}
                />
            )}
          </div>
        </Container>
      </>
  );

}

export default App;
