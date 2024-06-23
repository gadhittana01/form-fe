import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    identityNumber: '',
    email: '',
    dateOfBirth: ''
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let errors = {};

    if (!formData.name) errors.name = 'Name is required';
    if (!formData.identityNumber) errors.identityNumber = 'Identity Number is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of Birth is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post('http://localhost:8080/v1/users', formData);
      setAlert({ type: 'success', message: 'Data submitted successfully!' });
      setFormData({
        name: '',
        identityNumber: '',
        email: '',
        dateOfBirth: ''
      });
    } catch (error) {
      setAlert({ type: 'danger', message: 'Error submitting data' });
    }
  };

  return (
    <div className="container mt-5">
      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-row align-items-center mb-3">
          <div className="col-md-5">
            <label htmlFor="name" className="col-form-label">Name</label>
          </div>
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <small className="form-text text-danger">{errors.name}</small>}
          </div>
        </div>

        <div className="form-row align-items-center mb-3">
          <div className="col-md-5">
            <label htmlFor="identityNumber" className="col-form-label">Identity Number</label>
          </div>
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              id="identityNumber"
              name="identityNumber"
              value={formData.identityNumber}
              onChange={handleChange}
            />
            {errors.identityNumber && <small className="form-text text-danger">{errors.identityNumber}</small>}
          </div>
        </div>

        <div className="form-row align-items-center mb-3">
          <div className="col-md-5">
            <label htmlFor="email" className="col-form-label">Email</label>
          </div>
          <div className="col-md-7">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <small className="form-text text-danger">{errors.email}</small>}
          </div>
        </div>

        <div className="form-row align-items-center mb-3">
          <div className="col-md-5">
            <label htmlFor="dateOfBirth" className="col-form-label">Date of Birth</label>
          </div>
          <div className="col-md-7">
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            {errors.dateOfBirth && <small className="form-text text-danger">{errors.dateOfBirth}</small>}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
