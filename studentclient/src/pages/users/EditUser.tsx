import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const EditUser: React.FC = ({}) => {

  const { id } = useParams<{id: string}>();
  const [user, setUser] = useState({
    name: "",
    address: "",
    email: "",
  });

  const { name, address, email } = user;
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(`🍎 ~ file: EditUser.tsx:18 ~ onInputChange ~ e:`, e);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`🍎 ~ file: EditUser.tsx:24 ~ onSubmit ~ user:`, user);
    await axios.put(`http://localhost:9090/api/v1/user/update/${id}`, user);
    setUser({ name: "", address: "", email: "" });
    window.location.href = "/";
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:9090/api/v1/user/get/${id}`);
    console.log(result);
    setUser(result.data);
  };

  useEffect(() => {
    console.log(`Hello World, id is ` + id);
    loadUser();
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center mb-4">Edit User</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            {/* name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter name"
                name="name"
                value={name}
                onChange={e => onInputChange(e)}
              ></input>
            </div>
            {/* address */}
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter address"
                name="address"
                value={address}
                onChange={e => onInputChange(e)}
              ></input>
            </div>
            {/* email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={e => onInputChange(e)}
              ></input>
            </div>
            {/* buttons */}
            <DivWrapper className="mb-3">
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
              <Link to="/" type="button" className="btn btn-outline-danger mx-2">
                Cancel
              </Link>
            </DivWrapper>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;

const DivWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
