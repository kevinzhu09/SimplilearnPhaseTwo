import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Question } from '../model.question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {


  questionInfo:Question[] = null;
  currentIndex = null;
  correctCount = 0;



  constructor(private questionService:QuestionService) { }

  ngOnInit(): void {
  }

  questionRef = new FormGroup({
    answer:new FormControl()
  })

  processData(data): void {
    this.questionInfo=data;
    
  }

  loadQuestions(): void {
    this.currentIndex = 0;
    this.correctCount = 0;
    this.questionService.loadQuestionDetails().subscribe(data => this.processData(data), err => console.log(err));

  }

  submit(): void {
    let correctLetter = null;
    let correct = this.questionInfo[this.currentIndex].correct;
    
    switch(correct) { 
      case 1: { 
         correctLetter = 'A';
         break; 
      } 
      case 2: { 
        correctLetter = 'B';
        break; 
     } 
     case 3: { 
      correctLetter = 'C';
      break; 
   } 
   case 4: { 
    correctLetter = 'D';
    break; 
 } 
   } 

   let message = null;
   if (this.questionRef.value.answer==correct) {
     message = "You were correct! ";
     this.correctCount += 1;
   } else {
    message = "You were incorrect. ";
   }

   alert(message + "The correct answer is " + correctLetter + ".");

    this.currentIndex += 1;

    if(this.currentIndex>=10) {
      let passingMessage=null;
      if (this.correctCount >= 7) {
        passingMessage="You passed! You were selected for the interview!";
      } else {
        passingMessage="You did not pass. You were not selected for the interview."
      }
      alert("You got " + this.correctCount + "/10 questions correctly. The passing score is 7/10. " + passingMessage);
    }
  }

}
