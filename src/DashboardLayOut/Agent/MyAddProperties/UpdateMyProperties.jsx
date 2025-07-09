import React from "react";
import useAuth from "../../../hooks/useAuth";

const UpdateMyProperties = ({ property }) => {
  const { user } = useAuth();

  const { image, title, location } = property || {};

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="px-4 py-1 rounded bg-[#064d57] text-white "
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Update
      </button>

      {/* form section */}

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">{property.agent.name}</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="mb-20">
        <section className={` overflow-scroll table mb-20  `}>
          <form
            onSubmit={handleUpdate}
            className="container overflow-hidden flex flex-col mx-auto space-y-12"
          >
            <div className="grid grid-cols-1 gap-6 mx-auto  rounded-md shadow-sm dark:bg-gray-50">
              {/* 1 */}
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Marathon Image</legend>
                <input
                  type="photoURL"
                  name="photo"
                  defaultValue={image}
                  className="input"
                  placeholder="Marathon Image URL"
                />
              </fieldset>
              {/* 2 */}
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Marathon Title</legend>
                <input
                  type="text"
                  defaultValue={title}
                  name="name"
                  className="input"
                  placeholder="Marathon Title"
                />
              </fieldset>
              {/* 3 */}
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Marathon Title</legend>
                <input
                  type="text"
                  defaultValue={location}
                  name="name"
                  className="input"
                  placeholder="Marathon Title"
                />
              </fieldset>
              {/* 9 */}
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">User Name</legend>
                <input
                  readOnly
                  type="text"
                  name="displayName"
                  value={user?.displayName || ""}
                  className="input"
                  placeholder="My awesome page"
                />
              </fieldset>
              {/* 10 */}
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">User Email</legend>
                <input
                  readOnly
                  type="email"
                  name="email"
                  value={user?.email || ""}
                  className="input"
                  placeholder="My awesome page"
                />
              </fieldset>
            </div>
            <button type="submit" className="w-full btn text-2xl p-8 mb-20">
              Update Marathon
            </button>
          </form>
        </section>
      </div>

      {/* Close button */}
      <div className="modal-action">
        <label htmlFor="my_modal_6" className="btn">
          Close!
        </label>
      </div>
    </div>
  );
};

export default UpdateMyProperties;
