




// const updatescore = async (faculty) => {
      
//     let totalscore=0;
//     let s1=0;
//     let s2=0;
//     let es1=0;
//     let es2=0;
//   let tscore=0;
//     faculty.teachingProcess.forEach((entry, index) => {


//       const attainment=entry.attainment;
//         const percentage = entry.scheduledClasses > 0 ? (entry.actualClasses / entry.scheduledClasses) * 100 : 0;
  
//         let points1 = 0;
      
//         // Attendance-based points
//         if (percentage >= 96) points1 = 5;
//         else if (percentage >= 90) points1 = 4;
//         else if (percentage >= 80) points1 = 3;
//         else if (percentage >= 70) points1 = 2;
//         else if (percentage >= 55) points1 = 1;
//       console.log(points1)
//         let points2;
//         // Attainment-based points
//         if (attainment > 2) points2= 5;
//         else if (attainment >= 1.5) points2= 4;
//         else if (attainment >= 1) points2= 3;
//         else if (attainment >= 0.5) points2= 2;
//         console.log(points2)

//         let points=points1+points2;
//         // Penalty for exceeding 105% of scheduled classes
//         if (entry.actualClasses > 1.05 * entry.scheduledClasses) {
//           points = Math.max(points - 1, 0); // Ensure points don't go below 0
//         }
//         console.log(points)
//         entry['score']=points;


//         if(entry.semester==='Odd')
//         {
//                      if(s1<points)
//                     {
//                       s2=s1;
//                       s1=points;
//                     }
//                     else if (s2<points)
//                     {
//                       s2=points;
//                     }

//         }
//         else{
//                   if(s1<points)
//                     {
//                       es2=es1;
//                       es1=points;
//                     }
//                     else(es2<points)
//                     {
//                       es2=points;
//                     }
//         }

//          tscore=(s1+s2+es1+es2)/2;
        


//       });
//     faculty.studentsFeedback.forEach((entry, index) => {
      
//       const per=entry.studentFeedback;
//       let points = 0;
//       if (per >= 96) points = 10;
//       else if (per >= 90) points = 9;
//       else if (per >= 80) points = 8;
//       else if (per >= 70) points = 7;
//       else if (per >= 60) points = 6;
//       else if (per >= 50) points = 5;
//       else if (per >= 40) points = 4;
//       else if (per >= 30) points = 3;
//       else if (per >= 20) points = 2;
//       else if (per >= 10) points = 1;
//       else if (per >= 0) points = 0;
//       entry['score']=points;


//       if(entry.semester==='Odd')
//         {
//                      if(s1<points)
//                     {
//                       s2=s1;
//                       s1=points;
//                     }
//                     else if (s2<points)
//                     {
//                       s2=points;
//                     }

//         }
//         else{
//                   if(s1<points)
//                     {
//                       es2=es1;
//                       es1=points;
//                     }
//                     else(es2<points)
//                     {
//                       es2=points;
//                     }
//         }

      
//       });


//       let fscore=(s1+s2+es1+es2)/2;
//       let dscore=0;
//     faculty.departmentActivities.forEach((entry, index) => {

//       entry['score']=3;
//       dscore+=3;
      
//       });
//       let iscore=0;
//     faculty.instituteActivities.forEach((entry, index) => {
//       entry['score']=5;
//       iscore+=5;
//       });
//       let rscore=0;
//       let rscore2=0;
//       let k=0;
//     faculty.resultSummary.forEach((entry, index) => {
//       let points = 0;


//       const result = entry.noRegisteredStudents > 0? (entry.noPassedStudents / entry.noRegisteredStudents) * 100: 0;
//     if (result >= 96) points = 10;
//     else if (result >= 90) points = 9;
//     else if (result >= 80) points = 8;
//     else if (result >= 70) points = 7;
//     else if (result >= 60) points = 6;
//     else if (result >= 50) points = 5;
//     else if (result >= 40) points = 4;



//     rscore2+=points;
//     k+=1;


//       });
//       if(k>1)
//       {
//         rscore=(rscore2/k)*2;
//       }
//       else
//       {
//         rscore=rscore2;
//       }
//       let rescore=0;
//     faculty.research.forEach((entry, index) => {
//       const c=entry.category;
//   let score=0;
//   if(c==='SCI'){
//      score=5;
//   }
//   else if(c==='Scopus'){
//      score=4;

// }
//   else if(c==='Scopus Indexed'){
//        score=3;


//   }
//   else if(c==='SCI'){
//      score=2;

//   }
//   else if(c==='WOS'){
//      score=2;

// }
//   else if(c==='UGC Recognized'){
//      score=1.5;
    

// }
//   else{
//      score=1;

// }

// entry.score=score;

// rescore+=score;
//       });
//       let cscore=0;
//     faculty.contributionSociety.forEach((entry, index) => {
//       entry.score=5;
//       cscore+=5;
//       });
      

//       if(tscore>20)
//         {
//             dscore=20
//         }
//       if(tscore>20)
//       {
//         iscore=20
//       }
//       if(tscore>20)
//       {
//         rescore=20
//       }
//       if(tscore>20)
//       {
//         cscore=20;
//       }


//     faculty.t=tscore;
//     faculty.f=fscore;
//     faculty.d=dscore;
//     faculty.i=iscore;
//     faculty.r=rscore;
//     faculty.p=rescore;
//     faculty.c=cscore;
//     faculty.total=tscore+fscore+dscore+iscore+rscore+rescore+cscore;
      
//       await faculty.save();

//   };





// module.exports= {updatescore}  


