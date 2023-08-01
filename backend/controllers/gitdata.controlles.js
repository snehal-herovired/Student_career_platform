const GitDataModel = require("../models/github.model");
const { Resume } = require('../models/resume.model');
const PDFCreator = require('pdf-creator-node');
const handlebars = require('handlebars');
var PdfPrinter = require('pdfmake');
const axios = require('axios');// If using Node.js
const fs = require('fs');
const util = require('util');
const path = require('path');
async function fetchFontBuffer(url) {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
    });
    return Buffer.from(response.data, 'binary');
  } catch (error) {
    console.error('Error fetching font:', error.message);
    return null;
  }
}

// Fetch the Roboto fonts and create the fontDescriptors object

const insertgitData = async (req, res) => {
  try {
    const githubData = req.body.gitdata;
    const studentId = githubData.userData.studentId; // Assuming the username is present in the userData

    // Find existing user data in the database based on username
    let existingUser = await GitDataModel.findOne({ "userData.studentId": studentId });

    if (!existingUser) {
      // If user data does not exist, create a new document
      existingUser = new GitDataModel(githubData);
    } else {
      // If user data exists, update the fields
      existingUser.repositoriesData = githubData.repositoriesData;
      existingUser.totalCommits = githubData.totalCommits;
      existingUser.averageLanguagesPercentage = githubData.averageLanguagesPercentage;
    }

    // Save the user data document
    await existingUser.save();
    return res.status(200).json(existingUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};




const getGitDataByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const gitData = await GitDataModel.findOne({ "userData.studentId": studentId });
    let resume = await Resume.findOne({ studentId });

    if (!gitData) {
      return res.status(404).json({ message: 'Git data not found for the specified student ID' });
    }
    if (!resume) {
      return res.status(404).json({ message: 'Git data not found for the specified student ID' });

    }


    return res.status(200).json(gitData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

// / API endpoint to generate and download the PDF

const pdf = require('html-pdf');

const generatePDF = async (req, res) => {
  try {
    const { studentId } = req.params;
    const gitData = await GitDataModel.findOne({ "userData.studentId": studentId });
    let resumeData = await Resume.findOne({ studentId }).populate('studentId');

    if (!gitData) {
      return res.status(404).json({ message: 'Git data not found for the specified student ID' });
    }
    if (!resumeData) {
      return res.status(404).json({ message: 'Git data not found for the specified student ID' });
    }

    // Read the HTML template file
    const templatePath = path.join(__dirname,'..','/views/template1.html');
    const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

    
    const compiledTemplate = handlebars.compile(htmlTemplate,{
      ignoreDecorators: true,
    });
    
    
    
    const templateData = {
      studentId: {
        username: resumeData.studentId.username,
      },
      gitData: {
        avatar: gitData.userData.avatar,
        
      },
      contactInformation: {
        email: resumeData.contactInformation.email,
        phone: resumeData.contactInformation.phone,
        address: resumeData.contactInformation.address,
        github: resumeData.contactInformation.github,
        linkedIn: resumeData.contactInformation.linkedIn,
      },
      about: resumeData.about,
      experience:  resumeData.experience.map((exp) => ({
        position: exp.position,
        company: exp.company,
        duration: exp.duration,
      })),
      education:  resumeData.education.map((exp) => ({
        institution: exp.institution,
        degree: exp.degree,
        year: exp.year,
      })),
      projects:  resumeData.projects.map((exp) => ({
        title: exp.title,
        description: exp.description,
        link: exp.link,
        
      })),
      skills: Object.entries(gitData.averageLanguagesPercentage).map((ele) => {
        let [languageName, percentage] = ele;
        languageName = languageName[0].toUpperCase() + languageName.slice(1);
        return ` ${languageName}`;
      })
     
      // Add other properties similarly...
    };
    // Evaluate the compiled Handlebars template with the provided data
    console.log(templateData);
    const evaluatedHtml = compiledTemplate(templateData)

    // Set options for PDF generation
    const options = {
      format: 'A4',
      orientation: 'portrait',
    
    };

    // Generate the PDF using html-pdf
    pdf.create(evaluatedHtml, options).toBuffer((err, buffer) => {
      if (err) {
        console.error('Error generating PDF:', err);
        return res.status(500).send('Error generating PDF');
      }

      // Set response headers to indicate that the response is a PDF file
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');

      // Send the PDF as the response
      res.end(buffer);
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
  }
}
// async function getImageDataUrl(imageUrl) {
//   try {
//     const response = await axios.get(imageUrl, {
//       responseType: 'arraybuffer',
//     });

//     const imageData = Buffer.from(response.data, 'binary').toString('base64');
//     const dataUrl = `data:image/jpeg;base64,${imageData}`;
//     return dataUrl;
//   } catch (error) {
//     console.error('Error fetching image:', error.message);
//     return null;
//   }
// }

// const generatePDF = async (req, res) => {
//   try {
//     const { studentId } = req.params;
//     const gitData = await GitDataModel.findOne({ "userData.studentId": studentId });
//     let resumeData = await Resume.findOne({ studentId }).populate('studentId');

//     if (!gitData) {
//       return res.status(404).json({ message: 'Git data not found for the specified student ID' });
//     }
//     if (!resumeData) {
//       return res.status(404).json({ message: 'Resume data not found for the specified student ID' });
//     }
//     const imgUrl = await getImageDataUrl(gitData.userData.avatar)
//     const customFont = {
//       normal: '../fonts/Roboto-Regular.ttf',
//       bold: '../fontes/Roboto-Bold.ttf',
//       italics: '../fonts/Roboto-Italic.ttf',
//       bolditalics: '../fonts/Roboto-BoldItalic.ttf'
//     };
//     const robotoNormal = await fetchFontBuffer('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
//     const robotoBold = await fetchFontBuffer('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap"');
//     const robotoItalic = await fetchFontBuffer('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,300;1,400;1,500&display=swap');
//     const robotoBoldItalic = await fetchFontBuffer('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,700&display=swap');

//     var fonts = {
//       Courier: {
//         normal: 'Courier',
//         bold: 'Courier-Bold',
//         italics: 'Courier-Oblique',
//         bolditalics: 'Courier-BoldOblique'
//       },
//       Helvetica: {
//         normal: 'Helvetica',
//         bold: 'Helvetica-Bold',
//         italics: 'Helvetica-Oblique',
//         bolditalics: 'Helvetica-BoldOblique'
//       },
//       Times: {
//         normal: 'Times-Roman',
//         bold: 'Times-Bold',
//         italics: 'Times-Italic',
//         bolditalics: 'Times-BoldItalic'
//       },
//       Symbol: {
//         normal: 'Symbol'
//       },
//       ZapfDingbats: {
//         normal: 'ZapfDingbats'
//       },
//       Roboto: {
//         normal: robotoNormal || fs.readFileSync(customFont.normal),
//         bold: robotoBold || fs.readFileSync(customFont.bold),
//         italics: robotoItalic || fs.readFileSync(customFont.italics),
//         bolditalics: robotoBoldItalic || fs.readFileSync(customFont.bolditalics)
//       },
//     };

//     var printer = new PdfPrinter(fonts);

//     // Function to split an array into chunks
//     function chunkArray(arr, size) {
//       const result = [];
//       for (let i = 0; i < arr.length; i += size) {
//         result.push(arr.slice(i, i + size).map(([key, _]) => key));
//       }
//       return result;
//     }

//     // Skills array (example)
//     const skillsArray = Object.entries(gitData.averageLanguagesPercentage);

//     // Split the skills array into rows of three elements each
//     const skillsRows = chunkArray(skillsArray, 3);

//     const documentDefinition = {

//       pageSize: {
//         width: 595.28,
//         height: 841.89
//       },
//       background: function () {
//         return {
//           canvas: [
//             {
//               type: 'rect',
//               x: 0, y: 0, w: 595.28, h: 841.89,
//               color: '#F5F5F5'
//             }
//           ]
//         };
//       },
//       content: [
//         {
          
          
          
//           table: {
//             headerRows: 0,
//             body: [
//               [
//                 {
//                 // Choose your color
                
//                 // Remove distasteful border
//                 border: [false, false, false, true],

//                 // Columns/Whatever goes here
//                 columns: [{
//                   // auto-sized columns have their widths based on their content
//                   width: 'auto',
//                   text: resumeData.studentId.username,
//                   style: 'header',
                 
//                 }],
//                 // optional space between columns
//                 columnGap: 10
//               },
//               ]


//             ]

//           },
//         },

//         {
//           columns: [
//             {
//               image: imgUrl,
//               fit: [90, 90],
//               width: '70%', // Adjust the width of the image column
//               margin: [0, 0, 30, 0],
              

//             },

//             {
//               stack: [
//                 { text: resumeData.contactInformation.email, style: 'customText' },
//                 { text: resumeData.contactInformation.phone, style: 'customText' },
//                 { text: resumeData.contactInformation.address, style: 'customText' },
//                 {
//                   stack: [
//                     { text: 'Github', link: resumeData.contactInformation.github, style: 'customLink' },
//                     { text: 'LinkedIn', link: resumeData.contactInformation.linkedIn, style: 'customLink' },
//                   ],
//                 },
//               ],
//             },

//           ],

//           type: 'rect',
//           x: 50, y: 100, w: 300, h: 100,
//           color: '#749BC2',

//           style: 'headerContent',
//         },
//         {
//           text: 'About',
//           style: 'sectionTitle',
//           borderColor: '#000000',
//           border:[false,false,false,true]
//         },
//         {
//           text: resumeData.about,
//           style: 'sectionContent',
//         },
//         {
//           text: 'Education',
//           style: 'sectionTitle',
//         },
//         {
//           columns: resumeData.education.map((ele) => ({
//             width: '50%',
//             stack: [
//               { text: ele.degree, style: 'sectionContentHeader' },
//               { text: ele.year, style: 'subDetails' },
//               { text: ele.institution },
//             ],
//           })),
//           style: 'sectionContent',
//         },
//         {
//           text: 'Work Experience',
//           style: 'sectionTitle',
//         },
//         {
//           columns: resumeData.experience.map((ele) => ({
//             width: '50%',
//             stack: [
//               { text: ele.position, style: 'sectionContentHeader' },
//               { text: ele.duration, style: 'subDetails' },
//               { text: ele.company },
//             ],
//           })),
//           style: 'sectionContent',
//         },
//         {
//           text: 'Key Skills',
//           style: 'sectionTitle',
//         },
//         // Display skills in rows
//         ...skillsRows.map((row) => ({
//           columns: row.map((skill) => ({
//             width: '33%',
//             stack: [
//               { text: skill, style: 'keySkills' },
//             ],
//           })),
//         })),
//       ],
//       defaultStyle: {
//         font: 'Helvetica',
//         fontSize: 12,
//         color: '#222',
//       },
//       styles: {
//         header: {
//           fontSize: 22,
//           bold: true,
//           margin: [0, 15, 0, 5],
//           backgroundColor: 'lightblue'
//         },
//         name: {
//           fontSize: 28,
//           bold: true,
//         },
//         jobTitle: {
//           fontSize: 24,
//           italics: true,
//         },
//         headerContent: {
//           height: 100,
//           width: 300,
//           margin: [0, 15, 0, 15],
//         },
//         customText: {
//           margin: 2,
//           border:[false,false,false,true]
//         },
//         sectionTitle: {
//           fontSize: 24,
//           bold: true,
//           margin: [0, 15, 0, 5],
//         },
//         sectionContent: {
//           margin: [0, 0, 0, 15],
//         },
//         sectionContentHeader: {
//           fontSize: 20,
//           bold: true,
//         },
//         subDetails: {
//           fontSize: 12,
//           italics: true,
//         },
//         icon: {
//           fontFamily: 'FontAwesome',
//         },
//         keySkills: {
//           fontSize: 16,
//           color: '#4A55A2',
//           margin: [2, 2, 2, 2]
//         },
//         customLink: {
//           color: 'blue',
//           margin: 2
//         },
//       },
//     };

//     // Replace the placeholders in the document definition with actual data when generating the PDF.



//     const pdfDoc = printer.createPdfKitDocument(documentDefinition);
//     pdfDoc.pipe(res);
//     pdfDoc.end();
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//     res.status(500).send('Error generating PDF');
//   }
// };



module.exports = { insertgitData, getGitDataByStudentId, generatePDF };
