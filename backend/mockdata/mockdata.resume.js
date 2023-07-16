// Create Resume (POST /resumes)
let obj ={
  "studentId": "613b0f5e5fc360001f000001",
  "batchId": "613b0f5e5fc360001f000002",
  "contactInformation": {
    "email": "john@example.com",
    "phone": "1234567890",
    "address": "123 Main St, City"
  },
  "education": [
    {
      "institution": "University of ABC",
      "degree": "Bachelor of Science",
      "year": 2022
    }
  ],
  "experience": [
    {
      "company": "XYZ Corp",
      "position": "Software Developer",
      "duration": "2019 - 2021"
    }
  ],
  "skills": [
    {
      "name": "JavaScript",
      "proficiency": "Intermediate"
    }
  ],
  "projects": [
    {
      "title": "Project A",
      "description": "Lorem ipsum dolor sit amet",
      "technologies": ["React", "Node.js"],
      "link": "https://project-a.example.com"
    }
  ],
  "image": "profile.jpg",
  "resumePdf": "resume.pdf"
}