const calculateScoreForPercentage = (percentage, thresholds) => {
  for (let i = 0; i < thresholds.length; i++) {
    if (percentage >= thresholds[i].min) return thresholds[i].score;
  }
  return 0;
};

const calculateAttainmentScore = (attainment) => {
  if (attainment > 2) return 5;
  else if (attainment >= 1.5) return 4;
  else if (attainment >= 1) return 3;
  else if (attainment >= 0.5) return 2;
  return 0;
};

const updateScoreForTeachingProcess = (faculty) => {
  let s1 = 0, s2 = 0, es1 = 0, es2 = 0;
  const attendanceThresholds = [
    { min: 96, score: 5 },
    { min: 90, score: 4 },
    { min: 80, score: 3 },
    { min: 70, score: 2 },
    { min: 55, score: 1 }
  ];

  faculty.teachingProcess.forEach(entry => {
    const percentage = entry.scheduledClasses > 0 ? (entry.actualClasses / entry.scheduledClasses) * 100 : 0;
    let points1 = calculateScoreForPercentage(percentage, attendanceThresholds);
    let points2 = calculateAttainmentScore(entry.attainment);

    // Final score calculation
    let points = points1 + points2;

    // Penalty for exceeding 105% of scheduled classes
    if (entry.actualClasses > 1.05 * entry.scheduledClasses) {
      points = Math.max(points - 1, 0);
    }

    entry.score = points;

    // Update semester-based scores (Odd vs Even)
    if (entry.semester === 'Odd') {
      if (s1 < points) {
        s2 = s1;
        s1 = points;
      } else if (s2 < points) {
        s2 = points;
      }
    } else {
      if (es1 < points) {
        es2 = es1;
        es1 = points;
      } else if (es2 < points) {
        es2 = points;
      }
    }
  });

  return { s1, s2, es1, es2 };
};

const updateScoreForFeedback = (faculty) => {
  let s1 = 0, s2 = 0, es1 = 0, es2 = 0;

  faculty.studentsFeedback.forEach(entry => {
    const feedbackScore = calculateScoreForPercentage(entry.studentFeedback, [
      { min: 96, score: 10 },
      { min: 90, score: 9 },
      { min: 80, score: 8 },
      { min: 70, score: 7 },
      { min: 60, score: 6 },
      { min: 50, score: 5 },
      { min: 40, score: 4 },
      { min: 30, score: 3 },
      { min: 20, score: 2 },
      { min: 10, score: 1 },
      { min: 0, score: 0 }
    ]);

    entry.score = feedbackScore;

    // Update semester-based scores (Odd vs Even)
    if (entry.semester === 'Odd') {
      if (s1 < feedbackScore) {
        s2 = s1;
        s1 = feedbackScore;
      } else if (s2 < feedbackScore) {
        s2 = feedbackScore;
      }
    } else {
      if (es1 < feedbackScore) {
        es2 = es1;
        es1 = feedbackScore;
      } else if (es2 < feedbackScore) {
        es2 = feedbackScore;
      }
    }
  });

  return { s1, s2, es1, es2 };
};

const updateScoreForActivities = (faculty) => {
  let dscore = 0, iscore = 0, cscore = 0;

  faculty.departmentActivities.forEach(() => {
    dscore += 3;
  });

  faculty.instituteActivities.forEach(() => {
    iscore += 5;
  });

  faculty.contributionSociety.forEach(() => {
    cscore += 5;
  });

  return { dscore, iscore, cscore };
};

const updateScoreForResultSummary = (faculty) => {
  let rscore = 0;
  let rscore2 = 0;
  let k = 0;

  faculty.resultSummary.forEach(entry => {
    const result = entry.noRegisteredStudents > 0 ? (entry.noPassedStudents / entry.noRegisteredStudents) * 100 : 0;
    const points = calculateScoreForPercentage(result, [
      { min: 96, score: 10 },
      { min: 90, score: 9 },
      { min: 80, score: 8 },
      { min: 70, score: 7 },
      { min: 60, score: 6 },
      { min: 50, score: 5 },
      { min: 40, score: 4 }
    ]);

    rscore2 += points;
    k += 1;
  });

  return k > 1 ? (rscore2 / k) * 2 : rscore2;
};

const updateScoreForResearch = (faculty) => {
  let rescore = 0;

  faculty.research.forEach(entry => {
    const scoreMap = {
      SCI: 5,
      Scopus: 4,
      'Scopus Indexed': 3,
      WOS: 2,
      'UGC Recognized': 1.5,
    };

    entry.score = scoreMap[entry.category] || 1;
    rescore += entry.score;
  });

  return rescore;
};

// Main function to update the scores
const updateScore = async (faculty) => {
  // Update individual sections
  const { s1, s2, es1, es2 } = updateScoreForTeachingProcess(faculty);
  const { s1: feedbackS1, s2: feedbackS2, es1: feedbackEs1, es2: feedbackEs2 } = updateScoreForFeedback(faculty);
  const { dscore, iscore, cscore } = updateScoreForActivities(faculty);
  const rscore = updateScoreForResultSummary(faculty);
  const rescore = updateScoreForResearch(faculty);

  // Calculate final total score
  const tscore = (s1 + s2 + es1 + es2) / 2;
  const fscore = (feedbackS1 + feedbackS2 + feedbackEs1 + feedbackEs2) / 2;

  // Set the final scores and save
  faculty.t = tscore;
  faculty.f = fscore;
  faculty.d = dscore;
  faculty.i = iscore;
  faculty.r = rscore;
  faculty.p = rescore;
  faculty.c = cscore;
  faculty.total = tscore + fscore + dscore + iscore + rscore + rescore + cscore;

  await faculty.save();
};

module.exports = { updateScore };
