import React from "react";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          task_name: "",
          start_datetime: "",
          end_datetime: "",
          task_memo: "",
        },
      ],
    };
  }

  addNewTask() {
    this.setState({
      tasks: [
        ...this.state.tasks,
        {
          task_name: "",
          start_datetime: "",
          end_datetime: "",
          task_memo: "",
        },
      ],
    });
  }

  handleChange(e, index) {
    this.state.tasks[index][e.target.name] = e.target.value;
    this.setState({ tasks: this.state.tasks });
  }
  render() {
    return (
      <div className="task-form">
        {this.state.tasks.map((task, index) => {
          return (
            <div key={index}>
              <input
                type="text"
                placeholder="task_name"
                name="task_name"
                value={task.task_name}
                onChange={(e) => {
                  this.handleChange(e, index);
                }}
              />
              <input
                type="datetime-local"
                placeholder="start_datetime"
                name="start_datetime"
                value={task.start_datetime}
                onChange={(e) => {
                  this.handleChange(e, index);
                }}
              />
              <input
                type="datetime-local"
                placeholder="end_datetime"
                name="end_datetime"
                value={task.end_datetime}
                onChange={(e) => {
                  this.handleChange(e, index);
                }}
              />
              <input
                type="url"
                placeholder="url"
                name="url"
                value={task.url}
                onChange={(e) => {
                  this.handleChange(e, index);
                }}
              />
              <textarea
                placeholder="task_memo"
                name="task_memo"
                value={task.task_memo}
                onChange={(e) => {
                  this.handleChange(e, index);
                }}
              />
            </div>
          );
        })}
        <button type="button" onClick={() => this.addNewTask()}>
          +
        </button>
      </div>
    );
  }
}

export default TaskForm;
