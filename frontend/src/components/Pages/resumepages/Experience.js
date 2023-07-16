import React from 'react'

export default function Experience() {
  return (
    <div style={{ color: "black", height: "100%", width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form style={{ width: "45%" }}>



        <div className="mb-3">
          <label htmlFor="company" className="form-label">
            Company
          </label>
          <input
            type="text"
            className="form-control"
            id="company"
            name="company"

          />
        </div>
        <div className="mb-3">
          <label htmlFor="position" className="form-label">
            Position
          </label>
          <input
            type="text"
            className="form-control"
            id="position"
            name="position"

          />
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">
            Duration
          </label>
          <input
            type="number"
            className="form-control"
            id="duration"
            name="duration"

          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
       
      </form>
    </div>
  )
}
