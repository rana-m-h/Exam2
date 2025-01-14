
declare type exams = {
    _id:string
    title: string;
    duration: number;
    subject:subjects
    numberOfQuestions:number
    active:Boolean
   } & DatabaseFields;
   
 