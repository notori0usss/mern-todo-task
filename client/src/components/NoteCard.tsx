import React, { useEffect, useState } from "react";
import axios from "axios";
import EditModel from "./models/EditModel";
import { FaPen, FaTrash } from "react-icons/fa";
interface NoteCardProps {
  getRequest: any;
  _id: string;
  description: string;
  title: string;
}
const NoteCard: React.FC<NoteCardProps> = ({
  description,
  title,
  _id,
  getRequest,
}) => {
  const [showModal, setShowModal] = useState(false);

  const deleteNote = async (_id: string) => {
    try {
      const response: any = await axios.delete(
        `http://localhost:5000/notes/${_id}/`,
        {
          headers: {
            Authorization: localStorage.getItem("SavedToken"),
          },
        }
      );
      getRequest(1);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const editHandler = () => {
    setShowModal(true);
  };
  const modelHandler = () => {
    setShowModal(false);
  };
  return (
    <>
      {showModal && (
        <EditModel
          _id={_id}
          title={title}
          description={description}
          getRequest={getRequest}
          modelHandler={modelHandler}
        />
      )}
      <div className={"bg-blue-200 space-y-4 p-4"}>
        <div className={"flex justify-between"}>
          <h1 className={"text-2xl text-normal font-semibold"}>{title}</h1>
          <div className={"flex gap-4"}>
            <button onClick={() => deleteNote(_id)}>
              <FaTrash />
            </button>
            <button onClick={editHandler}>
              <FaPen />
            </button>
          </div>
        </div>
        <p className={"text-xl text-highlight"}>{description}</p>
      </div>
    </>
  );
};
export default NoteCard;
