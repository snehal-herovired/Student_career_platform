import React from 'react';
import '../../../styles/background.css'
import '../../../styles/personalinfo.css'
export default function PersonalInfo() {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Handle the file upload logic
    console.log(file);
  };

  return (
    <div
      style={{
        color: 'black',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
      }}
      className='herox'
    >
      <form style={{ width: '80%', maxWidth: '600px' }}>
        <div className="row" style={{width:'100%'}}>
          <div className="col-md-4 mb-3" >
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" name="email" />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input type="tel" className="form-control" id="phone" name="phone" />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="linkedin" className="form-label">
              LinkedIn
            </label>
            <input type="text" className="form-control" id="linkedin" name="linkedin" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3"style={{width:'50%'}}>
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea className="form-control" id="address" name="address" rows="3"></textarea>
          </div>
          <div className="col-md-6 mb-3"style={{width:'50%'}}>
            <label htmlFor="about" className="form-label">
              About
            </label>
            <textarea className="form-control" id="about" name="about" rows="3"></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="twitter" className="form-label">
              Twitter
            </label>
            <input type="text" className="form-control" id="twitter" name="twitter" />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="facebook" className="form-label">
              Facebook
            </label>
            <input type="text" className="form-control" id="facebook" name="facebook" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="github" className="form-label">
              GitHub
            </label>
            <input type="text" className="form-control" id="github" name="github" />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input type="file" className="form-control" id="image" name="image" onChange={handleFileChange} />
          </div>
        </div>
        <button type="submit" className="btn" style={{background:'red',color:'white'}}>
          Submit
        </button>
      </form>
    </div>
  );
}
