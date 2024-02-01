import axios from "axios";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function HomeworkForm() {
  const [subject, setSubject] = useState([]);
  const [input, setInput] = useState({
    subjectId: "",
    question: "",
    startDate: new Date(),
    dueDate: new Date(),
    published: false,
  });

  const formHandle = (e) => {
    setInput((cur) => ({ ...cur, [e.target.name]: e.target.value }));
  };

  const submitHandle = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/homework", input, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("success");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const run = async () => {
      try {
        const result = await axios.get("http://localhost:8000/subject");
        setSubject(result.data.subject);
      } catch (err) {
        console.log(err);
      }
    };
    run();
  }, []);
  return (
    <div className="flex flex-col gap-5 min-w-[600px] w4/6 border mx-auto p-8 rounded">
      <h1 className="text-4xl">New Homework</h1>
      <form className="flex flex-col gap-2 " onSubmit={submitHandle}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Select Subject</span>
          </div>
          <select
            value={input.subjectId}
            className="select select-bordered"
            onChange={formHandle}
            name="subjectId"
          >
            <option disabled value="0">
              Pick one
            </option>
            {subject.map((el) => (
              <option key={el.id} value={el.id}>
                {el.title}
              </option>
            ))}
          </select>
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Question</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Question"
            name="question"
            value={input.question}
            onChange={formHandle}
          ></textarea>
        </label>
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-4">
            <span className="label-text">Published</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              name="published"
              checked={input.published}
              onChange={(e) =>
                setInput((cur) => ({ ...cur, published: !cur.published }))
              }
            />
          </label>
        </div>
        <div className="flex justify-between">
          <div className="form-control w-1/3">
            <div className="label">
              <span className="label-text">Start date</span>
            </div>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={input.startDate}
              onChange={(date) =>
                setInput((cur) => ({ ...cur, startDate: date }))
              }
            />
          </div>
          <div className="form-control w-1/3">
            <div className="label">
              <span className="label-text">Due date</span>
            </div>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={input.dueDate}
              onChange={(date) =>
                setInput((cur) => ({ ...cur, dueDate: date }))
              }
            />
            {/* <input
              type="date"
              name="dueDate"
              value={input.dueDate}
              onChange={formHandle}
            /> */}
          </div>
        </div>
        <button className="btn btn-outline mt-[200px]">Add New Homework</button>
      </form>
    </div>
  );
}
