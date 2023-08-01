
const nameRegex = /(?<=\bName\s?:?)[^\n]+/i;
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
const phoneRegex = /\b(?:\+\d{1,3}[-. \\\/]?)?\(?(?:\d{1,4}\)?[-. \\\/]?){0,3}(?:\d{1,4})?\)?[-. \\\/]\d{1,9}[-. \\\/]?\d{1,9}\b/g;

function parseResumeData(pdfText) {
  const lines = pdfText.split('\n');
  const extractedInfo = {};

  for (const line of lines) {
    // Extract personal info
    if (!extractedInfo.name) {
      const nameMatch = line.match(nameRegex);
      if (nameMatch) {
        extractedInfo.name = nameMatch[0].trim();
      }
    }

    if (!extractedInfo.email) {
      const emailMatch = line.match(emailRegex);
      if (emailMatch) {
        extractedInfo.email = emailMatch[0].trim();
      }
    }

    if (!extractedInfo.phone) {
      const phoneMatch = line.match(phoneRegex);
      if (phoneMatch) {
        extractedInfo.phone = phoneMatch[0].trim();
      }
    }

    // Detect other sections
    if (line.match(/\b(?:education|academic background)\b/i)) {
      extractedInfo.education = [];
      continue;
    }

    if (line.match(/\b(?:experience|work experience)\b/i)) {
      extractedInfo.experience = [];
      continue;
    }

    if (line.match(/\b(?:skills|technical skills)\b/i)) {
      extractedInfo.skills = [];
      continue;
    }

    // Add other data to the corresponding section
    if (extractedInfo.education) {
      extractedInfo.education.push(line.trim());
    } else if (extractedInfo.experience) {
      extractedInfo.experience.push(line.trim());
    } else if (extractedInfo.skills) {
      extractedInfo.skills.push(line.trim());
    }
  }

  console.log(extractedInfo);
  return extractedInfo;
}


module.exports = parseResumeData;