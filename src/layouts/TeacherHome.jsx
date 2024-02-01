import { useState, useEffect } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";
import HomeworkCard from "../component/HomeworkCard";
import ModalEditForm from "./ModalEditForm";

export default function TeacherHome() {
  const [homework, setHomework] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState({});
  const [reload, setReload] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get("http://localhost:8000/homework", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHomework(result.data.homework);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [reload]);

  const modalHandle = (item) => {
    document.getElementById("edit_modal").showModal();
    setEditData(item);
  };
  const closeModalHandle = (item) => {
    document.getElementById("edit_modal").close();
    setEditData(item);
  };

  if (loading) return <div className="text-4xl">loading</div>;
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl text-center">All Homework</h1>
      {homework.map((el) => (
        <HomeworkCard key={el.id} homework={el} modalHandle={modalHandle} />
      ))}
      <>
        <dialog id="edit_modal" className="modal">
          <div className="modal-box">
            {editData?.id && (
              <ModalEditForm
                editData={editData}
                closeEdit={closeModalHandle}
                setReload={setReload}
              />
            )}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </>
    </div>
  );
}
