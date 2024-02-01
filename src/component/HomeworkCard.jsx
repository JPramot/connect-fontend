import axios from "axios";

export default function HomeworkCard(props) {
  const { homework, modalHandle } = props;
  const {
    id,
    question,
    startDate,
    dueDate,
    published,
    subject: { title },
  } = homework;
  const formatDate = (d) => {
    return new Intl.DateTimeFormat("en-UK", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(d);
  };
  const deleteHandle = async (e) => {
    try {
      e.stopPropagation();
      const token = localStorage.getItem("token");
      const result = await axios.delete(
        `http://localhost:8000/homework/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(999);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="card w-5/6 border mx-auto hover:shadow"
      onClick={() => modalHandle(homework)}
    >
      <div className="card-body gap-4">
        <div className="flex justify-between">
          <div className="text-xl">
            {title}
            <small
              className={`border rounded mx-2 p-1 text-xs ${
                published ? "bg-info text-white" : ""
              }`}
            >
              {!published && "un-"}Published
            </small>
          </div>
          <div
            className="badge badge-outline badge-error cursor-pointer"
            onClick={deleteHandle}
          >
            Delete
          </div>
        </div>
        <div className="flex justify-between">
          <p>start : {formatDate(new Date(startDate))}</p>
          <p className="text-right">due : {formatDate(new Date(dueDate))} </p>
        </div>
        <p className="text-lg"> {question} </p>
      </div>
    </div>
  );
}
