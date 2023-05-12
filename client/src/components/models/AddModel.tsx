import React, { useState } from "react";
import Input from "../Input";
import axios from "axios";

interface AddModelProps {
  modelHandler: any;
  getRequest: any;
}
const AddModel: React.FC<AddModelProps> = ({ modelHandler, getRequest }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState("");

  const addNoteHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/notes/",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: localStorage.getItem("SavedToken"),
          },
        }
      );
      // handle success
      getRequest(1);
      modelHandler();
    } catch (e) {
      // handle error
      console.log(e);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-10">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={modelHandler}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-1/2  p-4 mx-auto bg-background rounded-md shadow-lg">
            <div className="mt-3 sm:flex">
              <div className="mt-2 text-center sm:ml-4 sm:text-left space-y-4 w-full">
                <h4 className="text-lg font-medium text-gray-800">Add Note</h4>
                <Input
                  type={"text"}
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                  placeholder={"Title"}
                  id={"title"}
                />
                <textarea
                  value={description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setDescription(e.target.value)
                  }
                  placeholder={"Description"}
                  className={
                    "w-full p-3 rounded-md text-gray-600 font-semibold outline-normal"
                  }
                  rows={4}
                  maxLength={100}
                ></textarea>
                <div className="items-center gap-2 mt-3 sm:flex">
                  <button
                    className="w-full mt-2 p-2.5 flex-1 text-normal font-semibold bg-button rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                    onClick={addNoteHandler}
                  >
                    Add
                  </button>
                  <button
                    className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                    onClick={modelHandler}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddModel;
