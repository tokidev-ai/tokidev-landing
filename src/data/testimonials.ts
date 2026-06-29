export interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "dan-soria",
    text: "Rodrigo’s ability to tackle architectural challenges is unmatched. He doesn’t just write code; he builds foundations that last years.",
    author: "Daniel Oropeza Soria",
    role: "CTO @ Innovation Labs",
    initials: "DS"
  },
  {
    id: "pedro-enriquez",
    text: "Exceptional leadership skills paired with deep technical knowledge. Rodrigo mentored our entire frontend team during the transition to Angular, ensuring a smooth and performant migration.",
    author: "Pedro Moriel Enriquez",
    role: "VP Engineering @ TravelConnect",
    initials: "PM"
  }
];
