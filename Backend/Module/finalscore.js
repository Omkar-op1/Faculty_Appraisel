




const updatescore = async (faculty) => {
      
    let totalscore=0;
    let s1=0;
    let s2=0;
    let es1=0;
    let es2=0;
  let tscore=0;
    faculty.teachingProcess.forEach((entry, index) => {


      const attainment=entry.attainment;
        const percentage = entry.scheduledClasses > 0 ? (entry.actualClasses / entry.scheduledClasses) * 100 : 0;
  
        let points1 = 0;
      
        // Attendance-based points
        if (percentage >= 96) points1 = 5;
        else if (percentage >= 90) points1 = 4;
        else if (percentage >= 80) points1 = 3;
        else if (percentage >= 70) points1 = 2;
        else if (percentage >= 55) points1 = 1;
      console.log(points1)
        let points2;
        // Attainment-based points
        if (attainment > 2) points2= 5;
        else if (attainment >= 1.5) points2= 4;
        else if (attainment >= 1) points2= 3;
        else if (attainment >= 0.5) points2= 2;
        console.log(points2)

        let points=points1+points2;
        // Penalty for exceeding 105% of scheduled classes
        if (entry.actualClasses > 1.05 * entry.scheduledClasses) {
          points = Math.max(points - 1, 0); // Ensure points don't go below 0
        }
        console.log(points)
        entry['score']=points;


        if(entry.semester==='odd')
        {
                     if(s1<points)
                    {
                      s2=s1;
                      s1=points;
                    }
                    else if (s2<points)
                    {
                      s2=points;
                    }

        }
        else{
                  if(s1<points)
                    {
                      es2=es1;
                      es1=points;
                    }
                    else(es2<points)
                    {
                      es2=points;
                    }
        }


         tscore=(s1+s2+es1+es2)/2;
        


      });
    faculty.studentsFeedback.forEach((entry, index) => {
      
      const per=entry.studentFeedback;
      let points = 0;
      if (per >= 96) points = 10;
      else if (per >= 90) points = 9;
      else if (per >= 80) points = 8;
      else if (per >= 70) points = 7;
      else if (per >= 60) points = 6;
      else if (per >= 50) points = 5;
      else if (per >= 40) points = 4;
      else if (per >= 30) points = 3;
      else if (per >= 20) points = 2;
      else if (per >= 10) points = 1;
      else if (per >= 0) points = 0;
      entry['score']=points;


      if(entry.semester==='odd')
        {
                     if(s1<points)
                    {
                      s2=s1;
                      s1=points;
                    }
                    else if (s2<points)
                    {
                      s2=points;
                    }

        }
        else{
                  if(s1<points)
                    {
                      es2=es1;
                      es1=points;
                    }
                    else(es2<points)
                    {
                      es2=points;
                    }
        }

      
      });


      let fscore=(s1+s2+es1+es2)/2;
      let dscore=0;
    faculty.departmentActivities.forEach((entry, index) => {

      entry['score']=3;
      dscore+=3;
      
      });
      let iscore;
    faculty.instituteActivities.forEach((entry, index) => {
      entry['score']=5;
      iscore+=5;
      });
      let rscore=0;
      let rscore2=0;
      let k=0;
    faculty.resultSummary.forEach((entry, index) => {
      let points = 0;


      const result = entry.noRegisteredStudents > 0? (entry.noPassedStudents / entry.noRegisteredStudents) * 100: 0;
    if (result >= 96) points = 10;
    else if (result >= 90) points = 9;
    else if (result >= 80) points = 8;
    else if (result >= 70) points = 7;
    else if (result >= 60) points = 6;
    else if (result >= 50) points = 5;
    else if (result >= 40) points = 4;



    rscore2+=points;
    k+=1;


      });
      if(k>1)
      {
        rscore=(rscore2/k)*2;
      }
      else
      {
        rscore=rscore2;
      }
      let rescore=0;
    faculty.research.forEach((entry, index) => {
      const c=entry.category;
  let score=0;
  if(c==='SCI'){
     score=5;
  }
  else if(c==='Scopus'){
     score=4;

}
  else if(c==='Scopus Indexed'){
       score=3;


  }
  else if(c==='SCI'){
     score=2;

  }
  else if(c==='WOS'){
     score=2;

}
  else if(c==='UGC Recognized'){
     score=1.5;
    

}
  else{
     score=1;

}

entry.score=score;

rescore+=score;
      });
      let cscore=0;
    faculty.contributionSociety.forEach((entry, index) => {
      entry.score=5;
      cscore+=5;
      });
      


    faculty.t=tscore;
    faculty.f=fscore;
    faculty.d=dscore>20?20:dscore;
    faculty.i=iscore>20?20:iscore;
    faculty.r=rscore;
    faculty.p=rescore>20?20:rescore;
    faculty.c=cscore>20?20:cscore;
    faculty.total=tscore+fscore+dscore>20?20:dscore+iscore>20?20:iscore+rscore+rescore>20?20:rescore+cscore>20?20:cscore;
      
      await faculty.save();

  };





module.exports= {updatescore}  