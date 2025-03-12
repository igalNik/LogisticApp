# תמונת בסיס - Node.js בגרסה קלה
FROM node:22-slim

# הגדרת תיקיית עבודה בתוך הקונטיינר
WORKDIR /app

# העתקת קבצי package.json ו-package-lock.json (אם קיים)
COPY package.json .
COPY package-lock.json* ./

# התקנת התלויות, כולל nodemon כתלות פיתוח
RUN npm install && npm install -g nodemon

# העתקת כל שאר הקבצים של הפרויקט
COPY . .

# פתיחת פורט שבו ה-API רץ (נניח 3000)
EXPOSE  8000
# פקודה להרצת ה-API בסביבת פיתוח
CMD ["npm", "start"]