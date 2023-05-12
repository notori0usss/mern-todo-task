import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import NoteCard from "./NoteCard";
import AddModel from "./models/AddModel";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [sendRequest, setSendRequest] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const getRequest = (status: number) => {
    setSendRequest(sendRequest + 1);
  };
  const modelHandler = () => {
    setShowModal(false);
  };
  const colorRandomizer = () => {
    const colors: string[] = ["bg-red-300", "bg-blue-200", "bg-teal-200"];
    const color: number = Math.floor(Math.random() * colors.length + 1);
    return colors[color];
  };
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/notes/", {
          headers: {
            Authorization: localStorage.getItem("SavedToken"),
          },
        });
        setNotes(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchNotes();
  }, [sendRequest]);

  const memoizedNotes = useMemo(() => notes, [notes]);

  return (
    <div className={"w-full space-y-8"}>
      <button
        onClick={() => setShowModal(true)}
        className={
          "text-right mt-2 bg-button px-3 py-2 rounded text-normal font-semibold"
        }
      >
        Add Note
      </button>
      {showModal && (
        <AddModel getRequest={getRequest} modelHandler={modelHandler} />
      )}
      {notes.length <= 0 ? (
        <div
          className={
            "bg-blue-200 space-y-4 p-4 h-24 flex items-center justify-center font-semibold text-normal text-lg"
          }
        >
          Looks like you don't Have no notes here!
        </div>
      ) : (
        ""
      )}
      {memoizedNotes?.map((item: any) => (
        <NoteCard
          getRequest={getRequest}
          _id={item._id}
          title={item.title}
          key={item._id}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default Notes;
