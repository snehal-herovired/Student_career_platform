import React from 'react';

export default function MyForm() {
  return (
    <div
      style={{
        color: 'red',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form style={{ width: '45%' }}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input type="text" className="form-control" id="title" name="title" />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea className="form-control" id="description" name="description"></textarea>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="technologies" className="form-label">
            Technologies
          </label>
          <select multiple className="form-control" id="technologies" name="technologies">
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">Reactjs</option>
            <option value="Node.js">Nodejs</option>
            <option value="Node.js">Expressjs</option>
            <option value="Node.js">MaterialUI</option>
            <option value="Node.js">Bootstrap</option>
            <option value="Node.js">MongoDb</option>
            <option value="Node.js">Python</option>
            <option value="Node.js">Java</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="link" className="form-label">
            Link
          </label>
          <input type="text" className="form-control" id="link" name="link" />
        </div>
        <button type="submit" className="btn btn-primary">
          Done
        </button>
      </form>
    </div>
  );
}
