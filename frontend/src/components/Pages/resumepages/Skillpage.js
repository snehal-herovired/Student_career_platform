import React from 'react'

export default function Skillpage() {
  return (
    <div style={{ color: "black", height: "100%", width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form style={{ width: "45%" }}>



        <div className="mb-3">
          <label htmlFor="company" className="form-label">
            Skill
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder='Nodejs'

          />
        </div>
        <div className="mb-3">
          <label htmlFor="position" className="form-label">
            Proficiency
          </label>
          <input
            type="text"
            className="form-control"
            id="proficiency"
            name="proficiency"
            placeholder='[beginner,intermediate,advance,expert]'

          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        
      </form>
    </div>
  )
}
