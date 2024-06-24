import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent implements OnInit {
  faqs = [
    { id: 1, question: 'Who is EXwise?', answer: 'EXwise is an employee experience consultancy based in Hyderabad, India. We use data alongside our employee experience framework and organisation development techniques to create best-in-class experiences that positively impact employee engagement and business outcomes.' },
    { id: 2, question: 'What is employee experience?', answer: 'Employee experience is the overall perceptions and feelings an employee has about their experience within an organisation. It encompasses all aspects of the employee life cycle and when done well, employee experience can make a significant impact to how motivated and satisfied an employee is with their organisation.' },
    { id: 3, question: 'What is this activity for?', answer: 'There will be a number of activities taking place. These aim to understand the current employee experience within your organisation. The information from these activities will be collated in a diagnostic report. The report will be presented back to stakeholders and used to develop and design a new employee experience strategy.' },
    { id: 4, question: 'Why should I participate?', answer: 'This is a great opportunity to shape the employee experience for yourself and your colleagues – it’s a chance to have your say. Therefore, we encourage you to actively participate in the process.' },
    { id: 5, question: 'What kind of activities will I be taking part in?', answer: 'We use a number of different techniques including surveys, focus groups and interviews to understand the current employee experience. All employees will be invited to complete surveys and a representative proportion of the organisation will take part in focus group. You will be notified about which activities you will be taking part in.' },
    { id: 6, question: 'What kind of things will I be asked?', answer: 'All questions will cover your experience as an employee. Some topics will be tenure related while others will be broader. Tenure based questions will focus on your current employee life cycle stage e.g., are you new to the organisation, in a development phase or well tenured. While the broader questions will explore topics such as organisation culture, the work you do, communication effectiveness, the working environment and so on. Importantly, there are no trick questions and no right or wrong answers – we are just seeking your opinion.' },
    { id: 7, question: 'What happens to the information that I share?', answer: 'All of the information shared will be collated into a diagnostic report that will be shared with stakeholders. The report will inform the next steps to improve the current employee experience. This will often involve re-engaging with employees to co-create improvements.' },
    { id: 8, question: 'Are my responses confidential?', answer: 'Confidentiality and anonymity will be assured for all survey types. For focus groups, EXwise will ensure that individuals cannot be identified in the final report ensuring anonymity however, you will be known to other focus group participants therefore, EXwise cannot guarantee that others in the group will respect the confidentiality of the group. We do however ask all participants to keep all comments made during the focus group confidential and not discuss what happened during the focus group outside the meeting.' },
    { id: 9, question: 'Will my line manager have access to my survey responses?', answer: 'No. All survey responses are anonymised within the EXwise surveying tool EXwise Insight. Furthermore, results will only be reported if there are more than 10 respondents in any one reporting category ensuring anonymity.' },
    { id: 10, question: 'How is my data stored?', answer: 'All data is stored in compliance with India’s Digital Personal Data Protection Act (2023). While the EXwise Insight platform uses strong encryption and cloud based hosting to ensure all data is secure.' },
    { id: 11, question: 'Do I have to take part?', answer: 'Taking part is completely optional however, we strongly recommend that you participate to ensure that you have a say in shaping your workplace.' }
  ];
  filteredFaqs = this.faqs;
  subscription!: Subscription;
  constructor(private searchService:SearchService ){}
ngOnInit(): void {
 
  this.subscription = this.searchService.getSearchKeyword().subscribe(keyword => {
    this.filterFaqs(keyword);
  });
}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}

filterFaqs(query: string): void {
  this.filteredFaqs = this.faqs.filter(faq =>
    faq.question.toLowerCase().includes(query.toLowerCase()) || faq.answer.toLowerCase().includes(query.toLowerCase())
  );
}
}
